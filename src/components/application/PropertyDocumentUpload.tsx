import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
interface PropertyDocumentUploadProps {
  applicationId?: string;
  onUploadComplete?: () => void;
  onApplicationCreated?: (appId: string) => void;
}
const PropertyDocumentUpload = ({
  applicationId,
  onUploadComplete,
  onApplicationCreated
}: PropertyDocumentUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [hasDocument, setHasDocument] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  useEffect(() => {
    if (applicationId) {
      checkExistingDocument();
    }
  }, [applicationId]);
  const checkExistingDocument = async () => {
    if (!applicationId) return;
    try {
      const {
        data,
        error
      } = await supabase.from('documents').select('file_name').eq('application_id', applicationId).eq('document_type', 'property_documents').maybeSingle();
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
    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const {
      data,
      error
    } = await supabase.from('applications').insert({
      user_id: user.id,
      status: 'draft'
    }).select().single();
    if (error) throw error;
    return data.id;
  };
  const handleFileSelect = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = async e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file size (10MB max)
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

      // Create draft application if it doesn't exist
      if (!appId) {
        appId = await createDraftApplication();
        onApplicationCreated?.(appId);
      }

      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${appId}/property_documents_${Date.now()}.${fileExt}`;
      const {
        error: uploadError
      } = await supabase.storage.from('application-documents').upload(fileName, file);
      if (uploadError) throw uploadError;

      // Save to database
      const {
        error: dbError
      } = await supabase.from('documents').insert({
        application_id: appId,
        document_type: 'property_documents',
        file_name: file.name,
        file_path: fileName,
        file_size: file.size,
        mime_type: file.type
      });
      if (dbError) throw dbError;
      setHasDocument(true);
      setFileName(file.name);
      toast.success('Property document uploaded successfully');
      onUploadComplete?.();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };
  return <div className="border border-dashed border-border rounded-lg p-4 bg-muted/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-1">
            {isUploading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
            {!isUploading && hasDocument && <CheckCircle className="h-5 w-5 text-green-600" />}
            {!isUploading && !hasDocument && <FileText className="h-5 w-5 text-muted-foreground" />}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">Property Documents  </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Upload property deed, mortgage statement, Sublet permission, or Rent receipt                                                                                               
            </p>
            {hasDocument && fileName && <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {fileName}
              </p>}
          </div>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleFileSelect} disabled={isUploading}>
          {isUploading ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </> : <>
              <Upload className="mr-2 h-4 w-4" />
              {hasDocument ? 'Replace' : 'Upload'}
            </>}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Max file size: 10MB. Accepted formats: PDF, JPG, PNG, DOC, DOCX
      </p>
    </div>;
};
export default PropertyDocumentUpload;