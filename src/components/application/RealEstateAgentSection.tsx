import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RealEstateAgentSectionProps {
  form: UseFormReturn<any>;
}

const RealEstateAgentSection = ({ form }: RealEstateAgentSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Real Estate Agent Information</h3>
        <div className="space-y-4">
          {/* License Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="agentLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Real Estate License Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="CA-DRE-01234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="agentLicenseState"
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

          {/* Brokerage Information */}
          <FormField
            control={form.control}
            name="brokerageName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brokerage Name *</FormLabel>
                <FormControl>
                  <Input placeholder="ABC Realty Group" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brokeragePhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brokerage Phone Number *</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brokerageEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brokerage Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@brokerage.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Transaction Details */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Pending Commission Details</h4>
            
            <FormField
              control={form.control}
              name="numberOfPendingDeals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Deals in Escrow *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      placeholder="3" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Active transactions currently in escrow</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalPendingCommission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Pending Commission Amount ($) *</FormLabel>
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
                  <FormDescription>Total expected commission from all pending deals</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedClosingTimeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Closing Timeline *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under_30">Under 30 days</SelectItem>
                      <SelectItem value="30_60">30-60 days</SelectItem>
                      <SelectItem value="60_90">60-90 days</SelectItem>
                      <SelectItem value="over_90">Over 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>When you expect these commissions to close</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dealsSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deals Summary *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide details about your pending transactions: property addresses, sale prices, expected commission amounts, and closing dates..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include property details, sale prices, and status of each transaction
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Historical Performance */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Historical Performance</h4>
            
            <FormField
              control={form.control}
              name="annualClosedVolume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Closed Volume (Last 12 Months) ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="2500000.00" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Total sales volume in the past year</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="averageTransactionSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Transaction Size ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="450000.00" 
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

export default RealEstateAgentSection;
