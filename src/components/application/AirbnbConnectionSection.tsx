import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Trash2, RefreshCw, ExternalLink, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AirbnbConnection {
  id: string;
  listing_name: string;
  ical_url: string;
  last_synced_at: string | null;
  sync_status: string;
  sync_error: string | null;
}

interface AirbnbBooking {
  booking_start_date: string;
  booking_end_date: string;
  guest_name: string;
  nights: number;
}

interface AirbnbConnectionSectionProps {
  propertyId: string;
}

export default function AirbnbConnectionSection({ propertyId }: AirbnbConnectionSectionProps) {
  const [connections, setConnections] = useState<AirbnbConnection[]>([]);
  const [bookings, setBookings] = useState<Record<string, AirbnbBooking[]>>({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newConnection, setNewConnection] = useState({ listing_name: '', ical_url: '' });
  const { toast } = useToast();

  useEffect(() => {
    if (propertyId) {
      loadConnections();
    }
  }, [propertyId]);

  const loadConnections = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('airbnb_connections')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setConnections(data || []);

      // Load bookings for each connection
      if (data && data.length > 0) {
        for (const conn of data) {
          await loadBookings(conn.id);
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error loading connections',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadBookings = async (connectionId: string) => {
    try {
      const { data, error } = await supabase
        .from('airbnb_bookings')
        .select('booking_start_date, booking_end_date, guest_name, nights')
        .eq('connection_id', connectionId)
        .order('booking_start_date', { ascending: true });

      if (error) throw error;

      setBookings(prev => ({ ...prev, [connectionId]: data || [] }));
    } catch (error: any) {
      console.error('Error loading bookings:', error);
    }
  };

  const addConnection = async () => {
    if (!newConnection.listing_name || !newConnection.ical_url) {
      toast({
        title: 'Missing information',
        description: 'Please provide both listing name and iCal URL',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('airbnb_connections')
        .insert({
          property_id: propertyId,
          listing_name: newConnection.listing_name,
          ical_url: newConnection.ical_url,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Connection added',
        description: 'Now syncing your Airbnb bookings...',
      });

      setNewConnection({ listing_name: '', ical_url: '' });
      setShowAddForm(false);
      await loadConnections();
      
      // Auto-sync after adding
      if (data) {
        await syncConnection(data.id);
      }
    } catch (error: any) {
      toast({
        title: 'Error adding connection',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const syncConnection = async (connectionId: string) => {
    try {
      setSyncing(connectionId);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('sync-airbnb-ical', {
        body: { connectionId },
      });

      if (error) throw error;

      toast({
        title: 'Sync complete',
        description: `Synced ${data.bookingsCount} bookings`,
      });

      await loadConnections();
      await loadBookings(connectionId);
    } catch (error: any) {
      toast({
        title: 'Sync failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSyncing(null);
    }
  };

  const deleteConnection = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from('airbnb_connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;

      toast({
        title: 'Connection removed',
        description: 'Airbnb connection has been removed',
      });

      await loadConnections();
    } catch (error: any) {
      toast({
        title: 'Error removing connection',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Airbnb Integration</h3>
          <p className="text-sm text-muted-foreground">
            Connect your Airbnb calendar to automatically import future bookings
          </p>
        </div>
        {!showAddForm && (
          <Button onClick={() => setShowAddForm(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Connection
          </Button>
        )}
      </div>

      <Alert>
        <ExternalLink className="h-4 w-4" />
        <AlertDescription>
          <strong>How to get your iCal URL:</strong>
          <ol className="list-decimal ml-4 mt-2 space-y-1 text-sm">
            <li>Log into your Airbnb account</li>
            <li>Go to Calendar → Availability Settings</li>
            <li>Scroll to "Sync calendars"</li>
            <li>Click "Export calendar" and copy the link</li>
          </ol>
        </AlertDescription>
      </Alert>

      {showAddForm && (
        <Card className="p-4 space-y-4">
          <div>
            <Label htmlFor="listing_name">Listing Name</Label>
            <Input
              id="listing_name"
              placeholder="e.g., Downtown Apartment"
              value={newConnection.listing_name}
              onChange={(e) =>
                setNewConnection({ ...newConnection, listing_name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="ical_url">iCal URL</Label>
            <Input
              id="ical_url"
              placeholder="https://..."
              value={newConnection.ical_url}
              onChange={(e) =>
                setNewConnection({ ...newConnection, ical_url: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={addConnection}>Add Connection</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {connections.map((connection) => (
          <Card key={connection.id} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium">{connection.listing_name}</h4>
                <p className="text-sm text-muted-foreground">
                  {connection.last_synced_at
                    ? `Last synced: ${new Date(connection.last_synced_at).toLocaleString()}`
                    : 'Not synced yet'}
                </p>
                {connection.sync_status === 'error' && connection.sync_error && (
                  <p className="text-sm text-destructive mt-1">{connection.sync_error}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => syncConnection(connection.id)}
                  disabled={syncing === connection.id}
                >
                  {syncing === connection.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteConnection(connection.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {bookings[connection.id] && bookings[connection.id].length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  Future Bookings ({bookings[connection.id].length})
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {bookings[connection.id].map((booking, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm p-2 bg-muted rounded"
                    >
                      <div>
                        <p className="font-medium">{booking.guest_name}</p>
                        <p className="text-muted-foreground">
                          {new Date(booking.booking_start_date).toLocaleDateString()} -{' '}
                          {new Date(booking.booking_end_date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-muted-foreground">{booking.nights} nights</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {connections.length === 0 && !showAddForm && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No Airbnb connections yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add a connection to automatically import your bookings
          </p>
        </Card>
      )}
    </div>
  );
}