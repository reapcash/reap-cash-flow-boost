import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle2, Calendar, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AirbnbSetupGuide() {
  return (
    <Card className="p-6 bg-primary/5 border-primary/20">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">How to Connect Your Airbnb Calendar</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Follow these steps to automatically import your bookings and streamline your advance application
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Log into Airbnb</h4>
                <p className="text-sm text-muted-foreground">
                  Go to{' '}
                  <a 
                    href="https://www.airbnb.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    airbnb.com
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {' '}and sign in to your host account
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Navigate to Calendar</h4>
                <p className="text-sm text-muted-foreground">
                  Click on <Badge variant="secondary" className="font-mono">Calendar</Badge> in the main menu, then select your property
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Find Availability Settings</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Click on <Badge variant="secondary">Availability settings</Badge> (gear icon in the top right)
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Export Calendar</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Scroll down to "Sync calendars" section and click{' '}
                  <Badge variant="secondary">Export calendar</Badge>
                </p>
                <Alert className="mt-2">
                  <Copy className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    <strong>Important:</strong> Copy the full iCal link (starts with "https://www.airbnb.com/calendar/ical/...")
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                5
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Paste Link Below</h4>
                <p className="text-sm text-muted-foreground">
                  Return here and paste the iCal URL when adding your Airbnb connection
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-background rounded-lg border">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">What happens after connecting?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your future bookings will be automatically imported</li>
                  <li>• You can select which bookings to get an advance on</li>
                  <li>• Revenue calculations are done automatically</li>
                  <li>• Sync manually anytime to update your booking data</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://www.airbnb.com/hosting/calendar', '_blank')}
              className="w-full sm:w-auto"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Airbnb Calendar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}