import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Eye, Calendar, DollarSign, Home, User, Phone, Mail, FileText, Building, TrendingUp, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import ApplicationApprovalDialog from './ApplicationApprovalDialog';

interface ApplicationReviewCardProps {
  application: any;
  onStatusUpdate: () => void;
}

const ApplicationReviewCard = ({ application, onStatusUpdate }: ApplicationReviewCardProps) => {
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
      submitted: { label: 'Pending Review', className: 'bg-yellow-500 text-white' },
      under_review: { label: 'Under Review', className: 'bg-blue-500 text-white' },
      approved: { label: 'Approved', className: 'bg-primary text-primary-foreground' },
      rejected: { label: 'Rejected', className: 'bg-destructive text-destructive-foreground' },
      funded: { label: 'Funded', className: 'bg-green-600 text-white' },
    };
    const variant = variants[status] || variants.draft;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const handleApprove = () => {
    setActionType('approve');
    setShowApprovalDialog(true);
  };

  const handleReject = () => {
    setActionType('reject');
    setShowApprovalDialog(true);
  };

  const property = application.properties?.[0];
  const profile = application.profiles;
  const formData = application.form_data || {};

  const getApplicantTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      str_host: 'STR Host',
      real_estate_agent: 'Real Estate Agent',
      property_manager: 'Property Manager',
      contractor: 'Contractor',
      broker: 'Broker',
      developer: 'Developer',
    };
    return labels[type] || type;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle>Application #{application.id.slice(0, 8)}</CardTitle>
                {getStatusBadge(application.status)}
                <Badge variant="outline" className="font-normal">
                  {getApplicantTypeLabel(application.applicant_type)}
                </Badge>
              </div>
              <CardDescription className="space-y-1">
                <div className="flex items-center gap-4 flex-wrap text-sm">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {profile?.full_name || 'Unknown'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {profile?.email || 'N/A'}
                  </span>
                  {profile?.phone_number && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {profile.phone_number}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Calendar className="h-3 w-3" />
                  Submitted: {format(new Date(application.submitted_at || application.created_at), 'MMM d, yyyy h:mm a')}
                </div>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Key Financial Summary */}
          <div className="grid md:grid-cols-3 gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Requested Amount</p>
              <p className="text-2xl font-bold text-primary">${application.requested_advance_amount?.toLocaleString() || '0'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold">${property?.average_monthly_revenue?.toLocaleString() || '0'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Future Bookings</p>
              <p className="text-2xl font-bold">${property?.future_bookings_revenue?.toLocaleString() || '0'}</p>
            </div>
          </div>

          {/* Property Information */}
          {property && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-medium">
                <Home className="h-4 w-4" />
                Property Information
              </div>
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg text-sm">
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Address:</span> {property.property_address}</p>
                  <p><span className="text-muted-foreground">Type:</span> {property.property_type.replace(/_/g, ' ').toUpperCase()}</p>
                  <p><span className="text-muted-foreground">Size:</span> {property.number_of_bedrooms} bed • {property.number_of_bathrooms} bath • {property.square_footage?.toLocaleString() || 'N/A'} sqft</p>
                  <p><span className="text-muted-foreground">Ownership:</span> {property.ownership_status.replace(/_/g, ' ').toUpperCase()}</p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Purchase Year:</span> {property.year_of_purchase || 'N/A'}</p>
                  <p><span className="text-muted-foreground">Property Value:</span> ${property.estimated_property_value?.toLocaleString() || 'N/A'}</p>
                  {property.current_mortgage_balance && (
                    <p><span className="text-muted-foreground">Mortgage Balance:</span> ${property.current_mortgage_balance.toLocaleString()}</p>
                  )}
                  {property.monthly_mortgage_payment && (
                    <p><span className="text-muted-foreground">Monthly Payment:</span> ${property.monthly_mortgage_payment.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STR Performance Metrics */}
          {property && (application.applicant_type === 'str_host') && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-medium">
                <TrendingUp className="h-4 w-4" />
                STR Performance Metrics
              </div>
              <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Occupancy Rate</p>
                  <p className="font-semibold text-lg">{property.average_occupancy_rate || '0'}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Avg Nightly Rate</p>
                  <p className="font-semibold text-lg">${property.average_nightly_rate?.toLocaleString() || '0'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Future Bookings</p>
                  <p className="font-semibold text-lg">{property.future_bookings_nights || '0'} nights</p>
                </div>
                {property.booking_platforms && property.booking_platforms.length > 0 && (
                  <div className="md:col-span-3">
                    <p className="text-muted-foreground mb-1">Platforms</p>
                    <p className="font-medium">{property.booking_platforms.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Banking Information */}
          {property?.bank_name && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-medium">
                <Building className="h-4 w-4" />
                Banking Information
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-sm">
                <p><span className="text-muted-foreground">Bank:</span> {property.bank_name}</p>
                {property.bank_account_number_last_4 && (
                  <p><span className="text-muted-foreground">Account:</span> ****{property.bank_account_number_last_4}</p>
                )}
              </div>
            </div>
          )}

          {/* Consent & Authorization Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-medium">
              <Shield className="h-4 w-4" />
              Consent & Authorization
            </div>
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                {application.credit_report_authorized ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <span>Credit Report</span>
              </div>
              <div className="flex items-center gap-2">
                {application.verification_consent ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <span>Verification</span>
              </div>
              <div className="flex items-center gap-2">
                {application.terms_agreed ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <span>Terms Agreed</span>
              </div>
            </div>
          </div>

          {/* Additional Form Data - Collapsible */}
          {Object.keys(formData).length > 0 && (
            <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  {isDetailsOpen ? 'Hide' : 'Show'} Additional Details
                  {isDetailsOpen ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 pt-4">
                <div className="p-4 bg-muted/30 rounded-lg text-sm space-y-2">
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}:</span>{' '}
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          <Separator />

          {/* Actions */}
          {(application.status === 'submitted' || application.status === 'under_review') && (
            <div className="flex gap-2">
              <Button onClick={handleApprove} className="flex-1">
                <CheckCircle className="mr-2 h-4 w-4" />
                {application.status === 'under_review' ? 'Approve Application' : 'Review & Approve'}
              </Button>
              <Button onClick={handleReject} variant="destructive" className="flex-1">
                <XCircle className="mr-2 h-4 w-4" />
                Reject Application
              </Button>
            </div>
          )}
          
          {application.status === 'approved' && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="font-medium text-primary">Application Approved</p>
              <p className="text-sm text-muted-foreground">
                Approved on {format(new Date(application.reviewed_at || application.updated_at), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          )}
          
          {application.status === 'rejected' && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
              <XCircle className="h-6 w-6 mx-auto mb-2 text-destructive" />
              <p className="font-medium text-destructive">Application Rejected</p>
              <p className="text-sm text-muted-foreground">
                Rejected on {format(new Date(application.reviewed_at || application.updated_at), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ApplicationApprovalDialog
        open={showApprovalDialog}
        onOpenChange={setShowApprovalDialog}
        application={application}
        property={property}
        actionType={actionType}
        onSuccess={onStatusUpdate}
      />
    </>
  );
};

export default ApplicationReviewCard;