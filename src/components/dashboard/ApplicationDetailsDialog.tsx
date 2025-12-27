import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Calendar, DollarSign, MapPin, Home, FileText, User, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ApplicationDetailsDialogProps {
  applicationId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ApplicationDetails {
  id: string;
  status: string;
  applicant_type: string | null;
  preferred_advance_amount: number | null;
  requested_advance_amount: number | null;
  selected_bookings_revenue: number | null;
  payout_date: string | null;
  submitted_at: string | null;
  created_at: string | null;
  credit_report_authorized: boolean | null;
  verification_consent: boolean | null;
  terms_agreed: boolean | null;
  form_data: any;
}

interface PropertyDetails {
  id: string;
  property_address: string;
  property_type: string;
  number_of_bedrooms: number | null;
  number_of_bathrooms: number | null;
  square_footage: number | null;
  ownership_status: string;
  estimated_property_value: number | null;
  average_monthly_revenue: number | null;
  average_occupancy_rate: number | null;
  average_nightly_rate: number | null;
  booking_platforms: string[] | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'submitted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'under_review': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'funded': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

const formatApplicantType = (type: string | null): string => {
  if (!type) return 'Application';
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const ApplicationDetailsDialog = ({ applicationId, open, onOpenChange }: ApplicationDetailsDialogProps) => {
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<ApplicationDetails | null>(null);
  const [property, setProperty] = useState<PropertyDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!applicationId || !open) return;
      
      setLoading(true);
      try {
        // Fetch application details
        const { data: appData, error: appError } = await supabase
          .from('applications')
          .select('*')
          .eq('id', applicationId)
          .single();

        if (appError) throw appError;
        setApplication(appData);

        // Fetch property details if exists
        const { data: propData } = await supabase
          .from('properties')
          .select('*')
          .eq('application_id', applicationId)
          .maybeSingle();

        setProperty(propData);
      } catch (error) {
        console.error('Error fetching application details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [applicationId, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            Application Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : application ? (
          <div className="space-y-6">
            {/* Status and Type */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{formatApplicantType(application.applicant_type)}</span>
              </div>
              <Badge variant="outline" className={getStatusColor(application.status)}>
                {application.status.replace(/_/g, ' ')}
              </Badge>
            </div>

            <Separator />

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Financial Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Requested Amount</p>
                  <p className="text-xl font-bold">
                    ${(application.preferred_advance_amount || application.requested_advance_amount || 0).toLocaleString()}
                  </p>
                </div>
                {application.selected_bookings_revenue && application.selected_bookings_revenue > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Selected Bookings Revenue</p>
                    <p className="text-xl font-bold">
                      ${application.selected_bookings_revenue.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Timeline
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {application.submitted_at && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Submitted</p>
                    <p className="font-medium">
                      {new Date(application.submitted_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
                {application.payout_date && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Requested Payout Date</p>
                    <p className="font-medium">
                      {new Date(application.payout_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {new Date(application.created_at || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Property Details (if exists) */}
            {property && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    Property Information
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <p className="font-medium">{property.property_address}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium capitalize">{property.property_type.replace(/_/g, ' ')}</p>
                      </div>
                      {property.number_of_bedrooms && (
                        <div>
                          <p className="text-sm text-muted-foreground">Bedrooms</p>
                          <p className="font-medium">{property.number_of_bedrooms}</p>
                        </div>
                      )}
                      {property.number_of_bathrooms && (
                        <div>
                          <p className="text-sm text-muted-foreground">Bathrooms</p>
                          <p className="font-medium">{property.number_of_bathrooms}</p>
                        </div>
                      )}
                      {property.square_footage && (
                        <div>
                          <p className="text-sm text-muted-foreground">Square Feet</p>
                          <p className="font-medium">{property.square_footage.toLocaleString()}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">Ownership</p>
                        <p className="font-medium capitalize">{property.ownership_status.replace(/_/g, ' ')}</p>
                      </div>
                      {property.estimated_property_value && (
                        <div>
                          <p className="text-sm text-muted-foreground">Est. Value</p>
                          <p className="font-medium">${property.estimated_property_value.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* STR Performance */}
                {(property.average_monthly_revenue || property.average_occupancy_rate || property.average_nightly_rate) && (
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      STR Performance
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.average_monthly_revenue && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Avg. Monthly Revenue</p>
                          <p className="text-lg font-bold">${property.average_monthly_revenue.toLocaleString()}</p>
                        </div>
                      )}
                      {property.average_occupancy_rate && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                          <p className="text-lg font-bold">{property.average_occupancy_rate}%</p>
                        </div>
                      )}
                      {property.average_nightly_rate && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Avg. Nightly Rate</p>
                          <p className="text-lg font-bold">${property.average_nightly_rate.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                    {property.booking_platforms && property.booking_platforms.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-muted-foreground">Platforms:</span>
                        {property.booking_platforms.map((platform) => (
                          <Badge key={platform} variant="secondary">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Consents */}
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground">Agreements</h3>
              <div className="flex flex-wrap gap-2">
                {application.credit_report_authorized && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    Credit Report Authorized
                  </Badge>
                )}
                {application.verification_consent && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    Verification Consent
                  </Badge>
                )}
                {application.terms_agreed && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    Terms Agreed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>Application not found</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;
