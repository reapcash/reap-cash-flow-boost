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
            <span className="text-primary font-semibold">Series A Investment Opportunity</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Building the Future of Real Estate Finance
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12">
            We unlock your earned income so you can scale your operations.
          </p>
        </section>

        {/* What We Do - Customer Facing */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Empowering Real Estate Professionals</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card p-8 rounded-xl border hover-scale text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Fast Capital Access</h3>
                  <p className="text-muted-foreground">
                    Get the funding you need in 48 hours, not weeks. No lengthy applications or credit checks.
                  </p>
                </div>
                
                <div className="bg-card p-8 rounded-xl border hover-scale text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Built for STR Owners</h3>
                  <p className="text-muted-foreground">
                    Designed specifically for short-term rental properties with integrated booking data.
                  </p>
                </div>
                
                <div className="bg-card p-8 rounded-xl border hover-scale text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Grow Your Portfolio</h3>
                  <p className="text-muted-foreground">
                    Scale your real estate business with flexible financing that grows with you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investor Access Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-12 text-center">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Investor Portal</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Access our full investment deck, financial projections, and detailed business plan
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
                    Access Investor Deck
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
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

        {/* Customer CTA */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Grow Your Real Estate Business?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of property owners who have unlocked their growth potential with REAP
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link to="/application/new">Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/10" asChild>
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InvestorLock;
