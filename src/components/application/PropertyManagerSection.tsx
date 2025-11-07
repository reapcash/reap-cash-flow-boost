import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface PropertyManagerSectionProps {
  form: UseFormReturn<any>;
}

const PropertyManagerSection = ({ form }: PropertyManagerSectionProps) => {
  const managementTypes = [
    { id: 'residential', label: 'Residential Properties' },
    { id: 'commercial', label: 'Commercial Properties' },
    { id: 'str', label: 'Short-Term Rentals' },
    { id: 'hoa', label: 'HOA/Condo Associations' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Property Management Information</h3>
        <div className="space-y-4">
          {/* Company Information */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Premier Property Management LLC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="businessLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business License Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="BL-123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsInBusiness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years in Business *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="5" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Management Types */}
          <FormField
            control={form.control}
            name="managementTypes"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Property Types Managed *</FormLabel>
                  <FormDescription>
                    Select all that apply
                  </FormDescription>
                </div>
                {managementTypes.map((type) => (
                  <FormField
                    key={type.id}
                    control={form.control}
                    name="managementTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={type.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), type.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== type.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {type.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Portfolio Details */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Portfolio Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="numberOfPropertiesManaged"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Properties Managed *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        placeholder="25" 
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
                name="totalUnitsManaged"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Units Managed *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        placeholder="150" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Include all rental units across all properties</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="monthlyManagementFees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Monthly Management Fees ($) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="15000.00" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Total recurring monthly fees from all managed properties</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="averageFeePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Management Fee (%) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="10.0" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Average percentage charged to property owners</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Agreements and Documentation */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Management Agreements</h4>
            
            <FormField
              control={form.control}
              name="contractsSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Contracts Summary *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your active management agreements, contract terms, renewal dates, and any pending renewals or new contracts..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include contract lengths, renewal terms, and stability of agreements
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedFutureRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Revenue (Next 90 Days) ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="45000.00" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Projected management fees for the next quarter</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagerSection;
