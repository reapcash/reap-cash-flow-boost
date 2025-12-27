import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  AlertCircle, 
  Home, 
  DollarSign, 
  FileText, 
  Building2,
  User,
  Briefcase,
  HardHat,
  Building,
  Landmark,
  Edit
} from 'lucide-react';
import { ApplicantType } from './ApplicantTypeSelection';

interface ReviewSummarySectionProps {
  form: UseFormReturn<any>;
  applicantType: ApplicantType;
  onEditSection: (tab: string) => void;
  selectedBookingsRevenue?: number;
  allRequiredDocsUploaded: boolean;
}

const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) return 'Not provided';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const formatDate = (date: string | undefined): string => {
  if (!date) return 'Not provided';
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatPercentage = (value: number | undefined): string => {
  if (value === undefined || value === null) return 'Not provided';
  return `${value}%`;
};

const ReviewItem = ({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ElementType }) => (
  <div className="flex items-start gap-3 py-2">
    {Icon && <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
    <div className="flex-1 min-w-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium break-words">{value || 'Not provided'}</p>
    </div>
  </div>
);

const SectionCard = ({ 
  title, 
  icon: Icon, 
  children, 
  onEdit,
  isComplete = true 
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  onEdit: () => void;
  isComplete?: boolean;
}) => (
  <Card className="overflow-hidden">
    <CardHeader className="bg-muted/30 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
          {isComplete ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Complete
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <AlertCircle className="h-3 w-3 mr-1" />
              Incomplete
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </div>
    </CardHeader>
    <CardContent className="pt-4">
      {children}
    </CardContent>
  </Card>
);

const ReviewSummarySection = ({ 
  form, 
  applicantType, 
  onEditSection,
  selectedBookingsRevenue = 0,
  allRequiredDocsUploaded
}: ReviewSummarySectionProps) => {
  const values = form.getValues();
  const properties = values.properties || [];
  const property = properties[0] || {};

  const getPropertyTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      single_family: 'Single Family Home',
      multi_family: 'Multi-Family Property',
      condo_apartment: 'Condo/Apartment',
      other: property.propertyTypeOther || 'Other'
    };
    return labels[type] || type;
  };

  const getOwnershipLabel = (status: string): string => {
    const labels: Record<string, string> = {
      owned_outright: 'Owned Outright',
      mortgaged: 'Mortgaged'
    };
    return labels[status] || status;
  };

  const renderSTRHostSummary = () => (
    <>
      {/* Property Information */}
      <SectionCard 
        title="Property Information" 
        icon={Home}
        onEdit={() => onEditSection('property')}
        isComplete={!!(property.propertyStreet && property.propertyCity)}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <ReviewItem 
              label="Property Address" 
              value={property.propertyStreet 
                ? `${property.propertyStreet}, ${property.propertyCity}, ${property.propertyState} ${property.propertyZipcode}`
                : ''
              }
            />
            <ReviewItem label="Property Type" value={getPropertyTypeLabel(property.propertyType)} />
            <ReviewItem label="Ownership Status" value={getOwnershipLabel(property.ownershipStatus)} />
          </div>
          <div>
            <ReviewItem label="Bedrooms" value={property.numberOfBedrooms?.toString()} />
            <ReviewItem label="Bathrooms" value={property.numberOfBathrooms?.toString()} />
            <ReviewItem label="Square Footage" value={property.squareFootage ? `${property.squareFootage} sq ft` : ''} />
            <ReviewItem label="Year Purchased" value={property.yearOfPurchase?.toString()} />
            <ReviewItem label="Estimated Value" value={formatCurrency(property.estimatedPropertyValue)} />
          </div>
        </div>
      </SectionCard>

      {/* STR Details */}
      <SectionCard 
        title="STR Performance" 
        icon={Building2}
        onEdit={() => onEditSection('str')}
        isComplete={!!(property.averageMonthlyRevenue)}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <ReviewItem label="Booking Platforms" value={property.bookingPlatforms?.join(', ') || 'Not specified'} />
            <ReviewItem label="Average Occupancy Rate" value={formatPercentage(property.averageOccupancyRate)} />
            <ReviewItem label="Average Nightly Rate" value={formatCurrency(property.averageNightlyRate)} />
          </div>
          <div>
            <ReviewItem label="Average Monthly Revenue" value={formatCurrency(property.averageMonthlyRevenue)} />
            <ReviewItem label="Future Bookings (Nights)" value={property.futureBookingsNights?.toString()} />
            <ReviewItem label="Future Bookings Revenue" value={formatCurrency(property.futureBookingsRevenue)} />
          </div>
        </div>
        {selectedBookingsRevenue > 0 && (
          <>
            <Separator className="my-4" />
            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Selected Bookings Revenue</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(selectedBookingsRevenue)}</p>
            </div>
          </>
        )}
      </SectionCard>
    </>
  );

  const renderAgentSummary = () => (
    <SectionCard 
      title="Agent Information" 
      icon={User}
      onEdit={() => onEditSection('agent')}
      isComplete={!!(values.agentLicenseNumber && values.brokerageName)}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <ReviewItem label="License Number" value={values.agentLicenseNumber} />
          <ReviewItem label="License State" value={values.agentLicenseState} />
          <ReviewItem label="Brokerage Name" value={values.brokerageName} />
          <ReviewItem label="Brokerage Phone" value={values.brokeragePhone} />
          <ReviewItem label="Brokerage Email" value={values.brokerageEmail} />
        </div>
        <div>
          <ReviewItem label="Deals in Escrow" value={values.numberOfPendingDeals?.toString()} />
          <ReviewItem label="Total Pending Commission" value={formatCurrency(values.totalPendingCommission)} />
          <ReviewItem label="Closing Timeline" value={values.expectedClosingTimeline?.replace(/_/g, ' ')} />
          <ReviewItem label="Annual Closed Volume" value={formatCurrency(values.annualClosedVolume)} />
          <ReviewItem label="Avg Transaction Size" value={formatCurrency(values.averageTransactionSize)} />
        </div>
      </div>
      {values.dealsSummary && (
        <>
          <Separator className="my-4" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Deals Summary</p>
            <p className="text-sm whitespace-pre-wrap bg-muted/30 p-3 rounded-md">{values.dealsSummary}</p>
          </div>
        </>
      )}
    </SectionCard>
  );

  const renderManagerSummary = () => (
    <SectionCard 
      title="Property Management Information" 
      icon={Building2}
      onEdit={() => onEditSection('manager')}
      isComplete={!!(values.companyName && values.managedUnits)}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <ReviewItem label="Company Name" value={values.companyName} />
          <ReviewItem label="Years in Business" value={values.yearsInBusiness?.toString()} />
          <ReviewItem label="Total Managed Units" value={values.managedUnits?.toString()} />
          <ReviewItem label="Average Management Fee" value={formatPercentage(values.averageManagementFee)} />
        </div>
        <div>
          <ReviewItem label="Monthly Management Revenue" value={formatCurrency(values.monthlyManagementRevenue)} />
          <ReviewItem label="Property Types Managed" value={values.propertyTypesManagedSummary} />
        </div>
      </div>
    </SectionCard>
  );

  const renderContractorSummary = () => (
    <SectionCard 
      title="Contractor Information" 
      icon={HardHat}
      onEdit={() => onEditSection('contractor')}
      isComplete={!!(values.businessName && values.contractorLicenseNumber)}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <ReviewItem label="Business Name" value={values.businessName} />
          <ReviewItem label="License Number" value={values.contractorLicenseNumber} />
          <ReviewItem label="License State" value={values.contractorLicenseState} />
          <ReviewItem label="Insurance Provider" value={values.insuranceProvider} />
          <ReviewItem label="Years in Business" value={values.yearsInBusiness?.toString()} />
        </div>
        <div>
          <ReviewItem label="Trade Specialties" value={values.tradeSpecialties?.join(', ')} />
          <ReviewItem label="Active Projects" value={values.activeProjects?.toString()} />
          <ReviewItem label="Pending Invoices" value={formatCurrency(values.pendingInvoicesTotal)} />
          <ReviewItem label="Payment Terms" value={values.paymentTerms} />
          <ReviewItem label="Annual Revenue" value={formatCurrency(values.annualRevenue)} />
        </div>
      </div>
    </SectionCard>
  );

  const renderBrokerSummary = () => (
    <SectionCard 
      title="Brokerage Information" 
      icon={Building}
      onEdit={() => onEditSection('broker')}
      isComplete={!!(values.brokerageLicenseNumber && values.brokerageLegalName)}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <ReviewItem label="Brokerage Legal Name" value={values.brokerageLegalName} />
          <ReviewItem label="License Number" value={values.brokerageLicenseNumber} />
          <ReviewItem label="License State" value={values.brokerageLicenseState} />
          <ReviewItem label="Number of Agents" value={values.numberOfAgents?.toString()} />
        </div>
        <div>
          <ReviewItem label="Commission Split" value={formatPercentage(values.averageCommissionSplit)} />
          <ReviewItem label="Pending Transactions" value={values.pendingTransactions?.toString()} />
          <ReviewItem label="Annual Sales Volume" value={formatCurrency(values.annualSalesVolume)} />
          <ReviewItem label="Monthly Operating Costs" value={formatCurrency(values.monthlyOperatingCosts)} />
        </div>
      </div>
    </SectionCard>
  );

  const renderDeveloperSummary = () => (
    <SectionCard 
      title="Developer Information" 
      icon={Landmark}
      onEdit={() => onEditSection('developer')}
      isComplete={!!(values.developerCompanyName && values.developmentProjectName)}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <ReviewItem label="Company Name" value={values.developerCompanyName} />
          <ReviewItem label="Years in Development" value={values.yearsInDevelopment?.toString()} />
          <ReviewItem label="Project Name" value={values.developmentProjectName} />
          <ReviewItem label="Project Type" value={values.projectType} />
          <ReviewItem label="Total Units" value={values.totalUnits?.toString()} />
        </div>
        <div>
          <ReviewItem label="Pre-Sold Units" value={values.preSoldUnits?.toString()} />
          <ReviewItem label="Pre-Sale Revenue" value={formatCurrency(values.preSaleRevenue)} />
          <ReviewItem label="Expected Completion" value={formatDate(values.expectedCompletionDate)} />
          <ReviewItem label="Construction Status" value={values.constructionStatus} />
        </div>
      </div>
    </SectionCard>
  );

  const renderApplicantTypeSection = () => {
    switch (applicantType) {
      case 'str_host':
        return renderSTRHostSummary();
      case 'real_estate_agent':
        return renderAgentSummary();
      case 'property_manager':
        return renderManagerSummary();
      case 'contractor':
        return renderContractorSummary();
      case 'broker':
        return renderBrokerSummary();
      case 'developer':
        return renderDeveloperSummary();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg">Review Your Application</h3>
            <p className="text-muted-foreground">
              Please review all the information below before submitting. Click "Edit" on any section to make changes.
            </p>
          </div>
        </div>
      </div>

      {/* Applicant-type specific sections */}
      {renderApplicantTypeSection()}

      {/* Financial Information - Common for all types */}
      <SectionCard 
        title="Financial & Advance Terms" 
        icon={DollarSign}
        onEdit={() => onEditSection('financial')}
        isComplete={!!(values.preferredAdvanceAmount && values.payoutDate)}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {applicantType === 'str_host' && (
            <div>
              <ReviewItem label="Mortgage Balance" value={formatCurrency(property.currentMortgageBalance)} />
              <ReviewItem label="Monthly Mortgage Payment" value={formatCurrency(property.monthlyMortgagePayment)} />
              <ReviewItem label="Outstanding Debts" value={property.outstandingDebts || 'None'} />
              <ReviewItem label="Bank Name" value={property.bankName} />
            </div>
          )}
          <div className={applicantType === 'str_host' ? '' : 'md:col-span-2'}>
            <div className="bg-primary/5 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground">Requested Advance Amount</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(values.preferredAdvanceAmount)}</p>
            </div>
            <ReviewItem label="Expected Payout Date" value={formatDate(values.payoutDate)} />
          </div>
        </div>
      </SectionCard>

      {/* Consent Section */}
      <SectionCard 
        title="Consent & Agreements" 
        icon={FileText}
        onEdit={() => onEditSection('consent')}
        isComplete={values.creditReportAuthorized && values.verificationConsent && values.termsAgreed}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {values.creditReportAuthorized ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            )}
            <span className={values.creditReportAuthorized ? 'text-green-700' : 'text-amber-600'}>
              Credit Report Authorization
            </span>
          </div>
          <div className="flex items-center gap-2">
            {values.verificationConsent ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            )}
            <span className={values.verificationConsent ? 'text-green-700' : 'text-amber-600'}>
              Verification Consent
            </span>
          </div>
          <div className="flex items-center gap-2">
            {values.termsAgreed ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            )}
            <span className={values.termsAgreed ? 'text-green-700' : 'text-amber-600'}>
              Terms and Conditions
            </span>
          </div>
        </div>
      </SectionCard>

      {/* Documents Status */}
      <SectionCard 
        title="Required Documents" 
        icon={FileText}
        onEdit={() => onEditSection('documents')}
        isComplete={allRequiredDocsUploaded}
      >
        <div className="flex items-center gap-3">
          {allRequiredDocsUploaded ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">All required documents have been uploaded</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span className="text-amber-600 font-medium">Some required documents are missing</span>
            </>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

export default ReviewSummarySection;
