import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Booking {
  id: string;
  booking_start_date: string;
  booking_end_date: string;
  guest_name: string;
  nights: number;
  estimated_revenue: number | null;
  connection_id: string;
}

interface BookingSelectionSectionProps {
  propertyId: string;
  onSelectionChange?: (selectedBookings: string[], totalRevenue: number) => void;
}

export default function BookingSelectionSection({ 
  propertyId, 
  onSelectionChange 
}: BookingSelectionSectionProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingIds, setSelectedBookingIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [averageNightly, setAverageNightly] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (propertyId) {
      loadBookings();
    }
  }, [propertyId]);

  useEffect(() => {
    const selectedBookings = bookings.filter(b => selectedBookingIds.has(b.id));
    const totalRevenue = selectedBookings.reduce((sum, booking) => {
      const revenue = booking.estimated_revenue || (booking.nights * averageNightly);
      return sum + revenue;
    }, 0);
    
    onSelectionChange?.(Array.from(selectedBookingIds), totalRevenue);
  }, [selectedBookingIds, bookings, averageNightly, onSelectionChange]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      
      // Get all connections for this property
      const { data: connections, error: connError } = await supabase
        .from('airbnb_connections')
        .select('id')
        .eq('property_id', propertyId);

      if (connError) throw connError;

      if (!connections || connections.length === 0) {
        setBookings([]);
        return;
      }

      // Get all bookings for these connections
      const connectionIds = connections.map(c => c.id);
      const { data, error } = await supabase
        .from('airbnb_bookings')
        .select('*')
        .in('connection_id', connectionIds)
        .gte('booking_end_date', new Date().toISOString())
        .order('booking_start_date', { ascending: true });

      if (error) throw error;

      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading bookings',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleBooking = (bookingId: string) => {
    setSelectedBookingIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bookingId)) {
        newSet.delete(bookingId);
      } else {
        newSet.add(bookingId);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    setSelectedBookingIds(new Set(bookings.map(b => b.id)));
  };

  const clearAll = () => {
    setSelectedBookingIds(new Set());
  };

  const calculateRevenue = (booking: Booking) => {
    if (booking.estimated_revenue) return booking.estimated_revenue;
    return booking.nights * averageNightly;
  };

  const selectedBookings = bookings.filter(b => selectedBookingIds.has(b.id));
  const totalRevenue = selectedBookings.reduce((sum, booking) => {
    return sum + calculateRevenue(booking);
  }, 0);
  const maxAdvance = totalRevenue * 0.7; // 70% advance rate

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Alert>
        <Calendar className="h-4 w-4" />
        <AlertDescription>
          No future bookings found. Please connect your Airbnb calendar first to see and select bookings for advance.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Bookings for Advance</h3>
        <p className="text-sm text-muted-foreground">
          Choose which confirmed bookings you want to receive an advance on
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor="avg-nightly">Average Nightly Rate (for revenue estimation)</Label>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">$</span>
            <Input
              id="avg-nightly"
              type="number"
              placeholder="150"
              value={averageNightly || ''}
              onChange={(e) => setAverageNightly(parseFloat(e.target.value) || 0)}
              className="max-w-[200px]"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear All
          </Button>
        </div>
      </div>

      <Card className="p-4 bg-primary/5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Selected Bookings</div>
            <div className="text-2xl font-bold">{selectedBookingIds.size}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              Total Expected Revenue
            </div>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Max Advance (70%)
            </div>
            <div className="text-2xl font-bold text-primary">${maxAdvance.toLocaleString()}</div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {bookings.map((booking) => {
          const revenue = calculateRevenue(booking);
          const isSelected = selectedBookingIds.has(booking.id);
          
          return (
            <Card
              key={booking.id}
              className={`p-4 cursor-pointer transition-colors ${
                isSelected ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
              }`}
              onClick={() => toggleBooking(booking.id)}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleBooking(booking.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{booking.guest_name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(booking.booking_start_date).toLocaleDateString()} -{' '}
                        {new Date(booking.booking_end_date).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant="secondary">{booking.nights} nights</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Est. Revenue: </span>
                      <span className="font-medium">${revenue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Advance: </span>
                      <span className="font-medium text-primary">
                        ${(revenue * 0.7).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}