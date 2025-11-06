import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Eye, Calendar, DollarSign, Home, User } from 'lucide-react';
import { format } from 'date-fns';
import ApplicationApprovalDialog from './ApplicationApprovalDialog';

interface ApplicationReviewCardProps {
  application: any;
  onStatusUpdate: () => void;
}

const ApplicationReviewCard = ({ application, onStatusUpdate }: ApplicationReviewCardProps) => {
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');

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

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                Application #{application.id.slice(0, 8)}
                {getStatusBadge(application.status)}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {profile?.full_name || 'Unknown'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(application.submitted_at || application.created_at), 'MMM d, yyyy')}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Property Information */}
          {property && (
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Home className="h-4 w-4" />
                  Property Details
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">{property.property_address}</p>
                  <p>{property.property_type} • {property.number_of_bedrooms} bed • {property.number_of_bathrooms} bath</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                  <DollarSign className="h-4 w-4" />
                  Financial Summary
                </div>
                <div className="space-y-1 text-sm">
                  <p>Avg Monthly Revenue: <span className="font-semibold">${property.average_monthly_revenue?.toLocaleString() || '0'}</span></p>
                  <p>Future Bookings: <span className="font-semibold">${property.future_bookings_revenue?.toLocaleString() || '0'}</span></p>
                  <p>Requested Advance: <span className="font-semibold text-primary">${application.requested_advance_amount?.toLocaleString() || '0'}</span></p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          {application.status === 'submitted' && (
            <div className="flex gap-2 pt-2">
              <Button onClick={handleApprove} className="flex-1">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button onClick={handleReject} variant="destructive" className="flex-1">
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Details
              </Button>
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