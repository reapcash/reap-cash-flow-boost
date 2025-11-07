import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BrokerSectionProps {
  form: UseFormReturn<any>;
}

const BrokerSection = ({ form }: BrokerSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Brokerage Information</h3>
        <div className="space-y-4">
          {/* License Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="brokerLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Broker License Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="BRE-01234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="brokerLicenseState"
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

          {/* Brokerage Details */}
          <FormField
            control={form.control}
            name="brokerageLegalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brokerage Legal Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Premier Real Estate Brokerage Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="brokerageEstablishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Established *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1900"
                      max={new Date().getFullYear()}
                      placeholder="2010" 
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
              name="numberOfOfficeLocations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Office Locations *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      placeholder="3" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Team Information */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Team & Operations</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="numberOfAgents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Licensed Agents *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="25" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Total agents under your brokerage</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfSupportStaff"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Support Staff</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="5" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Administrative and support personnel</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="brokerageSplitStructure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Split Structure *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your commission split structure with agents (e.g., 70/30, 80/20, tiered structure, etc.)..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Financial Performance */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Brokerage Performance</h4>
            
            <FormField
              control={form.control}
              name="totalPendingBrokerageCommission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Pending Brokerage Commission ($) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="150000.00" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Total commission your brokerage will receive from pending transactions
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="numberOfPendingTransactions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Pending Transactions *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="20" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Across all agents</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="annualBrokerageVolume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Sales Volume ($) *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        step="0.01"
                        placeholder="25000000.00" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Last 12 months</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="brokerageTransactionsSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pending Transactions Summary *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide an overview of pending transactions, including total volume, expected closing dates, and key deals in pipeline..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include details about major transactions and expected closing timeline
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Monthly Operating Costs */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Operating Expenses</h4>
            
            <FormField
              control={form.control}
              name="monthlyOperatingCosts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Operating Costs ($)</FormLabel>
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
                  <FormDescription>
                    Rent, utilities, salaries, marketing, and other fixed costs
                  </FormDescription>
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

export default BrokerSection;
