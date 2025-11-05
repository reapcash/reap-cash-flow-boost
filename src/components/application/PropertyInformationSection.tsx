import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface PropertyInformationSectionProps {
  form: UseFormReturn<any>;
}

const PropertyInformationSection = ({ form }: PropertyInformationSectionProps) => {
  const properties = form.watch('properties') || [];

  const addProperty = () => {
    const currentProperties = form.getValues('properties') || [];
    form.setValue('properties', [
      ...currentProperties,
      {
        propertyType: 'single_family',
        ownershipStatus: 'mortgaged',
        numberOfBedrooms: 1,
        numberOfBathrooms: 1,
        squareFootage: 1000,
        yearOfPurchase: new Date().getFullYear(),
        bookingPlatforms: [],
        averageOccupancyRate: 0,
        averageNightlyRate: 0,
        averageMonthlyRevenue: 0,
      },
    ]);
  };

  const removeProperty = (index: number) => {
    const currentProperties = form.getValues('properties');
    form.setValue(
      'properties',
      currentProperties.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="space-y-8">
      {properties.map((_, index) => (
        <div key={index} className="space-y-6 p-6 border rounded-lg relative">
          {properties.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => removeProperty(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          
          <h3 className="text-lg font-semibold">Property #{index + 1}</h3>

          <FormField
            control={form.control}
            name={`properties.${index}.propertyAddress`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City, State ZIP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`properties.${index}.propertyType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single_family">Single-Family Home</SelectItem>
                      <SelectItem value="multi_family">Multi-Family Home</SelectItem>
                      <SelectItem value="condo_apartment">Condo/Apartment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`properties.${index}.ownershipStatus`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ownership Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="owned_outright">Owned Outright</SelectItem>
                      <SelectItem value="mortgaged">Mortgaged</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name={`properties.${index}.numberOfBedrooms`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`properties.${index}.numberOfBathrooms`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.5"
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`properties.${index}.squareFootage`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Square Footage</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`properties.${index}.yearOfPurchase`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Purchase</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`properties.${index}.estimatedPropertyValue`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Property Value ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addProperty} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Another Property
      </Button>
    </div>
  );
};

export default PropertyInformationSection;
