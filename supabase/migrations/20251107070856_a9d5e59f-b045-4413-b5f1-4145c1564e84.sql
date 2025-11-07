-- Add applicant_type to applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS applicant_type TEXT;

-- Add form_data to store applicant-specific information
ALTER TABLE applications ADD COLUMN IF NOT EXISTS form_data JSONB;

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'application-documents',
  'application-documents',
  false,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for application-documents bucket
-- Users can upload documents for their own applications
CREATE POLICY "Users can upload documents for own applications"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'application-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can view their own documents
CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'application-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own documents
CREATE POLICY "Users can update own documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'application-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own documents
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'application-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Admins can view all documents
CREATE POLICY "Admins can view all application documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'application-documents' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Admins can manage all documents
CREATE POLICY "Admins can manage all application documents"
ON storage.objects FOR ALL
USING (
  bucket_id = 'application-documents' 
  AND has_role(auth.uid(), 'admin'::app_role)
);