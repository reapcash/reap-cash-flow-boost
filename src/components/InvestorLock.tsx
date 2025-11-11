import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, TrendingUp, DollarSign, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface InvestorLockProps {
  onUnlock: () => void;
}

const InvestorLock = ({ onUnlock }: InvestorLockProps) => {
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'REAP') {
      onUnlock();
    } else {
      toast({
        title: "Incorrect Password",
        description: "Please contact investor relations for access.",
        variant: "destructive"
      });
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold">Seed Investment Opportunity</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            REAP Cash
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
            The Financial Operating System for Real Estate Professionals
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Starting with STR cash advances, scaling to the full finance stack
          </p>
        </section>

        {/* Investor Access Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-12 text-center shadow-lg">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Investor Portal</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Access comprehensive seed investment materials, financial projections, and business plan
                </p>
                
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-center text-lg h-12"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full text-lg">
                    Access Investor Materials
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    Interested in learning more about investment opportunities?
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Investor Relations</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InvestorLock;
