import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Calculator } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ApplicationApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: any;
  property: any;
  actionType: 'approve' | 'reject';
  onSuccess: () => void;
}

const ApplicationApprovalDialog = ({
  open,
  onOpenChange,
  application,
  property,
  actionType,
  onSuccess,
}: ApplicationApprovalDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [approvedAmount, setApprovedAmount] = useState(application?.requested_advance_amount || 0);
  const [repaymentPercentage, setRepaymentPercentage] = useState(10);
  const [notes, setNotes] = useState('');
  const [calculation, setCalculation] = useState<any>(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    if (open && actionType === 'approve') {
      calculateRepayment();
    }
  }, [open, approvedAmount, repaymentPercentage, actionType]);

  const calculateRepayment = async () => {
    if (!property?.average_monthly_revenue || approvedAmount <= 0) return;

    setCalculating(true);
    try {
      const { data, error } = await supabase.functions.invoke('calculate-repayment', {
        body: {
          approvedAmount,
          repaymentPercentage,
          estimatedMonthlyRevenue: property.average_monthly_revenue,
        },
      });

      if (error) throw error;
      setCalculation(data);
    } catch (error) {
      console.error('Error calculating repayment:', error);
    } finally {
      setCalculating(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (actionType === 'approve') {
        // Update application status
        const { error: appError } = await supabase
          .from('applications')
          .update({
            status: 'approved',
            reviewed_at: new Date().toISOString(),
          })
          .eq('id', application.id);

        if (appError) throw appError;

        // Create advance record
        const { error: advanceError } = await supabase
          .from('advances')
          .insert({
            application_id: application.id,
            user_id: application.user_id,
            approved_amount: approvedAmount,
            repayment_percentage: repaymentPercentage,
            total_repayment_amount: calculation.totalRepaymentAmount,
            expected_completion_date: new Date(
              Date.now() + calculation.estimatedCompletionMonths * 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
          });

        if (advanceError) throw advanceError;

        // Create notification
        await supabase.from('notifications').insert({
          user_id: application.user_id,
          title: 'Application Approved! 🎉',
          message: `Your application has been approved for $${approvedAmount.toLocaleString()}. Funds will be disbursed shortly.`,
          type: 'advance_approved',
          related_application_id: application.id,
        });

        toast({
          title: 'Application Approved',
          description: `Advance of $${approvedAmount.toLocaleString()} has been approved.`,
        });
      } else {
        // Reject application
        const { error: appError } = await supabase
          .from('applications')
          .update({
            status: 'rejected',
            reviewed_at: new Date().toISOString(),
          })
          .eq('id', application.id);

        if (appError) throw appError;

        // Create notification
        await supabase.from('notifications').insert({
          user_id: application.user_id,
          title: 'Application Update',
          message: notes || 'Your application has been reviewed. Please contact support for more information.',
          type: 'application_update',
          related_application_id: application.id,
        });

        toast({
          title: 'Application Rejected',
          description: 'The applicant has been notified.',
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error processing application:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to process application. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {actionType === 'approve' ? 'Approve Application' : 'Reject Application'}
          </DialogTitle>
          <DialogDescription>
            Application #{application?.id.slice(0, 8)} - {property?.property_address}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {actionType === 'approve' ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="approvedAmount">Approved Amount ($)</Label>
                  <Input
                    id="approvedAmount"
                    type="number"
                    value={approvedAmount}
                    onChange={(e) => setApprovedAmount(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                  />
                  <p className="text-xs text-muted-foreground">
                    Requested: ${application?.requested_advance_amount?.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repaymentPercentage">Repayment Percentage (%)</Label>
                  <Input
                    id="repaymentPercentage"
                    type="number"
                    value={repaymentPercentage}
                    onChange={(e) => setRepaymentPercentage(parseFloat(e.target.value) || 0)}
                    min="0"
                    max="100"
                    step="0.5"
                  />
                  <p className="text-xs text-muted-foreground">% of monthly revenue</p>
                </div>
              </div>

              {calculating && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}

              {calculation && !calculating && (
                <div className="p-4 bg-primary/5 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Calculator className="h-4 w-4" />
                    Repayment Calculation
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Repayment</p>
                      <p className="font-semibold text-lg">${calculation.totalRepaymentAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Payment</p>
                      <p className="font-semibold text-lg">${calculation.monthlyRepaymentAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Completion</p>
                      <p className="font-semibold">{calculation.estimatedCompletionMonths} months</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Revenue</p>
                      <p className="font-semibold">${calculation.estimatedMonthlyRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any internal notes about this approval..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="rejectNotes">Rejection Reason (Optional)</Label>
              <Textarea
                id="rejectNotes"
                placeholder="Provide a reason for rejection that will be sent to the applicant..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || (actionType === 'approve' && !calculation)}
            variant={actionType === 'reject' ? 'destructive' : 'default'}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {actionType === 'approve' ? 'Approve & Create Advance' : 'Reject Application'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationApprovalDialog;