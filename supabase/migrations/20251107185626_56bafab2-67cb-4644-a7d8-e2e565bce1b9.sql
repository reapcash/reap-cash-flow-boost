-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Users can create properties for own applications" ON public.properties;

-- Create a more permissive policy that allows users to create properties for their own applications
CREATE POLICY "Users can create properties for own applications"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (
  user_owns_application(auth.uid(), application_id)
);