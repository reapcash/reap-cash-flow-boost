import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const REQUIRED_DOCUMENTS = [
  {
    id: 'government_id',
    title: 'Government-issued ID',
    description: 'Driver\'s License or Passport',
    required: true,
  },
  {
    id: 'property_deed',
    title: 'Proof of Property Ownership',
    description: 'Deed or Mortgage Statement',
    required: true,
  },
  {
    id: 'booking_history',
    title: 'STR Booking History',
    description: 'Past 12 months of booking data',
    required: true,
  },
  {
    id: 'insurance_proof',
    title: 'Proof of Insurance',
    description: 'Property & Liability Insurance',
    required: true,
  },
  {
    id: 'utility_bill',
    title: 'Most Recent Utility Bill',
    description: 'For property verification',
    required: true,
  },
  {
    id: 'bank_statements',
    title: 'Bank Statements',
    description: 'Last 3 months',
    required: true,
  },
];

interface DocumentStatus {
  [key: string]: 'pending' | 'uploaded' | 'error';
}

const DocumentUploadSection = () => {
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({});

  const handleFileUpload = (documentId: string) => {
    // TODO: Implement actual file upload
    console.log('Uploading document:', documentId);
    setDocumentStatus(prev => ({
      ...prev,
      [documentId]: 'uploaded'
    }));
  };

  const getStatusIcon = (status: 'pending' | 'uploaded' | 'error' | undefined) => {
    if (status === 'uploaded') {
      return <CheckCircle className="h-5 w-5 text-primary" />;
    }
    if (status === 'error') {
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
    return <FileText className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
        <h3 className="font-semibold mb-2 text-primary">Document Upload Instructions</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Ensure all documents are clear and legible</li>
          <li>Accepted formats: PDF, JPG, PNG (max 10MB per file)</li>
          <li>All documents marked as required must be uploaded</li>
          <li>Documents will be securely encrypted and stored</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {REQUIRED_DOCUMENTS.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base flex items-center gap-2">
                    {doc.title}
                    {doc.required && (
                      <span className="text-xs text-destructive">*Required</span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {doc.description}
                  </CardDescription>
                </div>
                {getStatusIcon(documentStatus[doc.id])}
              </div>
            </CardHeader>
            <CardContent>
              {documentStatus[doc.id] === 'uploaded' ? (
                <div className="space-y-2">
                  <p className="text-sm text-primary flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Document uploaded successfully
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setDocumentStatus(prev => {
                      const newStatus = { ...prev };
                      delete newStatus[doc.id];
                      return newStatus;
                    })}
                  >
                    Replace Document
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleFileUpload(doc.id)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> You can save your application as a draft and upload documents later. 
          However, your application cannot be submitted for review until all required documents are uploaded.
        </p>
      </div>
    </div>
  );
};

export default DocumentUploadSection;
