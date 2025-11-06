import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Send } from 'lucide-react';
import PropertyInformationSection from './PropertyInformationSection';
import STRDetailsSection from './STRDetailsSection';
import FinancialInformationSection from './FinancialInformationSection';
import ConsentSection from './ConsentSection';
import DocumentUploadSection from './DocumentUploadSection';
import AirbnbConnectionSection from './AirbnbConnectionSection';
import BookingSelectionSection from './BookingSelectionSection';

const applicationSchema = z.object({
  // Property Information
  properties: z.array(z.object({
    propertyAddress: z.string().min(5, 'Address is required'),
    propertyType: z.enum(['single_family', 'multi_family', 'condo_apartment', 'other']),
    propertyTypeOther: z.string().optional(),
    numberOfBedrooms: z.number().min(1).max(50),
    numberOfBathrooms: z.number().min(0.5).max(50),
    squareFootage: z.number().min(100).max(100000),
    ownershipStatus: z.enum(['owned_outright', 'mortgaged']),
    yearOfPurchase: z.number().min(1900).max(new Date().getFullYear()),
    estimatedPropertyValue: z.number().min(10000),
    
    // STR Details
    bookingPlatforms: z.array(z.string()).min(1, 'Select at least one platform'),
    averageOccupancyRate: z.number().min(0).max(100),
    averageNightlyRate: z.number().min(0),
    averageMonthlyRevenue: z.number().min(0),
    bookingHistorySummary: z.string().optional(),
    futureBookingsNights: z.number().min(0).optional(),
    futureBookingsRevenue: z.number().min(0).optional(),
    
    // Financial
    currentMortgageBalance: z.number().min(0).optional(),
    monthlyMortgagePayment: z.number().min(0).optional(),
    outstandingDebts: z.string().optional(),
    bankName: z.string().optional(),
  })).min(1, 'Add at least one property'),
  
  // Financial Information
  preferredAdvanceAmount: z.number().min(1000, 'Minimum advance is $1,000'),
  repaymentTerms: z.enum(['weekly', 'bi_weekly', 'monthly']),
  
  // Consent
  creditReportAuthorized: z.boolean().refine(val => val === true, {
    message: 'You must authorize credit report check',
  }),
  verificationConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to verification',
  }),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: 'You must agree to terms and conditions',
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplicationForm = () => {
  const [activeTab, setActiveTab] = useState('property');
  
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      properties: [{
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
      }],
      repaymentTerms: 'monthly',
      creditReportAuthorized: false,
      verificationConsent: false,
      termsAgreed: false,
    },
  });

  const onSaveDraft = async (data: ApplicationFormData) => {
    console.log('Saving draft:', data);
    // TODO: Implement save draft functionality
  };

  const onSubmit = async (data: ApplicationFormData) => {
    console.log('Submitting application:', data);
    // TODO: Implement submit functionality
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Owner Registration & Cash Advance Application</CardTitle>
            <CardDescription>
              Complete all sections to apply for a cash advance on your short-term rental property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="property">Property</TabsTrigger>
                <TabsTrigger value="str">STR Details</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="consent">Consent</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="property" className="space-y-6 pt-6">
                <PropertyInformationSection form={form} />
              </TabsContent>

              <TabsContent value="str" className="space-y-6 pt-6">
                <STRDetailsSection form={form} />
                
                {/* Show booking selection if property exists */}
                {form.watch('properties')?.[0]?.propertyAddress && (
                  <div className="mt-8 pt-8 border-t">
                    <BookingSelectionSection 
                      propertyId={form.watch('properties')?.[0]?.propertyAddress}
                      onSelectionChange={(bookingIds, totalRevenue) => {
                        console.log('Selected bookings:', bookingIds, 'Total revenue:', totalRevenue);
                        // You can update form state here if needed
                      }}
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="financial" className="space-y-6 pt-6">
                <FinancialInformationSection form={form} />
              </TabsContent>

              <TabsContent value="consent" className="space-y-6 pt-6">
                <ConsentSection form={form} />
              </TabsContent>

              <TabsContent value="documents" className="space-y-6 pt-6">
                <DocumentUploadSection />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button 
            type="button" 
            variant="outline"
            onClick={form.handleSubmit(onSaveDraft)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Submit Application
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ApplicationForm;
