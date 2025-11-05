import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const ApplicationReviewQueue = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Review Queue</CardTitle>
        <CardDescription>Applications awaiting review and approval</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No applications to review</p>
          <p className="text-sm">
            New applications will appear here for admin review and approval
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationReviewQueue;
