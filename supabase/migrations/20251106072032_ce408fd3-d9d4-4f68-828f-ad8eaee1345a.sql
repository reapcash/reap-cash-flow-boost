-- Create advances table to track fund disbursements and repayments
CREATE TABLE public.advances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  approved_amount NUMERIC(10,2) NOT NULL,
  disbursed_amount NUMERIC(10,2),
  repayment_percentage NUMERIC(5,2) NOT NULL DEFAULT 10.00,
  total_repayment_amount NUMERIC(10,2) NOT NULL,
  amount_repaid NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('approved', 'disbursed', 'repaying', 'completed', 'defaulted')),
  approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  disbursed_at TIMESTAMP WITH TIME ZONE,
  expected_completion_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create repayment_transactions table to track individual repayments
CREATE TABLE public.repayment_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  advance_id UUID NOT NULL REFERENCES public.advances(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  source TEXT NOT NULL CHECK (source IN ('airbnb', 'manual', 'stripe')),
  booking_id UUID REFERENCES public.airbnb_bookings(id),
  stripe_payment_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('application_update', 'advance_approved', 'advance_disbursed', 'payment_received', 'payment_due', 'system')),
  read BOOLEAN NOT NULL DEFAULT FALSE,
  related_application_id UUID REFERENCES public.applications(id),
  related_advance_id UUID REFERENCES public.advances(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS on all new tables
ALTER TABLE public.advances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repayment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for advances
CREATE POLICY "Users can view own advances"
ON public.advances FOR SELECT
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create advances"
ON public.advances FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update advances"
ON public.advances FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for repayment_transactions
CREATE POLICY "Users can view own transactions"
ON public.repayment_transactions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.advances
    WHERE advances.id = repayment_transactions.advance_id
    AND (advances.user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
  )
);

CREATE POLICY "Admins can manage transactions"
ON public.repayment_transactions FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can create notifications"
ON public.notifications FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_advances_user_id ON public.advances(user_id);
CREATE INDEX idx_advances_application_id ON public.advances(application_id);
CREATE INDEX idx_advances_status ON public.advances(status);
CREATE INDEX idx_repayment_transactions_advance_id ON public.repayment_transactions(advance_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

-- Trigger for updated_at on advances
CREATE TRIGGER update_advances_updated_at
BEFORE UPDATE ON public.advances
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();