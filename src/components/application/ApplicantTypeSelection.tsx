import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Home, Briefcase, Hammer, TrendingUp, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type ApplicantType = 'str_host' | 'real_estate_agent' | 'property_manager' | 'contractor' | 'broker' | 'developer';

interface ApplicantTypeOption {
  type: ApplicantType;
  icon: React.ElementType;
  title: string;
  description: string;
  requirements: string[];
}

const applicantTypes: ApplicantTypeOption[] = [
  {
    type: 'str_host',
    icon: Home,
    title: 'STR Host',
    description: 'Airbnb or short-term rental property owner',
    requirements: ['Verified future bookings', 'Property ownership proof', 'Platform connection']
  },
  {
    type: 'real_estate_agent',
    icon: Briefcase,
    title: 'Real Estate Agent',
    description: 'Licensed agent with pending commissions',
    requirements: ['Active real estate license', 'Deals in escrow', 'Brokerage verification']
  },
  {
    type: 'property_manager',
    icon: Building2,
    title: 'Property Manager',
    description: 'Professional managing rental properties',
    requirements: ['Management agreements', 'Properties under management', 'Fee structure']
  },
  {
    type: 'contractor',
    icon: Hammer,
    title: 'Contractor',
    description: 'Construction or service contractor',
    requirements: ['Active contracts', 'Pending invoices', 'Business license']
  },
  {
    type: 'broker',
    icon: Users,
    title: 'Broker',
    description: 'Real estate brokerage owner/operator',
    requirements: ['Broker license', 'Active brokerage', 'Team commission pipeline']
  },
  {
    type: 'developer',
    icon: TrendingUp,
    title: 'Developer',
    description: 'Real estate development professional',
    requirements: ['Active projects', 'Pre-sale contracts', 'Development timeline']
  }
];

interface ApplicantTypeSelectionProps {
  onSelect: (type: ApplicantType) => void;
}

const ApplicantTypeSelection = ({ onSelect }: ApplicantTypeSelectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Select Your Application Type</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the option that best describes your business to ensure we collect the right information for your cash advance application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicantTypes.map((option) => {
            const Icon = option.icon;
            return (
              <Card 
                key={option.type}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg hover:scale-105 hover:border-primary",
                  "group"
                )}
                onClick={() => onSelect(option.type)}
              >
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">{option.title}</CardTitle>
                  <CardDescription className="text-center">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">You'll need:</p>
                    <ul className="text-sm space-y-1">
                      {option.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApplicantTypeSelection;
