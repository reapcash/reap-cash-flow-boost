import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AirbnbConnectionSection from '@/components/application/AirbnbConnectionSection';
import { Card } from '@/components/ui/card';

const ManageAirbnb = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('applicationId');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && applicationId) {
      loadProperties();
    }
  }, [user, applicationId]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('application_id', applicationId);

      if (error) throw error;

      setProperties(data || []);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (!applicationId) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <p className="text-center text-muted-foreground">
            No application selected. Please go back to your dashboard.
          </p>
          <Button className="mt-4 w-full" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Airbnb Connections</h1>
          <p className="text-muted-foreground">
            Connect your Airbnb listings to automatically import booking data
          </p>
        </div>

        {properties.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No properties found for this application.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Please complete your application first.
            </p>
          </Card>
        ) : (
          <div className="space-y-8">
            {properties.map((property) => (
              <Card key={property.id} className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold">{property.property_address}</h3>
                  <p className="text-sm text-muted-foreground">
                    {property.property_type} • {property.number_of_bedrooms} bed •{' '}
                    {property.number_of_bathrooms} bath
                  </p>
                </div>
                <AirbnbConnectionSection propertyId={property.id} />
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageAirbnb;