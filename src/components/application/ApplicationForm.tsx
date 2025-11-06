import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Send, Loader2 } from 'lucide-react';
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
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [selectedBookingIds, setSelectedBookingIds] = useState<string[]>([]);
  const [selectedBookingsRevenue, setSelectedBookingsRevenue] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  const saveApplicationAndProperty = async (data: ApplicationFormData, isDraft: boolean = true) => {
    if (!user) return;
    
    try {
      setSaving(true);

      // Create or update application
      const applicationData = {
        user_id: user.id,
        status: (isDraft ? 'draft' : 'submitted') as 'draft' | 'submitted',
        preferred_advance_amount: data.preferredAdvanceAmount,
        repayment_terms: data.repaymentTerms,
        credit_report_authorized: data.creditReportAuthorized,
        verification_consent: data.verificationConsent,
        terms_agreed: data.termsAgreed,
        selected_booking_ids: selectedBookingIds,
        requested_advance_amount: data.preferredAdvanceAmount,
        selected_bookings_revenue: selectedBookingsRevenue,
        submitted_at: isDraft ? null : new Date().toISOString(),
      };

      let appId = applicationId;
      
      if (!applicationId) {
        const { data: newApp, error: appError } = await supabase
          .from('applications')
          .insert([applicationData])
          .select()
          .single();

        if (appError) throw appError;
        appId = newApp.id;
        setApplicationId(appId);
      } else {
        const { error: updateError } = await supabase
          .from('applications')
          .update(applicationData)
          .eq('id', applicationId);

        if (updateError) throw updateError;
      }

      // Create or update property
      const propertyData = {
        application_id: appId,
        property_address: data.properties[0].propertyAddress,
        property_type: data.properties[0].propertyType,
        property_type_other: data.properties[0].propertyTypeOther,
        number_of_bedrooms: data.properties[0].numberOfBedrooms,
        number_of_bathrooms: data.properties[0].numberOfBathrooms,
        square_footage: data.properties[0].squareFootage,
        ownership_status: data.properties[0].ownershipStatus,
        year_of_purchase: data.properties[0].yearOfPurchase,
        estimated_property_value: data.properties[0].estimatedPropertyValue,
        booking_platforms: data.properties[0].bookingPlatforms,
        average_occupancy_rate: data.properties[0].averageOccupancyRate,
        average_nightly_rate: data.properties[0].averageNightlyRate,
        average_monthly_revenue: data.properties[0].averageMonthlyRevenue,
        booking_history_summary: data.properties[0].bookingHistorySummary,
        future_bookings_nights: data.properties[0].futureBookingsNights,
        future_bookings_revenue: data.properties[0].futureBookingsRevenue,
        current_mortgage_balance: data.properties[0].currentMortgageBalance,
        monthly_mortgage_payment: data.properties[0].monthlyMortgagePayment,
        outstanding_debts: data.properties[0].outstandingDebts,
        bank_name: data.properties[0].bankName,
      };

      if (!propertyId) {
        const { data: newProperty, error: propError } = await supabase
          .from('properties')
          .insert([propertyData])
          .select()
          .single();

        if (propError) throw propError;
        setPropertyId(newProperty.id);
      } else {
        const { error: updateError } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', propertyId);

        if (updateError) throw updateError;
      }

      toast({
        title: isDraft ? 'Draft saved' : 'Application submitted',
        description: isDraft 
          ? 'Your application has been saved as a draft' 
          : 'Your application has been submitted successfully',
      });

      if (!isDraft) {
        navigate('/dashboard');
      }

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const onSaveDraft = async (data: ApplicationFormData) => {
    await saveApplicationAndProperty(data, true);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    await saveApplicationAndProperty(data, false);
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
                
                {/* Save property first to enable Airbnb connection */}
                {!propertyId && form.watch('properties')?.[0]?.propertyAddress && (
                  <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Save your property information to connect your Airbnb account and import bookings
                    </p>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => form.handleSubmit(onSaveDraft)()}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save & Continue
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Airbnb Connection Section */}
                {propertyId && (
                  <div className="mt-8 pt-8 border-t">
                    <AirbnbConnectionSection propertyId={propertyId} />
                  </div>
                )}

                {/* Booking Selection Section */}
                {propertyId && (
                  <div className="mt-8 pt-8 border-t">
                    <BookingSelectionSection 
                      propertyId={propertyId}
                      onSelectionChange={(bookingIds, totalRevenue) => {
                        setSelectedBookingIds(bookingIds);
                        setSelectedBookingsRevenue(totalRevenue);
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
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Draft
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Submit Application
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ApplicationForm;
