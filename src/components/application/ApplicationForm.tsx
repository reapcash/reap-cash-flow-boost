import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { LeaveConfirmationDialog } from './LeaveConfirmationDialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CheckCircle, Sparkles } from 'lucide-react';

const applicationSchema = z.object({
  // Property Information (optional for non-STR hosts)
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
    bookingPlatforms: z.array(z.string()).optional(),
    averageOccupancyRate: z.number().min(0).max(100).optional(),
    averageNightlyRate: z.number().min(0).optional(),
    averageMonthlyRevenue: z.number().min(0).optional(),
    bookingHistorySummary: z.string().optional(),
    futureBookingsNights: z.number().min(0).optional(),
    futureBookingsRevenue: z.number().min(0).optional(),
    
    // Financial
    currentMortgageBalance: z.number().min(0).optional(),
    monthlyMortgagePayment: z.number().min(0).optional(),
    outstandingDebts: z.string().optional(),
    bankName: z.string().optional(),
  })).optional(),
  
  // Financial Information
  preferredAdvanceAmount: z.number().min(1000, 'Minimum advance is $1,000'),
  payoutDate: z.string().min(1, 'Payout date is required').refine((date) => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today;
  }, { message: 'Payout date must be in the future' }),
  
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
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [pendingDraftData, setPendingDraftData] = useState<ApplicationFormData | null>(null);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const finalSubmitLockRef = useRef(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get('draft');
  
  // Fire confetti when success dialog opens
  useEffect(() => {
    if (!isSuccessDialogOpen) return;
    let cancelled = false;
    (async () => {
      const confetti = (await import('canvas-confetti')).default;
      const getVar = (name: string) =>
        getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      const primary = getVar('--primary');
      const colors = [`hsl(${primary})`, '#ffffff', '#e6ffe6'];
      const end = Date.now() + 1500;
      const frame = () => {
        confetti({
          particleCount: 30,
          startVelocity: 45,
          spread: 70,
          ticks: 200,
          origin: { x: Math.random(), y: Math.random() * 0.3 + 0.1 },
          colors,
          scalar: 0.9,
        });
        if (!cancelled && Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    })();
    return () => {
      cancelled = true;
    };
  }, [isSuccessDialogOpen]);
  
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: applicantType === 'str_host' ? {
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
        futureBookingsNights: 0,
        futureBookingsRevenue: 0,
      }],
      preferredAdvanceAmount: 0,
      payoutDate: '',
      creditReportAuthorized: false,
      verificationConsent: false,
      termsAgreed: false,
    } : {
      properties: undefined,
      preferredAdvanceAmount: 0,
      payoutDate: '',
      creditReportAuthorized: false,
      verificationConsent: false,
      termsAgreed: false,
    },
  });

  // Load draft data if draftId is present
  useEffect(() => {
    const loadDraft = async () => {
      if (!draftId || !user) return;

      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('id', draftId)
          .eq('user_id', user.id)
          .eq('status', 'draft')
          .maybeSingle();

        if (error) throw error;
        
        if (data && data.form_data) {
          setApplicationId(data.id);
          
          // Type guard for form_data
          const formData = data.form_data as any;
          if (formData.draftName) {
            setDraftName(formData.draftName);
          }
          
          // Populate form with saved data
          form.reset(formData);

          // Load property data if exists
          const { data: propertyData } = await supabase
            .from('properties')
            .select('*')
            .eq('application_id', data.id)
            .maybeSingle();

          if (propertyData) {
            setPropertyId(propertyData.id);
          }
        }
      } catch (error) {
        console.error('Error loading draft:', error);
        toast({
          title: "Error",
          description: "Failed to load draft",
          variant: "destructive",
        });
      }
    };

    loadDraft();
  }, [draftId, user, form, toast]);

  const saveApplicationAndProperty = async (data: ApplicationFormData, isDraft: boolean = true, draftNameParam?: string) => {
    if (!user) return;
    
    try {
      // CRITICAL: Prevent rapid double submissions creating duplicates
      if (!isDraft) {
        if (finalSubmitLockRef.current) {
          console.log('Submission blocked: already in progress');
          return;
        }
        finalSubmitLockRef.current = true;
        console.log('Final submission lock acquired');
      }
      setSaving(true);

      // CRITICAL: Check if application is already submitted to prevent duplicate submissions
      if (!isDraft && applicationId) {
        const { data: existingApp } = await supabase
          .from('applications')
          .select('status')
          .eq('id', applicationId)
          .single();
        
        if (existingApp?.status === 'submitted') {
          console.log('Submission blocked: application already submitted');
          toast({
            title: 'Application already submitted',
            description: 'This application has already been submitted for review.',
          });
          setSaving(false);
          finalSubmitLockRef.current = false;
          return;
        }
      }

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
        preferred_advance_amount: data.preferredAdvanceAmount || 0,
        payout_date: data.payoutDate || null,
        credit_report_authorized: data.creditReportAuthorized || false,
        verification_consent: data.verificationConsent || false,
        terms_agreed: data.termsAgreed || false,
        selected_booking_ids: selectedBookingIds,
        requested_advance_amount: data.preferredAdvanceAmount || 0,
        selected_bookings_revenue: selectedBookingsRevenue,
        submitted_at: isDraft ? null : new Date().toISOString(),
        form_data: formData, // Store all form data as JSONB including draft name
      };

      console.log(`Saving application as: ${isDraft ? 'DRAFT' : 'SUBMITTED'}`);

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

      // Only create/update property for STR Host applications that have property data
      const isSTRApplication = applicantType === 'str_host';
      const hasPropertyData = data.properties?.[0] && 
        data.properties[0].propertyStreet && 
        data.properties[0].propertyCity && 
        data.properties[0].propertyState && 
        data.properties[0].propertyZipcode;

      if (isSTRApplication && hasPropertyData) {
        const propertyData = {
          application_id: appId,
          property_address: `${data.properties[0].propertyStreet}, ${data.properties[0].propertyCity}, ${data.properties[0].propertyState} ${data.properties[0].propertyZipcode}`,
          property_type: data.properties[0].propertyType || 'single_family',
          property_type_other: data.properties[0].propertyTypeOther,
          number_of_bedrooms: data.properties[0].numberOfBedrooms || 1,
          number_of_bathrooms: data.properties[0].numberOfBathrooms || 1,
          square_footage: data.properties[0].squareFootage || 1000,
          ownership_status: data.properties[0].ownershipStatus || 'mortgaged',
          year_of_purchase: data.properties[0].yearOfPurchase || new Date().getFullYear(),
          estimated_property_value: data.properties[0].estimatedPropertyValue || 0,
          booking_platforms: data.properties[0].bookingPlatforms || [],
          average_occupancy_rate: data.properties[0].averageOccupancyRate || 0,
          average_nightly_rate: data.properties[0].averageNightlyRate || 0,
          average_monthly_revenue: data.properties[0].averageMonthlyRevenue || 0,
          booking_history_summary: data.properties[0].bookingHistorySummary,
          future_bookings_nights: data.properties[0].futureBookingsNights || 0,
          future_bookings_revenue: data.properties[0].futureBookingsRevenue || 0,
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

          if (propError) {
            console.error('Property creation error:', propError);
            // Don't throw error during draft saves - property data might be incomplete
            if (!isDraft) {
              throw new Error(`Failed to save property: ${propError.message}`);
            }
          } else {
            setPropertyId(newProperty.id);
          }
        } else {
          const { error: updateError } = await supabase
            .from('properties')
            .update(propertyData)
            .eq('id', propertyId);

          if (updateError) {
            console.error('Property update error:', updateError);
            // Don't throw error during draft saves - property data might be incomplete
            if (!isDraft) {
              throw new Error(`Failed to update property: ${updateError.message}`);
            }
          }
        }
      }

      if (isDraft) {
        console.log('✓ Draft saved successfully');
        toast({
          title: 'Draft saved',
          description: 'Your application has been saved as a draft',
        });
      } else {
        // CRITICAL: Show success dialog ONLY for final submission via submit button
        console.log('✓✓✓ APPLICATION SUBMITTED SUCCESSFULLY ✓✓✓');
        console.log('Status: submitted, submitted_at:', applicationData.submitted_at);
        console.log('Opening success dialog with confetti animation');
        setSaving(false); // Ensure saving is false before showing dialog
        setIsSuccessDialogOpen(true);
        // Lock remains active to prevent resubmission
      }

    } catch (error: any) {
      // Only show error toasts for non-draft submissions
      // During draft saves (including auto-saves during document uploads), silently log errors
      console.error('Error in saveApplicationAndProperty:', error);
      if (!isDraft) {
        finalSubmitLockRef.current = false;
        toast({
          title: 'Error Submitting Application',
          description: error.message || 'An unexpected error occurred',
          variant: 'destructive',
        });
      } else {
        console.log('Draft save error (non-critical):', error.message);
      }
    } finally {
      if (isDraft || !isSuccessDialogOpen) {
        setSaving(false);
      }
    }
  };

  const handleSaveDraftClick = (data: ApplicationFormData) => {
    console.log('Save Draft button clicked - opening draft dialog');
    setPendingDraftData(data);
    setShowSaveDraftDialog(true);
  };

  const onSaveDraft = async (name: string) => {
    if (!pendingDraftData) return;
    console.log('Saving draft with name:', name);
    setDraftName(name);
    // CRITICAL: isDraft = true means this is NOT a submission
    await saveApplicationAndProperty(pendingDraftData, true, name);
    setPendingDraftData(null);
    // Dialog will stay open to show success message
  };

  const onDiscardDraft = () => {
    setPendingDraftData(null);
    setShowSaveDraftDialog(false);
    navigate('/dashboard');
  };

  const handleDialogOpenChange = (open: boolean) => {
    setShowSaveDraftDialog(open);
    if (!open) {
      setPendingDraftData(null);
    }
  };

  const handleBackToDashboard = () => {
    const isDirty = form.formState.isDirty;
    
    if (isDirty) {
      setShowLeaveDialog(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleLeaveAndSave = () => {
    const data = form.getValues();
    setPendingDraftData(data as ApplicationFormData);
    setShowLeaveDialog(false);
    setShowSaveDraftDialog(true);
  };

  const handleLeaveAndDiscard = () => {
    setShowLeaveDialog(false);
    navigate('/dashboard');
  };

  const onSubmit = async (data: ApplicationFormData) => {
    console.log('═══════════════════════════════════════════════════');
    console.log('🚀 SUBMIT APPLICATION BUTTON CLICKED');
    console.log('═══════════════════════════════════════════════════');
    console.log('Form validation passed, submitting application...');
    console.log('Applicant type:', applicantType);
    
    try {
      // CRITICAL: isDraft = false means this is a FINAL SUBMISSION
      await saveApplicationAndProperty(data, false);
      console.log('✓ Submission process completed');
    } catch (error) {
      console.error('✗ Error in onSubmit:', error);
      toast({
        title: 'Submission Error',
        description: error instanceof Error ? error.message : 'Failed to submit application',
        variant: 'destructive',
      });
    }
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
              <DocumentUploadSection 
                applicationId={applicationId} 
                onApplicationCreated={setApplicationId}
                applicantType={applicantType}
              />
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
              <DocumentUploadSection 
                applicationId={applicationId} 
                onApplicationCreated={setApplicationId}
                applicantType={applicantType}
              />
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
              <DocumentUploadSection 
                applicationId={applicationId} 
                onApplicationCreated={setApplicationId}
                applicantType={applicantType}
              />
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
              <DocumentUploadSection 
                applicationId={applicationId} 
                onApplicationCreated={setApplicationId}
                applicantType={applicantType}
              />
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
              <DocumentUploadSection 
                applicationId={applicationId} 
                onApplicationCreated={setApplicationId}
                applicantType={applicantType}
              />
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
              <DocumentUploadSection 
                applicationId={applicationId} 
                onApplicationCreated={setApplicationId}
                applicantType={applicantType}
              />
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
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log('Form validation errors:', errors);
        
        // Build detailed error message
        const errorFields = [];
        if (errors.preferredAdvanceAmount) errorFields.push('Preferred Advance Amount');
        if (errors.payoutDate) errorFields.push('Payout Date');
        if (errors.creditReportAuthorized) errorFields.push('Credit Report Authorization');
        if (errors.verificationConsent) errorFields.push('Verification Consent');
        if (errors.termsAgreed) errorFields.push('Terms and Conditions');
        if (errors.properties) errorFields.push('Property Information');
        
        const errorMessage = errorFields.length > 0 
          ? `Missing required fields: ${errorFields.join(', ')}`
          : 'Please fill in all required fields correctly';
        
        toast({
          title: 'Cannot Submit Application',
          description: errorMessage,
          variant: 'destructive'
        });
      })} className="space-y-6">
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

        <div className="flex gap-4 justify-between">
          <Button 
            type="button" 
            variant="ghost"
            onClick={handleBackToDashboard}
            disabled={saving}
          >
            Back to Dashboard
          </Button>
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                const data = form.getValues();
                handleSaveDraftClick(data as ApplicationFormData);
              }}
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Draft
            </Button>
            <Button 
              type="submit" 
              disabled={saving}
              className="bg-primary hover:bg-primary/90"
            >
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Submit Application
            </Button>
          </div>
        </div>
        
        <SaveDraftDialog
          open={showSaveDraftDialog}
          onOpenChange={handleDialogOpenChange}
          onSave={onSaveDraft}
          onDiscard={onDiscardDraft}
          defaultName={draftName || 'Untitled Application'}
        />

        <LeaveConfirmationDialog
          open={showLeaveDialog}
          onOpenChange={setShowLeaveDialog}
          onSaveDraft={handleLeaveAndSave}
          onDiscard={handleLeaveAndDiscard}
        />

        <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col items-center text-center space-y-6 py-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative rounded-full bg-gradient-to-br from-primary to-primary-glow p-6">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-primary animate-pulse" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Application Submitted!
                </h2>
                <p className="text-muted-foreground text-lg">
                  Thank you for submitting your application. The REAP team is currently reviewing your submission and will get back to you shortly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
                <Button 
                  onClick={() => {
                    setIsSuccessDialogOpen(false);
                    navigate('/dashboard');
                  }}
                  className="flex-1"
                  size="lg"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  onClick={() => setIsSuccessDialogOpen(false)}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default ApplicationForm;
