import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface STRDetailsSectionProps {
  form: UseFormReturn<any>;
}

const BOOKING_PLATFORMS = [
  { id: 'airbnb', label: 'Airbnb' },
  { id: 'vrbo', label: 'VRBO' },
  { id: 'booking', label: 'Booking.com' },
  { id: 'expedia', label: 'Expedia' },
  { id: 'other', label: 'Other' },
];

const STRDetailsSection = ({ form }: STRDetailsSectionProps) => {
  const properties = form.watch('properties') || [];

  return (
    <div className="space-y-8">
      {properties.map((_: any, index: number) => (
        <div key={index} className="space-y-6 p-6 border rounded-lg">
          <h3 className="text-lg font-semibold">
            STR Details - Property #{index + 1}
          </h3>

          <FormField
            control={form.control}
            name={`properties.${index}.bookingPlatforms`}
            render={() => (
              <FormItem>
                <FormLabel>Booking Platforms Used</FormLabel>
                <FormDescription>Select all platforms where you list this property</FormDescription>
                <div className="space-y-2">
                  {BOOKING_PLATFORMS.map((platform) => (
                    <FormField
                      key={platform.id}
                      control={form.control}
                      name={`properties.${index}.bookingPlatforms`}
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={platform.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(platform.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, platform.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== platform.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {platform.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name={`properties.${index}.averageOccupancyRate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Occupancy Rate (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="75"
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`properties.${index}.averageNightlyRate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Nightly Rate ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="150"
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`properties.${index}.averageMonthlyRevenue`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Monthly Revenue ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="4500"
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name={`properties.${index}.bookingHistorySummary`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Booking History Summary (Last 12 Months)</FormLabel>
                <FormDescription>
                  Provide a brief summary of your booking history
                </FormDescription>
                <FormControl>
                  <Textarea 
                    placeholder="Example: Property has maintained 80% occupancy over the past year with consistent bookings..."
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Future Bookings</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`properties.${index}.futureBookingsNights`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Number of Nights Booked</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="60"
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`properties.${index}.futureBookingsRevenue`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Expected Revenue ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="9000"
                        {...field} 
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default STRDetailsSection;
