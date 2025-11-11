-- Create secured function to submit an application only on explicit user action
CREATE OR REPLACE FUNCTION public.submit_application(app_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update only applications owned by the user, currently in draft, with required consents
  UPDATE public.applications
  SET status = 'submitted',
      submitted_at = now(),
      updated_at = now()
  WHERE id = app_id
    AND user_id = auth.uid()
    AND status = 'draft'
    AND coalesce(credit_report_authorized, false) = true
    AND coalesce(verification_consent, false) = true
    AND coalesce(terms_agreed, false) = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application cannot be submitted. Ensure it belongs to you, is in draft, and all consents are checked.';
  END IF;

  RETURN true;
END;
$$;

-- Strengthen RLS: prevent users from setting status to submitted via direct UPDATE
DROP POLICY IF EXISTS "Users can update own applications" ON public.applications;
CREATE POLICY "Users can update own applications"
ON public.applications
FOR UPDATE
USING (auth.uid() = user_id AND status <> 'submitted')
WITH CHECK (auth.uid() = user_id AND status <> 'submitted');
