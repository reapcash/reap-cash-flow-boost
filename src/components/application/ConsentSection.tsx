import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface ConsentSectionProps {
  form: UseFormReturn<any>;
}

const ConsentSection = ({ form }: ConsentSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Consent & Agreement</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please review and agree to the following terms to complete your application
        </p>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="creditReportAuthorized"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Authorization to Obtain Credit Report
                  </FormLabel>
                  <FormDescription>
                    I authorize ReapCapitalTrust to obtain my credit report for the purpose of evaluating my application.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="verificationConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Consent to Verify Property and Financial Information
                  </FormLabel>
                  <FormDescription>
                    I consent to ReapCapitalTrust verifying my property and financial details with relevant third parties.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAgreed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Agreement to Terms and Conditions
                  </FormLabel>
                  <FormDescription>
                    I have read and agree to the{' '}
                    <a href="#" className="text-primary hover:underline">
                      terms and conditions
                    </a>{' '}
                    of the Cash Advance Agreement.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
        <h4 className="font-semibold mb-2 text-primary">Important Notice</h4>
        <p className="text-sm text-muted-foreground">
          By submitting this application, you acknowledge that all information provided is accurate and complete to the best of your knowledge. 
          False or misleading information may result in the denial of your application or termination of any advance agreement.
        </p>
      </div>
    </div>
  );
};

export default ConsentSection;
