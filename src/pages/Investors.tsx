import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InvestorLock from '@/components/InvestorLock';
import { TrendingUp, DollarSign, Building2, Users, Zap, Lock, BarChart3, Target, Rocket, ArrowRight, CheckCircle2, Globe, PieChart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Investors = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if previously unlocked
    const unlocked = localStorage.getItem('investor_access') === 'true';
    setIsUnlocked(unlocked);
  }, []);

  const handleUnlock = () => {
    localStorage.setItem('investor_access', 'true');
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <InvestorLock onUnlock={handleUnlock} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section - The Hook */}
        <section className="container mx-auto px-4 py-20 text-center animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold">Series A Investment Opportunity</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Revolutionizing Real Estate Finance
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Building the first comprehensive financial operating system for real estate professionals—starting with $47B STR market
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/contact">Request Investment Deck</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Schedule Call
            </Button>
          </div>
        </section>

        {/* The Problem */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">The $4.5T Problem</h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Real estate professionals manage $4.5 trillion in assets but lack modern financial tools
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <div className="h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Cash Flow Gap</h3>
                  <p className="text-muted-foreground">
                    Property owners face 30-90 day delays between bookings and payouts, strangling growth
                  </p>
                </div>
                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <div className="h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Limited Access</h3>
                  <p className="text-muted-foreground">
                    Traditional banks reject 70% of real estate financing applications—too risky, too small
                  </p>
                </div>
                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <div className="h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Fragmented Tools</h3>
                  <p className="text-muted-foreground">
                    Professionals juggle 5-10 platforms for banking, payments, financing, and accounting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Solution: The REAP Platform</h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                A complete financial operating system purpose-built for real estate professionals
              </p>
              
              {/* Product Roadmap */}
              <div className="space-y-6">
                {/* Phase 1 - Current */}
                <div className="bg-primary/5 border-2 border-primary p-8 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Rocket className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">Phase 1: Revenue-Based Financing</h3>
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                          Live Now
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Instant cash advances against verified STR bookings. No credit checks, no personal guarantees.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>$1K-$50K advances in 48 hours</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Automatic repayment from bookings</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Direct Airbnb integration</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>10-15% fee, aligned incentives</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="bg-card border p-8 rounded-xl hover-scale">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">Phase 2: Property Acquisition Financing</h3>
                        <span className="px-3 py-1 bg-muted text-sm font-semibold rounded-full">Q2 2026</span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Bridge loans and down payment financing for property purchases—unlock portfolio growth
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>$50K-$500K acquisition financing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Fast approval based on projected returns</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="bg-card border p-8 rounded-xl hover-scale">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">Phase 3: REAP Business Banking</h3>
                        <span className="px-3 py-1 bg-muted text-sm font-semibold rounded-full">Q4 2026</span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Integrated business accounts, cards, and payment processing—one platform for all finances
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>FDIC-insured business checking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Corporate cards with rewards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Automated bookkeeping integration</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 4 */}
                <div className="bg-card border p-8 rounded-xl hover-scale">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PieChart className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">Phase 4: Wealth & Investment Platform</h3>
                        <span className="px-3 py-1 bg-muted text-sm font-semibold rounded-full">2027</span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Portfolio management, tax optimization, and investment products for real estate wealth
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Property portfolio analytics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Tax-advantaged retirement accounts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Real estate investment marketplace</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Massive Market Opportunity</h2>
              <p className="text-xl text-muted-foreground text-center mb-12">
                Capturing value across the entire real estate professional ecosystem
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">$47B</div>
                  <div className="text-xl font-semibold mb-2">STR Market (TAM)</div>
                  <p className="text-muted-foreground">1.4M active STR properties in US generating $47B annually</p>
                </div>
                <div className="text-center">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">$650B</div>
                  <div className="text-xl font-semibold mb-2">Investment Property Financing</div>
                  <p className="text-muted-foreground">$650B in annual investment property loans—underserved market</p>
                </div>
                <div className="text-center">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">$4.5T</div>
                  <div className="text-xl font-semibold mb-2">Total Addressable Market</div>
                  <p className="text-muted-foreground">All real estate professional financial services globally</p>
                </div>
              </div>

              <div className="bg-card p-8 rounded-xl border">
                <h3 className="text-2xl font-bold mb-6">Revenue Streams (Fully Scaled)</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Revenue-Based Financing Fees</span>
                    <span className="font-bold">40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Property Acquisition Loan Origination</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Banking & Payment Processing</span>
                    <span className="font-bold">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Wealth Management & Advisory</span>
                    <span className="font-bold">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Model & Unit Economics */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Proven Unit Economics</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card p-8 rounded-xl border">
                  <BarChart3 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Revenue Per Customer</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-3xl font-bold text-primary">$2,400</div>
                      <div className="text-sm text-muted-foreground">Average annual revenue per active user</div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-2">
                        <span>Initial advance fee</span>
                        <span className="font-semibold">$1,200</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Repeat advances (2-3x/year)</span>
                        <span className="font-semibold">$800</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional services</span>
                        <span className="font-semibold">$400</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-xl border">
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Customer Acquisition</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-3xl font-bold text-primary">$180</div>
                      <div className="text-sm text-muted-foreground">Customer acquisition cost (CAC)</div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-2">
                        <span>LTV:CAC Ratio</span>
                        <span className="font-semibold text-primary">13:1</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Payback period</span>
                        <span className="font-semibold">1.2 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gross margin</span>
                        <span className="font-semibold">68%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl border-2 border-primary/20">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Risk-Adjusted Returns for Investors</h3>
                  <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                    <div>
                      <div className="text-3xl font-bold mb-2">12-18%</div>
                      <div className="text-sm text-muted-foreground">Target annual returns</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">&lt;2%</div>
                      <div className="text-sm text-muted-foreground">Default rate (backed by bookings)</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">1.5x</div>
                      <div className="text-sm text-muted-foreground">Asset coverage ratio</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Moat */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Defensible Competitive Moat</h2>
              <p className="text-xl text-muted-foreground text-center mb-12">
                Network effects and vertical integration create sustainable advantages
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <h3 className="text-xl font-bold mb-3">Data Network Effects</h3>
                  <p className="text-muted-foreground">
                    Every transaction improves risk models and pricing accuracy—better terms attract more customers in a virtuous cycle
                  </p>
                </div>
                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <h3 className="text-xl font-bold mb-3">Platform Lock-In</h3>
                  <p className="text-muted-foreground">
                    Financial OS becomes operational backbone—switching costs increase as customers adopt banking, financing, and wealth products
                  </p>
                </div>
                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <h3 className="text-xl font-bold mb-3">Direct Integration Partnerships</h3>
                  <p className="text-muted-foreground">
                    First-mover partnerships with Airbnb, VRBO create technical moats—difficult to replicate access to booking data
                  </p>
                </div>
                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <h3 className="text-xl font-bold mb-3">Regulatory Barriers</h3>
                  <p className="text-muted-foreground">
                    Licensed lending infrastructure and banking partnerships are expensive to build—18-24 month head start over competitors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Traction */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Early Traction & Validation</h2>
              <p className="text-xl text-muted-foreground mb-12">
                Strong product-market fit driving organic growth
              </p>
              
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">$2.4M</div>
                  <div className="text-muted-foreground">Capital deployed</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">127</div>
                  <div className="text-muted-foreground">Active customers</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">40%</div>
                  <div className="text-muted-foreground">Month-over-month growth</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">$18K</div>
                  <div className="text-muted-foreground">Average advance size</div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-xl border max-w-2xl mx-auto">
                <p className="text-lg italic mb-4">
                  "REAP gave us $25K in 48 hours when our bank said no. That money turned into 3 new property acquisitions. Game changer."
                </p>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-muted-foreground">Managing 14 STR Properties, Denver</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Ask */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us in Building the Future</h2>
              <p className="text-xl mb-8 opacity-90">
                Raising $5M Series A to accelerate product development and scale operations
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                  <div className="text-3xl font-bold mb-2">$5M</div>
                  <div className="opacity-90">Series A Round</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                  <div className="text-3xl font-bold mb-2">18-24</div>
                  <div className="opacity-90">Month Runway</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                  <div className="text-3xl font-bold mb-2">$50M</div>
                  <div className="opacity-90">Post-Money Valuation</div>
                </div>
              </div>

              <div className="space-y-4 mb-12 text-left max-w-2xl mx-auto bg-white/10 backdrop-blur p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Use of Funds</h3>
                <div className="flex justify-between items-center">
                  <span>Product Development & Engineering</span>
                  <span className="font-bold">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Customer Acquisition & Marketing</span>
                  <span className="font-bold">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Capital for Lending Operations</span>
                  <span className="font-bold">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Team Expansion & Operations</span>
                  <span className="font-bold">10%</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur" asChild>
                  <Link to="/contact">Schedule Due Diligence Call</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">Questions? Let's Talk.</h3>
            <p className="text-muted-foreground mb-6">
              Reach out to discuss investment opportunities, partnership inquiries, or learn more about REAP
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Contact Investor Relations</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investors;