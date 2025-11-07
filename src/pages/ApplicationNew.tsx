import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import ApplicationForm from '@/components/application/ApplicationForm';
import ApplicantTypeSelection, { ApplicantType } from '@/components/application/ApplicantTypeSelection';
import { supabase } from '@/integrations/supabase/client';

const ApplicationNew = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get('draft');
  const [applicantType, setApplicantType] = useState<ApplicantType | null>(null);
  const [loadingDraft, setLoadingDraft] = useState(!!draftId);

  // Load draft application type if draftId is present
  useEffect(() => {
    const loadDraftType = async () => {
      if (!draftId || !user) {
        setLoadingDraft(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('applications')
          .select('applicant_type')
          .eq('id', draftId)
          .eq('user_id', user.id)
          .eq('status', 'draft')
          .maybeSingle();

        if (error) throw error;
        
        if (data && data.applicant_type) {
          setApplicantType(data.applicant_type as ApplicantType);
        }
      } catch (error) {
        console.error('Error loading draft type:', error);
      } finally {
        setLoadingDraft(false);
      }
    };

    if (user) {
      loadDraftType();
    }
  }, [draftId, user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading || loadingDraft) {
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
