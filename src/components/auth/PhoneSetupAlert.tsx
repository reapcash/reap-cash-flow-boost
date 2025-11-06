import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PhoneSetupAlert() {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex flex-col gap-2">
        <p className="font-medium">Phone Authentication Not Configured</p>
        <p className="text-sm">
          SMS verification requires Twilio configuration. Phone codes won't be sent until you set this up in your backend dashboard.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-fit mt-2"
          onClick={() => window.open('https://docs.lovable.dev/features/authentication#phone-authentication', '_blank')}
        >
          View Setup Guide
        </Button>
      </AlertDescription>
    </Alert>
  );
}