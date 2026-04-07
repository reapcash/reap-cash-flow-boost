
-- 1. Create industry_type enum
CREATE TYPE public.industry_type AS ENUM (
  'STR_HOST', 'PROPERTY_MANAGER', 'AGENT', 'BROKER', 'DEVELOPER', 'CONTRACTOR'
);

-- 2. Add industry_type to profiles
ALTER TABLE public.profiles ADD COLUMN industry_type public.industry_type;

-- 3. Create receivable_status enum
CREATE TYPE public.receivable_status AS ENUM (
  'PENDING', 'ELIGIBLE', 'ADVANCED', 'SETTLED'
);

-- 4. Create receivables table
CREATE TABLE public.receivables (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  expected_payout_date DATE,
  source_type TEXT,
  status public.receivable_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Enable RLS on receivables
ALTER TABLE public.receivables ENABLE ROW LEVEL SECURITY;

-- 6. RLS policies for receivables
CREATE POLICY "Users can view own receivables"
  ON public.receivables FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own receivables"
  ON public.receivables FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own receivables"
  ON public.receivables FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all receivables"
  ON public.receivables FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all receivables"
  ON public.receivables FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "deny_anonymous_access_receivables"
  ON public.receivables FOR ALL
  TO anon
  USING (false);

-- 7. Create advance_request_status enum
CREATE TYPE public.advance_request_status AS ENUM (
  'REQUESTED', 'ACTIVE', 'REPAID'
);

-- 8. Add new columns to existing advances table
ALTER TABLE public.advances
  ADD COLUMN receivable_id UUID REFERENCES public.receivables(id),
  ADD COLUMN fee_amount NUMERIC,
  ADD COLUMN net_amount NUMERIC,
  ADD COLUMN advance_status public.advance_request_status DEFAULT 'REQUESTED',
  ADD COLUMN repaid_at TIMESTAMP WITH TIME ZONE;
