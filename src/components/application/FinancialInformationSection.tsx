import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FinancialInformationSectionProps {
  form: UseFormReturn<any>;
}

const FinancialInformationSection = ({ form }: FinancialInformationSectionProps) => {
  const properties = form.watch('properties') || [];

  return (
    <div className="space-y-8">
      {properties.map((_: any, index: number) => (
        <div key={index} className="space-y-6 p-6 border rounded-lg">
          <h3 className="text-lg font-semibold">
            Financial Information - Property #{index + 1}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`properties.${index}.currentMortgageBalance`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Mortgage Balance ($)</FormLabel>
                  <FormDescription>Leave blank if property is owned outright</FormDescription>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="250000"
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value) || undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`properties.${index}.monthlyMortgagePayment`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Mortgage Payment ($)</FormLabel>
                  <FormDescription>Leave blank if property is owned outright</FormDescription>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="1500"
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value) || undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name={`properties.${index}.outstandingDebts`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Outstanding Debts/Liens on Property</FormLabel>
                <FormDescription>
                  Please describe any outstanding debts or liens (if any)
                </FormDescription>
                <FormControl>
                  <Textarea 
                    placeholder="No outstanding debts or liens"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`properties.${index}.bankName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name (for disbursement)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Chase Bank"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`properties.${index}.bankAccountNumber`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account (Last 4 Digits)</FormLabel>
                  <FormDescription>For security, only enter last 4 digits</FormDescription>
                  <FormControl>
                    <Input 
                      placeholder="1234"
                      maxLength={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      <div className="border-t pt-6 space-y-6">
        <h3 className="text-lg font-semibold">Advance Terms</h3>

        <FormField
          control={form.control}
          name="preferredAdvanceAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Advance Amount ($)</FormLabel>
              <FormDescription>
                Enter the amount you would like to receive (minimum $1,000)
              </FormDescription>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  placeholder="10000"
                  value={field.value || ''} 
                  onChange={e => field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repaymentTerms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repayment Terms Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select repayment frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi_weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default FinancialInformationSection;
