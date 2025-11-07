import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import ApplicationForm from '@/components/application/ApplicationForm';
import ApplicantTypeSelection, { ApplicantType } from '@/components/application/ApplicantTypeSelection';

const ApplicationNew = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [applicantType, setApplicantType] = useState<ApplicantType | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  // Show applicant type selection if not yet selected
  if (!applicantType) {
    return <ApplicantTypeSelection onSelect={setApplicantType} />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => setApplicantType(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Application Type
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ApplicationForm applicantType={applicantType} />
      </main>
    </div>
  );
};

export default ApplicationNew;
