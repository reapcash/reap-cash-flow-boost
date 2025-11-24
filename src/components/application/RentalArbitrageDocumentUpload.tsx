import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RentalArbitrageDocumentUploadProps {
  applicationId?: string;
  documentType: 'sublet_permission' | 'rent_payment_proof';
  onUploadComplete?: () => void;
  onApplicationCreated?: (appId: string) => void;
}

const RentalArbitrageDocumentUpload = ({ 
  applicationId,
  documentType,
  onUploadComplete,
  onApplicationCreated 
}: RentalArbitrageDocumentUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [hasDocument, setHasDocument] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const documentConfig = {
    sublet_permission: {
      title: 'Sublet Permission',
      description: 'Upload written permission from landlord to sublet the property',
    },
    rent_payment_proof: {
      title: 'Proof of Rent Payments',
      description: 'Upload bank statements or receipts showing rent payment history',
    },
  };

  useEffect(() => {
    if (applicationId) {
      checkExistingDocument();
    }
  }, [applicationId]);

  const checkExistingDocument = async () => {
    if (!applicationId) return;

    try {
      const { data, error } = await supabase
        .from('documents')
        .select('file_name')
        .eq('application_id', applicationId)
        .eq('document_type', 'additional_documents')
        .ilike('file_name', `%${documentType}%`)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setHasDocument(true);
        setFileName(data.file_name);
      }
    } catch (error) {
      console.error('Error checking document:', error);
    }
  };

  const createDraftApplication = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('applications')
      .insert({
        user_id: user.id,
        status: 'draft',
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  };

  const handleFileSelect = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      await handleFileUpload(file);
    };

    input.click();
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);

    try {
      let appId = applicationId;

      if (!appId) {
        appId = await createDraftApplication();
        onApplicationCreated?.(appId);
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${appId}/${documentType}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          application_id: appId,
          document_type: 'additional_documents',
          file_name: `${documentType}_${file.name}`,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
        });

      if (dbError) throw dbError;

      setHasDocument(true);
      setFileName(file.name);
      toast.success('Document uploaded successfully');
      onUploadComplete?.();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  const config = documentConfig[documentType];

  return (
    <div className="border border-dashed border-border rounded-lg p-4 bg-muted/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-1">
            {isUploading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
            {!isUploading && hasDocument && <CheckCircle className="h-5 w-5 text-green-600" />}
            {!isUploading && !hasDocument && <FileText className="h-5 w-5 text-muted-foreground" />}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">{config.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">
              {config.description}
            </p>
            {hasDocument && fileName && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {fileName}
              </p>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleFileSelect}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {hasDocument ? 'Replace' : 'Upload'}
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Max file size: 10MB. Accepted formats: PDF, JPG, PNG, DOC, DOCX
      </p>
    </div>
  );
};

export default RentalArbitrageDocumentUpload;
