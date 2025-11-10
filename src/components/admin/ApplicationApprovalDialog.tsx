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
  const [payoutDate, setPayoutDate] = useState('');
  const [notes, setNotes] = useState('');
  const [calculation, setCalculation] = useState<any>(null);

  useEffect(() => {
    if (open && actionType === 'approve' && approvedAmount > 0 && payoutDate) {
      calculateAdvance();
    }
  }, [open, approvedAmount, payoutDate, actionType]);

  const calculateAdvance = () => {
    if (!payoutDate || approvedAmount <= 0) {
      setCalculation(null);
      return;
    }

    const today = new Date();
    const payoutDateObj = new Date(payoutDate);
    const daysUntilPayout = Math.ceil((payoutDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilPayout <= 0) {
      toast({
        title: 'Invalid Date',
        description: 'Payout date must be in the future',
        variant: 'destructive',
      });
      setCalculation(null);
      return;
    }

    // Fee formula: approvedAmount * 0.11% per day * days (same as website)
    let fee = approvedAmount * 0.0011 * daysUntilPayout;
    
    // Ensure minimum fee of $45
    fee = Math.max(fee, 45);
    
    const disbursedAmount = approvedAmount - fee;

    setCalculation({
      approvedAmount,
      fee: parseFloat(fee.toFixed(2)),
      disbursedAmount: parseFloat(disbursedAmount.toFixed(2)),
      payoutDate,
      daysUntilPayout,
    });
  };

  const handleSubmit = async () => {
    if (actionType === 'approve') {
      if (!calculation) {
        toast({
          title: 'Please Complete Form',
          description: 'Enter approved amount and payout date to calculate the advance.',
          variant: 'destructive',
        });
        return;
      }
      
      if (!payoutDate) {
        toast({
          title: 'Payout Date Required',
          description: 'Please select the expected payout date.',
          variant: 'destructive',
        });
        return;
      }
    }

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

        if (appError) {
          console.error('Application update error:', appError);
          throw new Error(`Failed to update application: ${appError.message}`);
        }

        // Create advance record with fee-based calculation
        const { data: advanceData, error: advanceError } = await supabase
          .from('advances')
          .insert({
            application_id: application.id,
            user_id: application.user_id,
            approved_amount: calculation.approvedAmount,
            disbursed_amount: calculation.disbursedAmount,
            repayment_percentage: 0, // Not used in fee model
            total_repayment_amount: calculation.approvedAmount, // They repay the full approved amount
            expected_completion_date: payoutDate,
          })
          .select()
          .single();

        if (advanceError) {
          console.error('Advance creation error:', advanceError);
          throw new Error(`Failed to create advance: ${advanceError.message}`);
        }

        // Create notification
        const { error: notifError } = await supabase.from('notifications').insert({
          user_id: application.user_id,
          title: 'Application Approved! 🎉',
          message: `Your application has been approved! You'll receive $${calculation.disbursedAmount.toLocaleString()} (${calculation.approvedAmount.toLocaleString()} minus $${calculation.fee.toLocaleString()} fee). Expected payout date: ${new Date(payoutDate).toLocaleDateString()}.`,
          type: 'advance_approved',
          related_application_id: application.id,
          related_advance_id: advanceData?.id,
        });

        if (notifError) {
          console.error('Notification error:', notifError);
          // Don't throw - notification failure shouldn't block approval
        }

        // Save admin notes if provided
        if (notes.trim()) {
          const { error: notesError } = await supabase
            .from('application_notes')
            .insert({
              application_id: application.id,
              note: notes,
              tags: ['approval'],
            });
          
          if (notesError) {
            console.error('Notes error:', notesError);
          }
        }

        toast({
          title: 'Application Approved',
          description: `Advance of $${calculation.disbursedAmount.toLocaleString()} has been created successfully.`,
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
      setNotes('');
    } catch (error: any) {
      console.error('Error processing application:', error);
      toast({
        variant: 'destructive',
        title: 'Error Processing Application',
        description: error.message || 'Failed to process application. Please try again.',
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
                  <Label htmlFor="payoutDate">Expected Payout Date</Label>
                  <Input
                    id="payoutDate"
                    type="date"
                    value={payoutDate}
                    onChange={(e) => setPayoutDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <p className="text-xs text-muted-foreground">When they'll receive their payout</p>
                </div>
              </div>

              {calculation && (
                <div className="p-4 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Calculator className="h-4 w-4" />
                    Advance Calculation
                  </div>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="p-3 bg-background rounded border">
                      <p className="text-muted-foreground mb-1">Approved Amount</p>
                      <p className="font-semibold text-lg">${calculation.approvedAmount.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-background rounded border">
                      <p className="text-muted-foreground mb-1">Fee ({calculation.daysUntilPayout} days)</p>
                      <p className="font-semibold text-lg text-amber-600">${calculation.fee.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">0.11% per day, min $45</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded border border-primary/30">
                      <p className="text-muted-foreground mb-1">Cash to User</p>
                      <p className="font-bold text-xl text-primary">${calculation.disbursedAmount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">Disbursed today</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    <p>User will repay ${calculation.approvedAmount.toLocaleString()} on {new Date(payoutDate).toLocaleDateString()}</p>
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