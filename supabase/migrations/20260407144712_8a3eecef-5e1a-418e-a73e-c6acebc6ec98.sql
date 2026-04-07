
-- Deny anonymous access to advances
CREATE POLICY "deny_anonymous_access_advances"
ON public.advances
FOR ALL
TO anon
USING (false);

-- Deny anonymous access to repayment_transactions
CREATE POLICY "deny_anonymous_access_repayment_transactions"
ON public.repayment_transactions
FOR ALL
TO anon
USING (false);
