import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Plus } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';

const sourceTypesByIndustry: Record<string, string[]> = {
  STR_HOST: ['Airbnb Payout', 'VRBO Payout', 'Direct Booking'],
  PROPERTY_MANAGER: ['Management Fee', 'Owner Distribution', 'Rent Collection'],
  AGENT: ['Commission', 'Referral Fee', 'Bonus'],
  BROKER: ['Commission', 'Referral Fee', 'Bonus'],
  CONTRACTOR: ['Invoice Payment', 'Draw Payment', 'Milestone Payment'],
  DEVELOPER: ['Construction Draw', 'Equity Distribution', 'Sale Proceeds'],
  REAL_ESTATE_OPERATOR: ['Commission', 'Management Fee', 'Invoice Payment', 'Direct Booking'],
};

const receivableSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be under 200 characters'),
  amount: z.number().positive('Amount must be greater than $0').max(10_000_000, 'Amount exceeds maximum'),
  expected_payout_date: z.date({ required_error: 'Expected payout date is required' }),
  source_type: z.string().min(1, 'Source type is required'),
});

interface AddReceivableDialogProps {
  userId: string;
  industryType: string | null;
  onSuccess: () => void;
}

export default function AddReceivableDialog({ userId, industryType, onSuccess }: AddReceivableDialogProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<Date>();
  const [sourceType, setSourceType] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sourceOptions = sourceTypesByIndustry[industryType || ''] || sourceTypesByIndustry.REAL_ESTATE_OPERATOR;

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setDate(undefined);
    setSourceType('');
    setErrors({});
  };

  const handleSubmit = async () => {
    const parsed = receivableSchema.safeParse({
      title,
      amount: parseFloat(amount),
      expected_payout_date: date,
      source_type: sourceType,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach(e => {
        fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from('receivables').insert({
        user_id: userId,
        title: parsed.data.title,
        amount: parsed.data.amount,
        expected_payout_date: format(parsed.data.expected_payout_date, 'yyyy-MM-dd'),
        source_type: parsed.data.source_type,
        status: 'PENDING',
      });

      if (error) throw error;

      toast.success("Receivable added — we'll evaluate it for an advance shortly.");
      resetForm();
      setOpen(false);
      onSuccess();
    } catch (err: any) {
      console.error('Add receivable error:', err);
      toast.error('Failed to save receivable. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Receivable
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Receivable</DialogTitle>
          <DialogDescription>
            Log your upcoming income so we can evaluate it for an advance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="rec-title">Title</Label>
            <Input
              id="rec-title"
              placeholder='e.g. "March Commission — 123 Main St"'
              value={title}
              onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: '' })); }}
              maxLength={200}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="rec-amount">Amount ($)</Label>
            <Input
              id="rec-amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={e => { setAmount(e.target.value); setErrors(prev => ({ ...prev, amount: '' })); }}
            />
            {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
          </div>

          {/* Expected Payout Date */}
          <div className="space-y-1.5">
            <Label>Expected Payout Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); setErrors(prev => ({ ...prev, expected_payout_date: '' })); }}
                  disabled={(d) => d < new Date(new Date().toDateString())}
                  initialFocus
                  className={cn('p-3 pointer-events-auto')}
                />
              </PopoverContent>
            </Popover>
            {errors.expected_payout_date && <p className="text-xs text-destructive">{errors.expected_payout_date}</p>}
          </div>

          {/* Source Type */}
          <div className="space-y-1.5">
            <Label>Source Type</Label>
            <Select value={sourceType} onValueChange={(v) => { setSourceType(v); setErrors(prev => ({ ...prev, source_type: '' })); }}>
              <SelectTrigger>
                <SelectValue placeholder="Select source type" />
              </SelectTrigger>
              <SelectContent>
                {sourceOptions.map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.source_type && <p className="text-xs text-destructive">{errors.source_type}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Receivable
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
