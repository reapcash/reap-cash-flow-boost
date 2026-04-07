import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Home, Building2, Key, Briefcase, HardHat, Wrench, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const industryOptions = [
  {
    value: 'STR_HOST',
    label: 'STR Host',
    description: 'Short-term rental owner on Airbnb, VRBO, etc.',
    icon: Home,
  },
  {
    value: 'PROPERTY_MANAGER',
    label: 'Property Manager',
    description: 'Managing rentals or portfolios for owners.',
    icon: Building2,
  },
  {
    value: 'AGENT',
    label: 'Real Estate Agent',
    description: 'Licensed agent with pending commissions.',
    icon: Key,
  },
  {
    value: 'BROKER',
    label: 'Broker',
    description: 'Brokerage owner or managing broker.',
    icon: Briefcase,
  },
  {
    value: 'DEVELOPER',
    label: 'Developer',
    description: 'Building or renovating properties for sale.',
    icon: HardHat,
  },
  {
    value: 'CONTRACTOR',
    label: 'Contractor',
    description: 'Construction or renovation professional.',
    icon: Wrench,
  },
  {
    value: 'REAL_ESTATE_OPERATOR',
    label: 'Small Real Estate Operator',
    description: 'Full-stack operator across multiple verticals.',
    icon: User,
  },
] as const;

type IndustryValue = typeof industryOptions[number]['value'];

const Onboarding = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<IndustryValue | null>(null);
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleContinue = async () => {
    if (!selected) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ industry_type: selected })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Welcome to REAP!');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Onboarding save error:', err);
      toast.error('Failed to save selection. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--hero-bg))] to-[hsl(var(--hero-bg-end))] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            What best describes you?
          </h1>
          <p className="text-white/70 text-lg max-w-md mx-auto">
            This helps us show you the right receivables and workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {industryOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selected === option.value;

            return (
              <button
                key={option.value}
                onClick={() => setSelected(option.value)}
                className={cn(
                  'group relative flex items-start gap-4 rounded-xl p-5 text-left transition-all duration-200 border-2',
                  'bg-white/10 backdrop-blur-sm hover:bg-white/20',
                  isSelected
                    ? 'border-primary bg-white/20 ring-1 ring-primary/50'
                    : 'border-white/10 hover:border-white/30'
                )}
              >
                <div
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/10 text-white/70 group-hover:bg-white/20'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{option.label}</p>
                  <p className="text-white/60 text-xs mt-0.5 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selected || saving}
            className="px-10 h-12 text-base"
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
