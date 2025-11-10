import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Calendar, ChevronDown, ChevronUp, Eye, FileText, DollarSign, CheckCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import AdminUserNotesSection from './AdminUserNotesSection';

interface UserReviewCardProps {
  user: any;
  applications?: any[];
  advances?: any[];
}

const UserReviewCard = ({ user, applications = [], advances = [] }: UserReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalRequested = applications.reduce((sum, app) => sum + (app.requested_advance_amount || 0), 0);
  const totalFunded = advances.reduce((sum, adv) => sum + (adv.disbursed_amount || 0), 0);
  const submittedApps = applications.filter(app => app.status === 'submitted' || app.status === 'under_review').length;

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-lg">{user.full_name || 'Unknown User'}</CardTitle>
              <Badge variant="outline" className="font-normal">
                User ID: {user.id.slice(0, 8)}
              </Badge>
            </div>
            <CardDescription className="space-y-1">
              <div className="flex items-center gap-4 flex-wrap text-sm">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {user.email || 'N/A'}
                </span>
                {user.phone_number && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {user.phone_number}
                  </span>
                )}
              </div>
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Total Applications</p>
              <p className="text-xl font-bold text-primary">{applications.length}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="shrink-0"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <Calendar className="h-3 w-3" />
          Joined: {format(new Date(user.created_at), 'MMM d, yyyy')}
        </div>
      </CardHeader>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* User Statistics */}
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Requested</p>
                <p className="text-2xl font-bold text-primary">${totalRequested.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Funded</p>
                <p className="text-2xl font-bold text-green-600">${totalFunded.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Applications</p>
                <p className="text-2xl font-bold text-yellow-600">{submittedApps}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-medium">
                <User className="h-4 w-4" />
                User Information
              </div>
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg text-sm">
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Full Name:</span> {user.full_name || 'Not provided'}</p>
                  <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {user.phone_number || 'Not provided'}</p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">User ID:</span> {user.id}</p>
                  <p><span className="text-muted-foreground">Created:</span> {format(new Date(user.created_at), 'MMM d, yyyy h:mm a')}</p>
                  <p><span className="text-muted-foreground">Updated:</span> {format(new Date(user.updated_at), 'MMM d, yyyy h:mm a')}</p>
                </div>
              </div>
            </div>

            {/* Applications Summary */}
            {applications.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-medium">
                  <FileText className="h-4 w-4" />
                  Applications Summary
                </div>
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-background rounded border">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Application #{app.id.slice(0, 8)}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant={
                            app.status === 'approved' ? 'default' :
                            app.status === 'submitted' ? 'secondary' :
                            app.status === 'rejected' ? 'destructive' : 'outline'
                          }>
                            {app.status}
                          </Badge>
                          <span>{format(new Date(app.created_at), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">${app.requested_advance_amount?.toLocaleString() || '0'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advances Summary */}
            {advances.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-medium">
                  <DollarSign className="h-4 w-4" />
                  Advances Summary
                </div>
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  {advances.map((adv) => (
                    <div key={adv.id} className="flex items-center justify-between p-3 bg-background rounded border">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Advance #{adv.id.slice(0, 8)}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant={adv.status === 'repaid' ? 'default' : 'secondary'}>
                            {adv.status}
                          </Badge>
                          <span>{format(new Date(adv.created_at), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">${adv.disbursed_amount?.toLocaleString() || '0'}</p>
                        <p className="text-xs text-muted-foreground">Repaid: ${adv.amount_repaid?.toLocaleString() || '0'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Admin Notes Section */}
            <AdminUserNotesSection userId={user.id} />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default UserReviewCard;