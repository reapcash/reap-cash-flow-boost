-- Add explicit policies to deny anonymous access to sensitive tables
-- This provides defense-in-depth security alongside existing authenticated policies

-- Deny anonymous access to profiles table
CREATE POLICY "deny_anonymous_access_profiles"
ON public.profiles
FOR ALL
TO anon
USING (false);

-- Deny anonymous access to properties table  
CREATE POLICY "deny_anonymous_access_properties"
ON public.properties
FOR ALL
TO anon
USING (false);

-- Deny anonymous access to audit_log table
CREATE POLICY "deny_anonymous_access_audit_log"
ON public.audit_log
FOR ALL
TO anon
USING (false);

-- Deny anonymous access to applications table
CREATE POLICY "deny_anonymous_access_applications"
ON public.applications
FOR ALL
TO anon
USING (false);

-- Deny anonymous access to airbnb_connections table
CREATE POLICY "deny_anonymous_access_airbnb_connections"
ON public.airbnb_connections
FOR ALL
TO anon
USING (false);

-- Deny anonymous access to airbnb_bookings table
CREATE POLICY "deny_anonymous_access_airbnb_bookings"
ON public.airbnb_bookings
FOR ALL
TO anon
USING (false);