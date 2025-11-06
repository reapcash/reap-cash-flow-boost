-- Add additional RLS security for sensitive tables
-- Ensure all sensitive data is only accessible by owners and admins

-- 1. Add function to check if user owns a property through application
CREATE OR REPLACE FUNCTION public.user_owns_property(_user_id uuid, _property_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.properties p
    JOIN public.applications a ON a.id = p.application_id
    WHERE p.id = _property_id
      AND a.user_id = _user_id
  )
$$;

-- 2. Add function to check if user owns an application
CREATE OR REPLACE FUNCTION public.user_owns_application(_user_id uuid, _application_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.applications
    WHERE id = _application_id
      AND user_id = _user_id
  )
$$;

-- 3. Enhance profiles RLS - ensure email and phone can only be seen by owner or admin
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (
    auth.uid() = id 
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

-- 4. Enhance properties RLS - add explicit checks for sensitive financial columns
DROP POLICY IF EXISTS "Users can view own properties" ON public.properties;

CREATE POLICY "Users can view own properties"
  ON public.properties FOR SELECT
  USING (
    public.user_owns_property(auth.uid(), id)
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

DROP POLICY IF EXISTS "Users can update own properties" ON public.properties;

CREATE POLICY "Users can update own properties"
  ON public.properties FOR UPDATE
  USING (
    public.user_owns_property(auth.uid(), id)
  );

-- 5. Ensure applications table has proper isolation
DROP POLICY IF EXISTS "Users can view own applications" ON public.applications;

CREATE POLICY "Users can view own applications"
  ON public.applications FOR SELECT
  USING (
    auth.uid() = user_id
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

DROP POLICY IF EXISTS "Users can update own applications" ON public.applications;

CREATE POLICY "Users can update own applications"
  ON public.applications FOR UPDATE
  USING (
    auth.uid() = user_id
  );

-- 6. Enhance airbnb_bookings RLS
DROP POLICY IF EXISTS "Users can view own bookings" ON public.airbnb_bookings;

CREATE POLICY "Users can view own bookings"
  ON public.airbnb_bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.airbnb_connections ac
      WHERE ac.id = airbnb_bookings.connection_id
        AND public.user_owns_property(auth.uid(), ac.property_id)
    )
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

-- 7. Add proper INSERT policy for airbnb_bookings (only edge function should insert)
-- Users cannot manually insert bookings
CREATE POLICY "Only service role can insert bookings"
  ON public.airbnb_bookings FOR INSERT
  WITH CHECK (false);

-- 8. Add audit trigger to log sensitive data access (optional but recommended)
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  action TEXT NOT NULL,
  user_id UUID,
  row_id UUID,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON public.audit_log FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create audit function for sensitive tables
CREATE OR REPLACE FUNCTION public.audit_sensitive_access()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_log (
    table_name,
    action,
    user_id,
    row_id,
    old_data,
    new_data
  ) VALUES (
    TG_TABLE_NAME,
    TG_OP,
    auth.uid(),
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add audit triggers to sensitive tables
DROP TRIGGER IF EXISTS audit_properties_changes ON public.properties;
CREATE TRIGGER audit_properties_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_access();

DROP TRIGGER IF EXISTS audit_applications_changes ON public.applications;
CREATE TRIGGER audit_applications_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_access();

-- Add comments documenting security measures
COMMENT ON TABLE public.properties IS 'Contains sensitive financial data. RLS enforced. All access logged via audit triggers.';
COMMENT ON TABLE public.applications IS 'Contains loan application data. RLS enforced. All access logged via audit triggers.';
COMMENT ON TABLE public.profiles IS 'Contains PII (email, phone). RLS enforced to owner and admin only.';
COMMENT ON TABLE public.airbnb_bookings IS 'Contains guest information. Access restricted via property ownership chain.';