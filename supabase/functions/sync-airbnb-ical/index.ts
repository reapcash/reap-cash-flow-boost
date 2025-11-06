import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

// TODO: Replace '*' with your actual domain (e.g., 'https://yourdomain.com') for production
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

const requestSchema = z.object({
  connectionId: z.string().uuid('Invalid connection ID format'),
});

function isValidIcalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    
    // Only allow HTTPS protocol
    if (parsed.protocol !== 'https:') {
      console.error(`Invalid protocol: ${parsed.protocol}`);
      return false;
    }
    
    // Blacklist internal IP ranges and localhost to prevent SSRF
    const hostname = parsed.hostname.toLowerCase();
    const internalPatterns = [
      /^127\./,                           // 127.0.0.0/8
      /^10\./,                            // 10.0.0.0/8
      /^172\.(1[6-9]|2\d|3[01])\./,      // 172.16.0.0/12
      /^192\.168\./,                      // 192.168.0.0/16
      /^169\.254\./,                      // 169.254.0.0/16 (link-local)
      /^localhost$/,
      /^0\.0\.0\.0$/,
    ];
    
    if (internalPatterns.some(pattern => pattern.test(hostname))) {
      console.error(`Blocked internal hostname: ${hostname}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('URL parsing failed:', error);
    return false;
  }
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

    // Validate input
    const body = await req.json();
    const { connectionId } = requestSchema.parse(body);

    console.log(`Syncing iCal data for connection: ${connectionId}`);

    // Fetch the connection details with ownership verification
    const { data: connection, error: connectionError } = await supabaseClient
      .from('airbnb_connections')
      .select(`
        id,
        ical_url,
        property_id,
        property:properties!inner(
          application:applications!inner(
            user_id
          )
        )
      `)
      .eq('id', connectionId)
      .single();

    if (connectionError || !connection) {
      throw new Error('Connection not found');
    }

    // Verify user owns this connection
    if (connection.property.application.user_id !== user.id) {
      console.error(`Unauthorized access attempt by user ${user.id} for connection ${connectionId}`);
      throw new Error('Unauthorized: You do not own this connection');
    }

    // Validate iCal URL to prevent SSRF attacks
    if (!isValidIcalUrl(connection.ical_url)) {
      throw new Error('Invalid iCal URL: Must be HTTPS and not target internal networks');
    }

    // Fetch iCal data with timeout
    console.log(`Fetching iCal from: ${connection.ical_url}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      const icalResponse = await fetch(connection.ical_url, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
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
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timeout: iCal fetch took too long');
      }
      throw fetchError;
    }
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