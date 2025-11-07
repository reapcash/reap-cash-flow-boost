import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ContractorSectionProps {
  form: UseFormReturn<any>;
}

const ContractorSection = ({ form }: ContractorSectionProps) => {
  const tradeTypes = [
    { id: 'general', label: 'General Contracting' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'plumbing', label: 'Plumbing' },
    { id: 'hvac', label: 'HVAC' },
    { id: 'roofing', label: 'Roofing' },
    { id: 'flooring', label: 'Flooring' },
    { id: 'painting', label: 'Painting' },
    { id: 'landscaping', label: 'Landscaping' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Contractor Information</h3>
        <div className="space-y-4">
          {/* Business Information */}
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name *</FormLabel>
                <FormControl>
                  <Input placeholder="ABC Construction Services LLC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contractorLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contractor License Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="CL-123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License State *</FormLabel>
                  <FormControl>
                    <Input placeholder="California" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="insurancePolicyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Policy Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="POL-789456123" {...field} />
                  </FormControl>
                  <FormDescription>General liability insurance</FormDescription>
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
                      placeholder="8" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Trade Specialties */}
          <FormField
            control={form.control}
            name="tradeTypes"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Trade Specialties *</FormLabel>
                  <FormDescription>
                    Select all that apply
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tradeTypes.map((trade) => (
                    <FormField
                      key={trade.id}
                      control={form.control}
                      name="tradeTypes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={trade.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(trade.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), trade.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== trade.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {trade.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Active Projects */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Active Projects & Invoices</h4>
            
            <FormField
              control={form.control}
              name="numberOfActiveProjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Active Projects *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      placeholder="5" 
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
              name="totalPendingInvoices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Pending Invoices ($) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="75000.00" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Total amount of work completed but not yet paid</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="averagePaymentTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Payment Terms *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="net_15">Net 15 days</SelectItem>
                      <SelectItem value="net_30">Net 30 days</SelectItem>
                      <SelectItem value="net_60">Net 60 days</SelectItem>
                      <SelectItem value="net_90">Net 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Typical payment terms with clients</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectsSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Projects Summary *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your current active projects, including client names, project values, work completed, invoice amounts, and expected payment dates..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include project details, contract values, completion status, and payment schedules
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Historical Performance */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Business Performance</h4>
            
            <FormField
              control={form.control}
              name="annualRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Revenue (Last 12 Months) ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="500000.00" 
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
              name="averageProjectSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Project Size ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="25000.00" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
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

export default ContractorSection;
