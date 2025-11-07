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
import { ApplicantType } from './ApplicantTypeSelection';
import PropertyInformationSection from './PropertyInformationSection';
import STRDetailsSection from './STRDetailsSection';
import FinancialInformationSection from './FinancialInformationSection';
import ConsentSection from './ConsentSection';
import DocumentUploadSection from './DocumentUploadSection';
import AirbnbConnectionSection from './AirbnbConnectionSection';
import BookingSelectionSection from './BookingSelectionSection';
import RealEstateAgentSection from './RealEstateAgentSection';
import PropertyManagerSection from './PropertyManagerSection';
import ContractorSection from './ContractorSection';
import BrokerSection from './BrokerSection';
import DeveloperSection from './DeveloperSection';
import { SaveDraftDialog } from './SaveDraftDialog';

const applicationSchema = z.object({
  // Property Information
  properties: z.array(z.object({
    propertyStreet: z.string().min(3, 'Street address is required').max(200),
    propertyCity: z.string().min(2, 'City is required').max(100),
    propertyState: z.string().length(2, 'State must be 2 letters').regex(/^[A-Z]{2}$/, 'State must be 2 uppercase letters'),
    propertyZipcode: z.string().length(5, 'ZIP code must be 5 digits').regex(/^\d{5}$/, 'ZIP code must be numeric'),
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

interface ApplicationFormProps {
  applicantType: ApplicantType;
}

const getApplicationTitle = (type: ApplicantType): string => {
  const titles = {
    str_host: 'STR Host Cash Advance Application',
    real_estate_agent: 'Real Estate Agent Commission Advance Application',
    property_manager: 'Property Manager Revenue Advance Application',
    contractor: 'Contractor Invoice Advance Application',
    broker: 'Brokerage Commission Advance Application',
    developer: 'Developer Pre-Sale Advance Application',
  };
  return titles[type];
};

const getApplicationDescription = (type: ApplicantType): string => {
  const descriptions = {
    str_host: 'Get a cash advance on your verified future Airbnb bookings',
    real_estate_agent: 'Access your pending commission earnings today',
    property_manager: 'Unlock cash from your recurring management fees',
    contractor: 'Get paid on your outstanding invoices immediately',
    broker: 'Access your brokerage pipeline commission revenue',
    developer: 'Leverage your pre-sale contracts for immediate capital',
  };
  return descriptions[type];
};

const getTabOrder = (type: ApplicantType): string[] => {
  switch (type) {
    case 'str_host':
      return ['property', 'str', 'financial', 'consent', 'documents'];
    case 'real_estate_agent':
      return ['agent', 'financial', 'consent', 'documents'];
    case 'property_manager':
      return ['manager', 'financial', 'consent', 'documents'];
    case 'contractor':
      return ['contractor', 'financial', 'consent', 'documents'];
    case 'broker':
      return ['broker', 'financial', 'consent', 'documents'];
    case 'developer':
      return ['developer', 'financial', 'consent', 'documents'];
    default:
      return [];
  }
};

const ApplicationForm = ({ applicantType }: ApplicationFormProps) => {
  const [activeTab, setActiveTab] = useState(() => {
    const tabOrders = getTabOrder(applicantType);
    return tabOrders[0];
  });
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [selectedBookingIds, setSelectedBookingIds] = useState<string[]>([]);
  const [selectedBookingsRevenue, setSelectedBookingsRevenue] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [showSaveDraftDialog, setShowSaveDraftDialog] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [pendingDraftData, setPendingDraftData] = useState<ApplicationFormData | null>(null);
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

  const saveApplicationAndProperty = async (data: ApplicationFormData, isDraft: boolean = true, draftNameParam?: string) => {
    if (!user) return;
    
    try {
      setSaving(true);

      // Collect all form data based on applicant type
      const formData: any = { 
        ...data,
        draftName: draftNameParam || draftName || 'Untitled Draft'
      };
      
      // Create or update application
      const applicationData = {
        user_id: user.id,
        applicant_type: applicantType,
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
        form_data: formData, // Store all form data as JSONB including draft name
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
        property_address: `${data.properties[0].propertyStreet}, ${data.properties[0].propertyCity}, ${data.properties[0].propertyState} ${data.properties[0].propertyZipcode}`,
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

  const handleSaveDraftClick = (data: ApplicationFormData) => {
    setPendingDraftData(data);
    setShowSaveDraftDialog(true);
  };

  const onSaveDraft = async (name: string) => {
    if (!pendingDraftData) return;
    setDraftName(name);
    await saveApplicationAndProperty(pendingDraftData, true, name);
    setPendingDraftData(null);
  };

  const onDiscardDraft = () => {
    setPendingDraftData(null);
    navigate('/dashboard');
  };

  const onSubmit = async (data: ApplicationFormData) => {
    await saveApplicationAndProperty(data, false);
  };

  const tabOrder = getTabOrder(applicantType);
  const currentTabIndex = tabOrder.indexOf(activeTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === tabOrder.length - 1;

  const handleNext = () => {
    if (!isLastTab) {
      setActiveTab(tabOrder[currentTabIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (!isFirstTab) {
      setActiveTab(tabOrder[currentTabIndex - 1]);
    }
  };

  const renderTabNavigation = () => (
    <div className="flex justify-between pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        disabled={isFirstTab}
      >
        Previous
      </Button>
      {!isLastTab ? (
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      ) : null}
    </div>
  );

  // Render different tabs based on applicant type
  const renderTabs = () => {
    switch (applicantType) {
      case 'str_host':
        return (
          <>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="str">STR Details</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="consent">Consent</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="property" className="space-y-6 pt-6">
              <PropertyInformationSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="str" className="space-y-6 pt-6">
              <STRDetailsSection form={form} />
              
              {!propertyId && form.watch('properties')?.[0]?.propertyStreet && (
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">
                    Save your property information to connect your Airbnb account and import bookings
                  </p>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => form.handleSubmit(handleSaveDraftClick)()}
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

              {propertyId && (
                <div className="mt-8 pt-8 border-t">
                  <AirbnbConnectionSection propertyId={propertyId} />
                </div>
              )}

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
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="financial" className="space-y-6 pt-6">
              <FinancialInformationSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="consent" className="space-y-6 pt-6">
              <ConsentSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 pt-6">
              <DocumentUploadSection applicationId={applicationId} />
              {renderTabNavigation()}
            </TabsContent>
          </>
        );

      case 'real_estate_agent':
        return (
          <>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="agent">Agent Info</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="consent">Consent</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="agent" className="space-y-6 pt-6">
              <RealEstateAgentSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="financial" className="space-y-6 pt-6">
              <FinancialInformationSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="consent" className="space-y-6 pt-6">
              <ConsentSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 pt-6">
              <DocumentUploadSection applicationId={applicationId} />
              {renderTabNavigation()}
            </TabsContent>
          </>
        );

      case 'property_manager':
        return (
          <>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="manager">Management Info</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="consent">Consent</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="manager" className="space-y-6 pt-6">
              <PropertyManagerSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="financial" className="space-y-6 pt-6">
              <FinancialInformationSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="consent" className="space-y-6 pt-6">
              <ConsentSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 pt-6">
              <DocumentUploadSection applicationId={applicationId} />
              {renderTabNavigation()}
            </TabsContent>
          </>
        );

      case 'contractor':
        return (
          <>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="contractor">Contractor Info</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="consent">Consent</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="contractor" className="space-y-6 pt-6">
              <ContractorSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="financial" className="space-y-6 pt-6">
              <FinancialInformationSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="consent" className="space-y-6 pt-6">
              <ConsentSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 pt-6">
              <DocumentUploadSection applicationId={applicationId} />
              {renderTabNavigation()}
            </TabsContent>
          </>
        );

      case 'broker':
        return (
          <>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="broker">Brokerage Info</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="consent">Consent</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="broker" className="space-y-6 pt-6">
              <BrokerSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="financial" className="space-y-6 pt-6">
              <FinancialInformationSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="consent" className="space-y-6 pt-6">
              <ConsentSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 pt-6">
              <DocumentUploadSection applicationId={applicationId} />
              {renderTabNavigation()}
            </TabsContent>
          </>
        );

      case 'developer':
        return (
          <>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="developer">Developer Info</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="consent">Consent</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="developer" className="space-y-6 pt-6">
              <DeveloperSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="financial" className="space-y-6 pt-6">
              <FinancialInformationSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="consent" className="space-y-6 pt-6">
              <ConsentSection form={form} />
              {renderTabNavigation()}
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 pt-6">
              <DocumentUploadSection applicationId={applicationId} />
              {renderTabNavigation()}
            </TabsContent>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{getApplicationTitle(applicantType)}</CardTitle>
            <CardDescription>
              {getApplicationDescription(applicantType)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {renderTabs()}
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button 
            type="button" 
            variant="outline"
            onClick={form.handleSubmit(handleSaveDraftClick)}
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
