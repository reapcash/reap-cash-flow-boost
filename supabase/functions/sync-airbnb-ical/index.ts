import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ICalEvent {
  summary: string;
  dtstart: string;
  dtend: string;
  description?: string;
}

function parseICalData(icalText: string): ICalEvent[] {
  const events: ICalEvent[] = [];
  const lines = icalText.split('\n').map(line => line.trim());
  
  let currentEvent: Partial<ICalEvent> | null = null;
  
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      currentEvent = {};
    } else if (line === 'END:VEVENT' && currentEvent) {
      if (currentEvent.dtstart && currentEvent.dtend) {
        events.push(currentEvent as ICalEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      if (line.startsWith('SUMMARY:')) {
        currentEvent.summary = line.substring(8);
      } else if (line.startsWith('DTSTART')) {
        const dateMatch = line.match(/[:;](\d{8}T?\d{0,6}Z?)/);
        if (dateMatch) {
          currentEvent.dtstart = dateMatch[1];
        }
      } else if (line.startsWith('DTEND')) {
        const dateMatch = line.match(/[:;](\d{8}T?\d{0,6}Z?)/);
        if (dateMatch) {
          currentEvent.dtend = dateMatch[1];
        }
      } else if (line.startsWith('DESCRIPTION:')) {
        currentEvent.description = line.substring(12);
      }
    }
  }
  
  return events;
}

function parseICalDate(dateStr: string): Date {
  // Handle YYYYMMDD or YYYYMMDDTHHmmssZ formats
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));
  
  if (dateStr.includes('T')) {
    const hour = parseInt(dateStr.substring(9, 11));
    const minute = parseInt(dateStr.substring(11, 13));
    const second = parseInt(dateStr.substring(13, 15));
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }
  
  return new Date(year, month, day);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { connectionId } = await req.json();

    if (!connectionId) {
      throw new Error('Connection ID is required');
    }

    console.log(`Syncing iCal data for connection: ${connectionId}`);

    // Fetch the connection details
    const { data: connection, error: connectionError } = await supabaseClient
      .from('airbnb_connections')
      .select('id, ical_url, property_id')
      .eq('id', connectionId)
      .single();

    if (connectionError || !connection) {
      throw new Error('Connection not found');
    }

    // Fetch iCal data
    console.log(`Fetching iCal from: ${connection.ical_url}`);
    const icalResponse = await fetch(connection.ical_url);
    
    if (!icalResponse.ok) {
      throw new Error(`Failed to fetch iCal: ${icalResponse.statusText}`);
    }

    const icalText = await icalResponse.text();
    console.log(`Fetched iCal data, length: ${icalText.length}`);

    // Parse iCal data
    const events = parseICalData(icalText);
    console.log(`Parsed ${events.length} events`);

    // Filter future bookings
    const now = new Date();
    const futureEvents = events.filter(event => {
      const endDate = parseICalDate(event.dtend);
      return endDate >= now;
    });

    console.log(`Found ${futureEvents.length} future bookings`);

    // Delete old bookings for this connection
    await supabaseClient
      .from('airbnb_bookings')
      .delete()
      .eq('connection_id', connectionId);

    // Insert new bookings
    const bookingsToInsert = futureEvents.map(event => {
      const startDate = parseICalDate(event.dtstart);
      const endDate = parseICalDate(event.dtend);
      const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

      return {
        connection_id: connectionId,
        booking_start_date: startDate.toISOString(),
        booking_end_date: endDate.toISOString(),
        guest_name: event.summary || 'Guest',
        booking_status: 'confirmed',
        nights,
        raw_data: event,
      };
    });

    if (bookingsToInsert.length > 0) {
      const { error: insertError } = await supabaseClient
        .from('airbnb_bookings')
        .insert(bookingsToInsert);

      if (insertError) {
        throw new Error(`Failed to insert bookings: ${insertError.message}`);
      }
    }

    // Update connection sync status
    await supabaseClient
      .from('airbnb_connections')
      .update({
        last_synced_at: new Date().toISOString(),
        sync_status: 'success',
        sync_error: null,
      })
      .eq('id', connectionId);

    console.log(`Successfully synced ${bookingsToInsert.length} bookings`);

    return new Response(
      JSON.stringify({
        success: true,
        bookingsCount: bookingsToInsert.length,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error syncing iCal:', error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});