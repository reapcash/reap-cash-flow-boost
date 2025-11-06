-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit a contact message (authenticated or anonymous)
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- Policy: Users can view their own messages if authenticated
CREATE POLICY "Users can view own messages"
ON public.contact_messages
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Admins can view all messages
CREATE POLICY "Admins can view all messages"
ON public.contact_messages
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Admins can update all messages (for status and notes)
CREATE POLICY "Admins can update all messages"
ON public.contact_messages
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add audit trigger for sensitive access
CREATE TRIGGER audit_contact_messages
AFTER INSERT OR UPDATE OR DELETE ON public.contact_messages
FOR EACH ROW
EXECUTE FUNCTION public.audit_sensitive_access();

-- Add comment
COMMENT ON TABLE public.contact_messages IS 'Stores contact form submissions with RLS policies and audit logging';