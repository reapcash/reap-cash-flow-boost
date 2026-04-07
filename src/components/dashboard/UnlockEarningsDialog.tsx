import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Unlock, AlertCircle, CheckCircle2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Receivable {
  id: string;
  title: string;
  amount: number;
  expected_payout_date: string | null;
  status: string;
  source_type: string | null;
}

interface UnlockEarningsDialogProps {
  userId: string;
  eligibleReceivables: Receivable[];
  onSuccess: () => void;
  onAddReceivable?: () => void;
  trigger?: React.ReactNode;
}

const ADVANCE_PERCENT = 0.8;
const FEE_PERCENT = 0.03;

const UnlockEarningsDialog = ({
  userId,
  eligibleReceivables,
  onSuccess,
  onAddReceivable,
  trigger,
}: UnlockEarningsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selected = eligibleReceivables.find((r) => r.id === selectedId);
  const receivableAmount = selected ? parseFloat(String(selected.amount)) : 0;
  const advanceAmount = receivableAmount * ADVANCE_PERCENT;
  const feeAmount = receivableAmount * FEE_PERCENT;
  const youReceive = advanceAmount - feeAmount;

  const handleConfirm = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      // Create an application first (required FK)
      const { data: app, error: appErr } = await supabase
        .from('applications')
        .insert({
          user_id: userId,
          status: 'approved',
          submitted_at: new Date().toISOString(),
          reviewed_at: new Date().toISOString(),
          preferred_advance_amount: advanceAmount,
        })
        .select('id')
        .single();

      if (appErr) throw appErr;

      // Create the advance record
      const { error: advErr } = await supabase.from('advances').insert({
        user_id: userId,
        application_id: app.id,
        receivable_id: selected.id,
        approved_amount: advanceAmount,
        fee_amount: feeAmount,
        net_amount: youReceive,
        disbursed_amount: youReceive,
        disbursed_at: new Date().toISOString(),
        total_repayment_amount: advanceAmount,
        advance_status: 'ACTIVE',
        status: 'active',
        repayment_percentage: 10,
        expected_completion_date: selected.expected_payout_date,
      });

      if (advErr) throw advErr;

      // Update receivable status to ADVANCED
      const { error: recErr } = await supabase
        .from('receivables')
        .update({ status: 'ADVANCED' })
        .eq('id', selected.id);

      if (recErr) throw recErr;

      toast({
        title: 'Earnings unlocked!',
        description: `$${youReceive.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} is on its way to you.`,
      });

      setOpen(false);
      setSelectedId(null);
      onSuccess();
    } catch (err: any) {
      console.error('Unlock error:', err);
      toast({
        title: 'Something went wrong',
        description: err.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const hasEligible = eligibleReceivables.length > 0;

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSelectedId(null); }}>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button size="sm" onClick={() => setOpen(true)}>
          <Unlock className="mr-1.5 h-4 w-4" />
          Unlock Earnings
        </Button>
      )}

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unlock Your Earnings</DialogTitle>
          <DialogDescription>
            {hasEligible
              ? 'Select an eligible receivable to advance against.'
              : 'You need an eligible receivable first.'}
          </DialogDescription>
        </DialogHeader>

        {!hasEligible ? (
          <div className="py-6 text-center space-y-3">
            <AlertCircle className="h-10 w-10 text-muted-foreground/40 mx-auto" />
            <p className="text-sm text-muted-foreground">
              Add a receivable first to unlock your earnings.
            </p>
            {onAddReceivable && (
              <Button variant="outline" size="sm" onClick={() => { setOpen(false); onAddReceivable(); }}>
                <Plus className="mr-1.5 h-4 w-4" />
                Add Receivable
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Receivable list */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {eligibleReceivables.map((rec) => (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => setSelectedId(rec.id)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border transition-all',
                    selectedId === rec.id
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border hover:border-primary/40 hover:bg-muted/30'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{rec.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {rec.expected_payout_date
                          ? new Date(rec.expected_payout_date).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                            })
                          : 'No date set'}
                        {rec.source_type && ` · ${rec.source_type}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <p className="font-semibold text-sm">
                        ${parseFloat(String(rec.amount)).toLocaleString()}
                      </p>
                      {selectedId === rec.id && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Fee breakdown */}
            {selected && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Advance Breakdown
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Receivable amount</span>
                  <span className="font-medium">${receivableAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Advance amount (80%)</span>
                  <span className="font-medium">${advanceAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">REAP fee (3%)</span>
                  <span className="font-medium text-amber-600">−${feeAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-sm">
                  <span className="font-semibold">You receive</span>
                  <span className="font-bold text-primary">${youReceive.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {hasEligible && (
          <DialogFooter>
            <Button
              onClick={handleConfirm}
              disabled={!selected || submitting}
              className="w-full"
            >
              {submitting ? 'Processing…' : 'Unlock My Earnings'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UnlockEarningsDialog;
