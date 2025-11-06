import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, Link2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConnectionStatus {
  propertyAddress: string;
  propertyId: string;
  connectionCount: number;
  bookingCount: number;
  lastSynced: string | null;
  hasError: boolean;
}

export default function AirbnbConnectionStatus() {
  const [status, setStatus] = useState<ConnectionStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      setLoading(true);

      // Get user's applications
      const { data: applications, error: appError } = await supabase
        .from('applications')
        .select('id')
        .order('created_at', { ascending: false });

      if (appError) throw appError;

      if (!applications || applications.length === 0) {
        setStatus([]);
        return;
      }

      // Get properties for these applications
      const { data: properties, error: propError } = await supabase
        .from('properties')
        .select('id, property_address, application_id')
        .in('application_id', applications.map(a => a.id));

      if (propError) throw propError;

      if (!properties || properties.length === 0) {
        setStatus([]);
        return;
      }

      // Get connection status for each property
      const statusPromises = properties.map(async (property) => {
        const { data: connections } = await supabase
          .from('airbnb_connections')
          .select('id, last_synced_at, sync_status')
          .eq('property_id', property.id);

        let bookingCount = 0;
        if (connections && connections.length > 0) {
          const { count } = await supabase
            .from('airbnb_bookings')
            .select('*', { count: 'exact', head: true })
            .in('connection_id', connections.map(c => c.id))
            .gte('booking_end_date', new Date().toISOString());

          bookingCount = count || 0;
        }

        const lastSynced = connections?.[0]?.last_synced_at || null;
        const hasError = connections?.some(c => c.sync_status === 'error') || false;

        return {
          propertyAddress: property.property_address,
          propertyId: property.id,
          connectionCount: connections?.length || 0,
          bookingCount,
          lastSynced,
          hasError,
        };
      });

      const statuses = await Promise.all(statusPromises);
      setStatus(statuses);
    } catch (error) {
      console.error('Error loading connection status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </Card>
    );
  }

  if (status.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No properties found</p>
          <p className="text-sm mt-1">Create an application to get started</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Airbnb Connections</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/manage-airbnb?applicationId=' + status[0]?.propertyId)}
        >
          Manage All
        </Button>
      </div>

      <div className="space-y-3">
        {status.map((property) => (
          <Card key={property.propertyId} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium">{property.propertyAddress}</h4>
                  {property.connectionCount > 0 ? (
                    property.hasError ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Sync Error
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Connected
                      </Badge>
                    )
                  ) : (
                    <Badge variant="outline" className="gap-1">
                      <Link2 className="h-3 w-3" />
                      Not Connected
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div>
                    {property.connectionCount} {property.connectionCount === 1 ? 'listing' : 'listings'}
                  </div>
                  <div>•</div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {property.bookingCount} future bookings
                  </div>
                  {property.lastSynced && (
                    <>
                      <div>•</div>
                      <div className="text-xs">
                        Last synced: {new Date(property.lastSynced).toLocaleDateString()}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/manage-airbnb?propertyId=${property.propertyId}`)}
              >
                {property.connectionCount > 0 ? 'Manage' : 'Connect'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}