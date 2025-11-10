import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const REQUIRED_DOCUMENTS = [
  {
    id: 'proof_of_identity',
    title: 'Proof of Identity',
    description: 'Valid government-issued ID (Driver\'s License, Passport)',
    required: true,
  },
  {
    id: 'proof_of_income',
    title: 'Proof of Future Income',
    description: 'Booking confirmations, commission agreements, or contracts',
    required: true,
  },
  {
    id: 'bank_statements',
    title: 'Bank Statements',
    description: 'Last 3 months of bank statements',
    required: true,
  },
  {
    id: 'property_documents',
    title: 'Property Documentation',
    description: 'Property deed, title, or proof of ownership',
    required: false,
  },
  {
    id: 'additional_documents',
    title: 'Additional Documents',
    description: 'Any additional supporting documents',
    required: false,
  },
];

interface DocumentStatus {
  [key: string]: 'pending' | 'uploading' | 'uploaded' | 'error';
}

interface DocumentUploadSectionProps {
  applicationId: string | null;
  onUploadComplete?: () => void;
  onApplicationCreated?: (appId: string) => void;
  applicantType?: string;
}

const DocumentUploadSection = ({ applicationId, onUploadComplete, onApplicationCreated, applicantType }: DocumentUploadSectionProps) => {
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});
  const [localApplicationId, setLocalApplicationId] = useState<string | null>(applicationId);
  const { user } = useAuth();
  const { toast } = useToast();

  // Sync localApplicationId with applicationId prop
  useEffect(() => {
    if (applicationId) {
      setLocalApplicationId(applicationId);
    }
  }, [applicationId]);

  const createDraftApplication = async () => {
    if (!user || !applicantType) return null;

    try {
      console.log('📄 Creating DRAFT application for document storage ONLY');
      console.log('⚠️  Status: "draft" - NOT submitted');
      
      const { data: newApp, error } = await supabase
        .from('applications')
        .insert([{
          user_id: user.id,
          applicant_type: applicantType,
          status: 'draft',
          preferred_advance_amount: 0,
          credit_report_authorized: false,
          verification_consent: false,
          terms_agreed: false,
          form_data: { draftName: 'Untitled Draft' },
        }])
        .select()
        .single();

      if (error) throw error;
      
      setLocalApplicationId(newApp.id);
      onApplicationCreated?.(newApp.id);
      
      console.log('✓ Draft created for document storage - ID:', newApp.id);
      toast({
        title: 'Draft Created',
        description: 'A draft application has been created to store your documents',
      });
      
      return newApp.id;
    } catch (error: any) {
      console.error('Error creating draft:', error);
      toast({
        title: 'Error',
        description: 'Failed to create draft application',
        variant: 'destructive',
      });
      return null;
    }
  };

  const handleFileUpload = async (documentId: string, file: File) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to upload documents',
        variant: 'destructive',
      });
      return;
    }

    let appId = localApplicationId || applicationId;
    
    // Auto-create DRAFT if no application exists (NEVER submits application)
    if (!appId) {
      console.log('📤 Document upload triggered - creating draft for storage');
      console.log('⚠️  This will NOT submit the application');
      appId = await createDraftApplication();
      if (!appId) return;
    }

    console.log('📤 Uploading document:', documentId, '- This does NOT trigger submission');
    setDocumentStatus(prev => ({ ...prev, [documentId]: 'uploading' }));

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${appId}/${documentId}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error(uploadError.message);
      }

      // Store document metadata in documents table
      const { error: dbError } = await supabase
        .from('documents')
        .insert([{
          application_id: appId,
          document_type: documentId as any,
          file_path: fileName,
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
        }]);

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw new Error(dbError.message);
      }

      setDocumentStatus(prev => ({ ...prev, [documentId]: 'uploaded' }));
      setUploadedFiles(prev => ({ ...prev, [documentId]: fileName }));

      console.log('✓ Document uploaded successfully - application remains in current status');
      toast({
        title: 'Success',
        description: 'Document uploaded successfully',
      });

      // CRITICAL: This callback does NOT trigger submission
      // It only notifies the parent component that upload is complete
      onUploadComplete?.();
    } catch (error: any) {
      console.error('Upload error:', error);
      setDocumentStatus(prev => ({ ...prev, [documentId]: 'error' }));
      toast({
        title: 'Upload Failed',
        description: error.message || 'An error occurred while uploading the document. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleFileSelect = (documentId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: 'Maximum file size is 10MB',
            variant: 'destructive',
          });
          return;
        }
        handleFileUpload(documentId, file);
      }
    };
    input.click();
  };

  const getStatusIcon = (status: 'pending' | 'uploading' | 'uploaded' | 'error' | undefined) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      case 'uploaded':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
        <p className="text-sm text-muted-foreground">
          Please upload the following documents to complete your application. All required documents must be submitted before final submission.
        </p>
      </div>

      <div className="grid gap-4">
        {REQUIRED_DOCUMENTS.map((doc) => (
          <Card key={doc.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getStatusIcon(documentStatus[doc.id])}
                  <div>
                    <CardTitle className="text-base">
                      {doc.title}
                      {doc.required && <span className="text-destructive ml-1">*</span>}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {doc.description}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {documentStatus[doc.id] === 'uploaded' ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 dark:text-green-400">
                    Document uploaded successfully
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileSelect(doc.id)}
                  >
                    Replace Document
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleFileSelect(doc.id)}
                  disabled={documentStatus[doc.id] === 'uploading'}
                >
                  {documentStatus[doc.id] === 'uploading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-start gap-2 p-4 bg-muted rounded-lg">
        <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-1">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>You can upload documents at any time during the application process</li>
            <li>All required documents must be submitted before final submission</li>
            <li>Accepted formats: PDF, JPG, PNG, DOC, DOCX</li>
            <li>Maximum file size: 10MB per document</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadSection;
