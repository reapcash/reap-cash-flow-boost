import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InvestorLock from '@/components/InvestorLock';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, DollarSign, Target, Zap, Users, PieChart, BarChart3, CheckCircle2, ArrowRight, Rocket, Shield, LineChart, AlertCircle, Clock, CreditCard, Building2, Repeat, Code, Database, GitBranch, Mail, Phone, MapPin, FileText, Award, TrendingDown, BanknoteIcon, Percent, Calendar, LogOut } from 'lucide-react';
const SeedInvestment = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  useEffect(() => {
    const unlocked = localStorage.getItem('seed_access') === 'true';
    setIsUnlocked(unlocked);
  }, []);
  const handleUnlock = () => {
    localStorage.setItem('seed_access', 'true');
    setIsUnlocked(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('seed_access');
    setIsUnlocked(false);
    window.scrollTo(0, 0);
  };
  if (!isUnlocked) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <InvestorLock onUnlock={handleUnlock} />
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Logout Button */}
        <div className="container mx-auto px-4 max-w-7xl pt-4">
          <div className="flex justify-end">
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-muted/10 border-b">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full text-sm font-semibold text-primary border border-primary/20">
                <Rocket className="w-4 h-4" />
                Seed Round Investment Opportunity
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">REAP</h1>
                <p className="text-2xl md:text-3xl font-semibold text-foreground max-w-4xl mx-auto leading-relaxed">
                  The Financial Operating System for Real Estate Professionals
                </p>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Turning verified future income into instant liquidity—then scaling into the full finance stack
                </p>
              </div>
              
              {/* Key Numbers */}
              <div className="pt-8">
                <Card className="inline-block border-2 border-primary/20 shadow-2xl bg-card/80 backdrop-blur-sm max-w-5xl">
                  <CardContent className="p-10">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="text-left space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">OpCo Equity Raise</p>
                            <p className="text-4xl font-bold text-primary">$3.0M</p>
                          </div>
                        </div>
                        <div className="pl-15 space-y-2 text-sm text-muted-foreground">
                          <p className="font-medium">SAFE @ $20M cap, 20% discount, MFN</p>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>18-month runway: team, infra, GTM, first-loss reserve</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-left space-y-4 border-l border-border pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Credit Facility (SPV)</p>
                            <p className="text-4xl font-bold text-primary">$10M</p>
                          </div>
                        </div>
                        <div className="pl-15 space-y-2 text-sm text-muted-foreground">
                          <p className="font-medium">90% advance rate, SOFR+9%, 1% commitment</p>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>Funds receivables inventory without equity dilution</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Integration Badges */}
              

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 justify-center pt-8">
                <Button size="lg" className="text-lg px-8 h-14" asChild>
                  <Link to="/contact">Request Investment Deck</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">One-Line Pitch</h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed italic">
                "REAP turns verified future real-estate income into instant liquidity, then scales into the full finance stack."
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">The Opportunity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    $4.5T addressable market in real estate professional financial services, starting with $47B STR advance beachhead
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8">
                  <Zap className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">The Product</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Instant advances on verified future income with automated repayment—48hr time-to-cash, no credit checks
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8">
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">The Traction</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    MVP live, compliance docs complete, targeting $25-30M GMV in 18 months with &lt;1.5% loss rate
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Problem</h2>
              <p className="text-2xl text-muted-foreground font-medium max-w-3xl mx-auto">
                Real estate pros earn reliably—but get paid slowly
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-l-4 border-l-destructive">
                <CardContent className="p-8">
                  <Clock className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-xl font-bold mb-3">30-90 Day Cash Gaps</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Between bookings, closings, and actual payouts—creating constant liquidity crunches that limit growth
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive">
                <CardContent className="p-8">
                  <TrendingDown className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-xl font-bold mb-3">Earnings ≠ Credit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Traditional lenders don't underwrite future earnings—only past credit, missing the full income picture
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive">
                <CardContent className="p-8">
                  <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-xl font-bold mb-3">Expensive Alternatives</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    High-interest credit cards, predatory MCAs, or slow bank LOCs that don't fit real estate income patterns
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardContent className="p-8 text-center">
                <p className="text-xl italic text-foreground font-medium">
                  "I have $50K in confirmed bookings and pending commissions—but the cash arrives weeks later when I need it now for renovations."
                </p>
                <p className="text-sm text-muted-foreground mt-4">— STR Host & Real Estate Investor</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Market Size</h2>
              <p className="text-xl text-muted-foreground">
                Massive addressable market with clear sequencing strategy
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-primary/50"></div>
                <CardContent className="p-8 text-center">
                  <PieChart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">$47B</div>
                  <h3 className="text-lg font-semibold mb-3">STR Bookings (US)</h3>
                  <p className="text-sm text-muted-foreground">
                    1.4M active listings, cleanest data, fast underwriting—our beachhead market
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-primary/50"></div>
                <CardContent className="p-8 text-center">
                  <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">$650B</div>
                  <h3 className="text-lg font-semibold mb-3">Investment Property Loans</h3>
                  <p className="text-sm text-muted-foreground">
                    Underserved long tail of investors and professionals with proven income
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-primary/50"></div>
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">$4.5T</div>
                  <h3 className="text-lg font-semibold mb-3">Broader Real Estate FinServ</h3>
                  <p className="text-sm text-muted-foreground">
                    Full banking, payments, and wealth services for real estate professionals
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3">Serviceable Obtainable Market (24 months)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Capturing just <span className="font-bold text-primary">0.15% of STR GMV</span> = <span className="font-bold text-primary">$70M advances/year</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Conservative market penetration with strong unit economics supports standalone business—before expanding into agent commissions, PMS partnerships, and banking rails
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Solution */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Solution</h2>
              <p className="text-2xl text-muted-foreground font-medium">
                Instant liquidity from verified future income
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Advance Up to 100%</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Of verified future payouts from platforms (Airbnb, VRBO) or brokerages—instant cash when you need it
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Percent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Flat, Transparent Fee</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Simple daily rate with no interest, no hidden charges, no impact on credit score—complete transparency
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Repeat className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Automated Repayment</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        When platform/brokerage pays out, we collect automatically via ACH—zero manual action required
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Smart Underwriting</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Real-time data from Plaid, Experian, and platform APIs—risk-based pricing, not credit-score gatekeeping
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-background border-2">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <FileText className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3">Legal Structure: Receivables Purchase</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We purchase future receivables at a discount (not a loan)—faster approval, lower friction, better alignment. Compliance-ready with full legal documentation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Growth Phases */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">REAP Growth Phases</h2>
              <p className="text-xl text-muted-foreground">
                Strategic expansion from beachhead to full-stack financial platform
              </p>
            </div>

            <div className="relative">
              {/* Timeline connector */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/30 z-0"></div>
              
              <div className="grid md:grid-cols-4 gap-6 relative z-10">
                {/* Phase 1 */}
                <Card className="border-2 border-primary hover:border-primary/70 transition-all hover:shadow-xl">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                      1
                    </div>
                  </div>
                  <CardContent className="p-6 pt-10">
                    <div className="text-center mb-4">
                      <Rocket className="w-12 h-12 text-primary mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-1">Phase 1</h3>
                      <p className="text-sm font-semibold text-primary">STR Beachhead</p>
                      <p className="text-xs text-muted-foreground mt-1">Months 0-18</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Launch STR advance product</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Airbnb + VRBO integrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Target $25-30M GMV</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Prove unit economics &lt;1.5% loss rate</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Phase 2 */}
                <Card className="border-2 border-primary/70 hover:border-primary transition-all hover:shadow-xl">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                      2
                    </div>
                  </div>
                  <CardContent className="p-6 pt-10">
                    <div className="text-center mb-4">
                      <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-1">Phase 2</h3>
                      <p className="text-sm font-semibold text-primary">Expand Verticals</p>
                      <p className="text-xs text-muted-foreground mt-1">Months 18-30</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Agent commission advances</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Developer earnouts & contractor invoices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>PMS partnership integrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Scale to $100M+ GMV</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Phase 3 */}
                <Card className="border-2 border-primary/50 hover:border-primary transition-all hover:shadow-xl">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                      3
                    </div>
                  </div>
                  <CardContent className="p-6 pt-10">
                    <div className="text-center mb-4">
                      <Building2 className="w-12 h-12 text-primary mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-1">Phase 3</h3>
                      <p className="text-sm font-semibold text-primary">Lending Products</p>
                      <p className="text-xs text-muted-foreground mt-1">Months 30-42</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Bridge loans & renovation lines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Property investment LOCs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Leverage receivables data for underwriting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Enter $650B investment loan market</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Phase 4 */}
                <Card className="border-2 border-primary/30 hover:border-primary transition-all hover:shadow-xl">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                      4
                    </div>
                  </div>
                  <CardContent className="p-6 pt-10">
                    <div className="text-center mb-4">
                      <LineChart className="w-12 h-12 text-primary mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-1">Phase 4</h3>
                      <p className="text-sm font-semibold text-primary">Full FinServ Stack</p>
                      <p className="text-xs text-muted-foreground mt-1">Months 42+</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Banking rails & payment processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Wealth management & insurance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Full financial OS for RE pros</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Capture $4.5T addressable market</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Card */}
              <Card className="mt-12 bg-primary/5 border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-3">Strategic Sequencing</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Each phase builds on proven traction from the previous stage. We start with the highest-signal, lowest-friction beachhead (STR advances), 
                        then leverage that customer relationship and data infrastructure to cross-sell adjacent financial products. This approach de-risks each 
                        expansion step while maximizing customer lifetime value and creating a durable competitive moat through integrated financial data.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works - Complete Flow */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Complete Flow Cycle</h2>
              <p className="text-xl text-muted-foreground">
                From connection to cash in 48 hours
              </p>
            </div>

            <div className="relative">
              {/* Flow Steps */}
              <div className="grid md:grid-cols-5 gap-4 mb-12">
                {/* Step 1 */}
                <Card className="relative border-2 border-primary/20 hover:border-primary/50 transition-all">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                  </div>
                  <CardContent className="p-6 pt-8 text-center">
                    <Database className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2 text-sm">Connect</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Link Airbnb (read-only) + bank via Plaid
                    </p>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card className="relative border-2 border-primary/20 hover:border-primary/50 transition-all">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                  </div>
                  <CardContent className="p-6 pt-8 text-center">
                    <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2 text-sm">Verify</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Upload KYC docs + Experian soft credit pull
                    </p>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card className="relative border-2 border-primary/20 hover:border-primary/50 transition-all">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                  </div>
                  <CardContent className="p-6 pt-8 text-center">
                    <BarChart3 className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2 text-sm">Calculate</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Select bookings → fee algorithm determines offer
                    </p>
                  </CardContent>
                </Card>

                {/* Step 4 */}
                <Card className="relative border-2 border-primary/20 hover:border-primary/50 transition-all">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                  </div>
                  <CardContent className="p-6 pt-8 text-center">
                    <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2 text-sm">Sign</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      DocuSign agreement → instant ACH disbursement
                    </p>
                  </CardContent>
                </Card>

                {/* Step 5 */}
                <Card className="relative border-2 border-primary/20 hover:border-primary/50 transition-all">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      5
                    </div>
                  </div>
                  <CardContent className="p-6 pt-8 text-center">
                    <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2 text-sm">Repay</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Auto ACH on payout date → reconcile → repeat
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics Bar */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold text-primary mb-1">48 hrs</div>
                    <p className="text-sm text-muted-foreground">Average time-to-cash</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold text-primary mb-1">92%+</div>
                    <p className="text-sm text-muted-foreground">Repayment capture rate</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold text-primary mb-1">&lt;1.5%</div>
                    <p className="text-sm text-muted-foreground">Target 90-day loss rate</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Transparent Pricing */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground">
                Dynamic, explainable, auditable fee algorithm
              </p>
            </div>

            {/* Master Formula */}
            <Card className="mb-12 border-2 border-primary/20 bg-background">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Master Fee Equation</h3>
                  <div className="inline-block bg-muted px-8 py-6 rounded-xl font-mono text-lg">
                    <span className="text-primary font-bold">F</span> = max(<span className="text-primary font-bold">F<sub>min</sub></span>, <span className="text-primary font-bold">A</span> × <span className="text-primary font-bold">R<sub>eff</sub></span> × <span className="text-primary font-bold">D</span>)
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg mb-4">Core Variables</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="font-mono font-bold text-primary">A</span>
                        <div className="flex-1">
                          <p className="font-medium">Advance Amount</p>
                          <p className="text-sm text-muted-foreground">Total requested payout amount</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="font-mono font-bold text-primary">D</span>
                        <div className="flex-1">
                          <p className="font-medium">Days Until Payout</p>
                          <p className="text-sm text-muted-foreground">Time between advance and expected payout</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="font-mono font-bold text-primary">F<sub>min</sub></span>
                        <div className="flex-1">
                          <p className="font-medium">Minimum Fee = $45</p>
                          <p className="text-sm text-muted-foreground">Floor to cover operational costs</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg mb-4">Effective Rate (R<sub>eff</sub>)</h4>
                    <div className="p-4 bg-muted/50 rounded-lg mb-4">
                      <p className="font-mono text-center mb-2">
                        <span className="text-primary font-bold">R<sub>eff</sub></span> = <span className="text-primary font-bold">R<sub>base</sub></span> × <span className="text-primary font-bold">S</span> × <span className="text-primary font-bold">RF</span> × <span className="text-primary font-bold">MF</span>
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="font-mono font-bold text-primary text-sm">R<sub>base</sub></span>
                        <div className="flex-1">
                          <p className="font-medium">Base Rate = 0.11% / day</p>
                          <p className="text-sm text-muted-foreground">Core daily rate foundation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="font-mono font-bold text-primary">S</span>
                        <div className="flex-1">
                          <p className="font-medium">Scale Factor = 0.95–1.10</p>
                          <p className="text-sm text-muted-foreground">Larger advances get better rates</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="font-mono font-bold text-primary">RF</span>
                        <div className="flex-1">
                          <p className="font-medium">Risk Factor = 1.0–1.25</p>
                          <p className="text-sm text-muted-foreground">Based on history, reviews, cancellations, credit</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="font-mono font-bold text-primary">MF</span>
                        <div className="flex-1">
                          <p className="font-medium">Market Factor = 0.9–1.1</p>
                          <p className="text-sm text-muted-foreground">Seasonality, geography, liquidity conditions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Example Calculation */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold mb-8 text-center">Example: $11,000 Advance, 78 Days</h3>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Calculation Steps</h4>
                    <div className="space-y-3 font-mono text-sm bg-muted/50 p-6 rounded-lg">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>A (Amount)</span>
                        <span className="font-bold">$11,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>D (Days)</span>
                        <span className="font-bold">78 days</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>R<sub>base</sub></span>
                        <span className="font-bold">0.11% / day</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>S (Scale)</span>
                        <span className="font-bold">1.00</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>RF (Risk)</span>
                        <span className="font-bold">1.05</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>MF (Market)</span>
                        <span className="font-bold">1.00</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-primary font-bold">R<sub>eff</sub></span>
                        <span className="text-primary font-bold">0.1155% / day</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Final Result</h4>
                    <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-6 space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Fee</p>
                        <p className="text-4xl font-bold text-primary">$991</p>
                        <p className="text-sm text-muted-foreground mt-1">≈ 9.0% of advance</p>
                      </div>
                      <div className="border-t-2 border-primary/20 pt-4">
                        <p className="text-sm text-muted-foreground mb-1">Cash to Host Today</p>
                        <p className="text-3xl font-bold">$10,009</p>
                      </div>
                      <div className="border-t border-border pt-3 mt-3">
                        <p className="text-sm text-muted-foreground mb-1">Effective Annual Rate</p>
                        <p className="text-xl font-semibold">~42.1%</p>
                        <p className="text-xs text-muted-foreground mt-1">For comparison only—not a loan product</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-background border rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-2">Why This Pricing Works</p>
                      <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                        <li>• <span className="font-medium">Transparent:</span> User sees exactly how fee is calculated before committing</li>
                        <li>• <span className="font-medium">Risk-based:</span> Better borrowers get better rates automatically</li>
                        <li>• <span className="font-medium">Competitive:</span> Significantly better than credit cards (20-30% APR) or MCAs (40-100%+)</li>
                        <li>• <span className="font-medium">Profitable:</span> Supports 19%+ annualized platform yield after costs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Unit Economics */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Unit Economics</h2>
              <p className="text-xl text-muted-foreground">
                Path to scalable, profitable growth
              </p>
            </div>

            <Card className="mb-12 border-2 border-primary/20">
              <CardContent className="p-10">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold mb-6">Base Case Assumptions (60 days)</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Average Advance (A)</span>
                        <span className="font-bold text-lg">$10,000</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Average Duration (D)</span>
                        <span className="font-bold text-lg">60 days</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Typical Fee (7.5% of A)</span>
                        <span className="font-bold text-lg text-primary">$750</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-6">Cost Structure Per Advance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Cost of Capital (12% APR × 60d)</span>
                        <span className="font-semibold">2.0%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Expected Loss (EL)</span>
                        <span className="font-semibold">1.3%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Servicing & Ops</span>
                        <span className="font-semibold">1.0%</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary/30 mt-4">
                        <span className="font-bold">Net Contribution (60d)</span>
                        <span className="font-bold text-xl text-primary">3.2%</span>
                      </div>
                      <div className="text-center pt-2">
                        <p className="text-sm text-muted-foreground">Annualized Platform Yield</p>
                        <p className="text-3xl font-bold text-primary">~19%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <TrendingUp className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold mb-2">Scale Improvements</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    As volume grows: ops → 0.6%, EL → 1.0% (better stratification), yielding 25%+ annualized margins
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <Repeat className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold mb-2">Repeat Revenue</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Average host takes 2-4 advances/year; strong retention drives compounding economics
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <CreditCard className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold mb-2">Facility Leverage</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every $1 equity supports $9 debt; minimal dilution as volume scales
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 18-Month Plan */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">18-Month Milestones</h2>
              <p className="text-xl text-muted-foreground">
                What your seed investment buys
              </p>
            </div>

            {/* Traction Metrics */}
            <Card className="mb-12 border-2 border-primary/20">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Target className="w-8 h-8 text-primary" />
                  Traction Targets
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border">
                    <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary mb-2">600-800</div>
                    <p className="text-sm text-muted-foreground">Hosts Onboarded</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border">
                    <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary mb-2">350-450</div>
                    <p className="text-sm text-muted-foreground">Active Hosts/Month</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border">
                    <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary mb-2">$25-30M</div>
                    <p className="text-sm text-muted-foreground">Cumulative GMV</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border">
                    <BarChart3 className="w-10 h-10 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary mb-2">$4-5M</div>
                    <p className="text-sm text-muted-foreground">Net Rev Run-Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <Card className="mb-12 border-2 border-primary/20">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-primary" />
                  Risk & Quality Targets
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">90-day Loss Rate</span>
                      <span className="font-bold text-xl text-primary">≤ 1.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Repayment Capture (Platform)</span>
                      <span className="font-bold text-xl text-primary">≥ 92%</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Time to Cash</span>
                      <span className="font-bold text-xl text-primary">≤ 48h</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">CAC Payback Period</span>
                      <span className="font-bold text-xl text-primary">≤ 2 advances</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Series A Readiness */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Rocket className="w-8 h-8 text-primary" />
                  Series A Readiness
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Signed $25-50M Warehouse</p>
                      <p className="text-sm text-muted-foreground">Term sheet with expandable facility to $50M+ for growth capital</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">3-5 PMS Partnerships</p>
                      <p className="text-sm text-muted-foreground">Distribution via Hostaway, Guesty, Lodgify with API integrations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Second Product Beta</p>
                      <p className="text-sm text-muted-foreground">Agent commission advances contributing ≥10% of GMV</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Proven Risk Engine</p>
                      <p className="text-sm text-muted-foreground">Validated underwriting models with loss &lt;1.5% across cohorts</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Use of Funds */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Use of Funds</h2>
              <p className="text-xl text-muted-foreground">
                $3.0M seed equity allocation for 18-month runway
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Code className="w-10 h-10 text-primary" />
                      <div>
                        <h3 className="text-xl font-bold">Product & Data</h3>
                        <p className="text-3xl font-bold text-primary">38%</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>5-7 engineers: risk engine, admin console, underwriting service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Data pipelines (Airbnb/VRBO, Plaid, Experian integrations)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Infrastructure, testing, security, DevOps</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-10 h-10 text-primary" />
                      <div>
                        <h3 className="text-xl font-bold">GTM & Growth</h3>
                        <p className="text-3xl font-bold text-primary">24%</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Host acquisition (Facebook groups, STR communities, creator partnerships)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>PMS partner integrations & rev-share deals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Referral programs, lifecycle email/SMS, content marketing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Shield className="w-10 h-10 text-primary" />
                      <div>
                        <h3 className="text-xl font-bold">Risk & Compliance</h3>
                        <p className="text-3xl font-bold text-primary">14%</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>KYC/AML vendor integration & monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Legal counsel, audits, compliance reviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>DocuSign, secure document management, InfoSec protocols</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Users className="w-10 h-10 text-primary" />
                      <div>
                        <h3 className="text-xl font-bold">Ops & Support</h3>
                        <p className="text-3xl font-bold text-primary">12%</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Servicing team, collections workflows, customer support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Zendesk, CRM tools, operational playbooks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Reconciliation, reporting, host success management</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <CreditCard className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3">First-Loss Reserve (12%)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      ~$300-350K equity injection into SPV unlocks $3-3.5M initial warehouse draw at 10% first-loss requirement
                    </p>
                    <p className="text-sm text-muted-foreground">
                      As portfolio performs and grows, reserve expands proportionally to support larger facility utilization
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Team</h2>
              <p className="text-xl text-muted-foreground">
                Building with fintech, risk, and real estate expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Shaurav Taneja</h3>
                      <p className="text-primary font-semibold mb-3">Founder & CEO</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        PM/fintech ops background • Real estate operator • Built GTM playbooks for financial products • Deep domain knowledge in STR and investment property markets
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Code className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">CTO</h3>
                      <p className="text-muted-foreground font-semibold mb-3">Hiring</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Risk/data infrastructure expert • Laravel/AWS experience • Prior fintech underwriting platform builder • Will architect scalable risk engine and integrations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Shield className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Head of Risk</h3>
                      <p className="text-muted-foreground font-semibold mb-3">Hiring</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Receivables underwriting specialist • Collections experience • Credit facility management • Will build and refine risk models, manage warehouse relationship
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Target className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Ops Lead</h3>
                      <p className="text-muted-foreground font-semibold mb-3">Hiring</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        DocuSign/servicing expert • Collections workflows • Host success • Will scale operational playbooks and support infrastructure
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-background border-2">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary" />
                  Advisors & Pipeline
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Active advisor network includes: credit/warehouse structuring, PMS distribution partnerships, compliance counsel, and fintech GTM specialists. Strong candidate pipeline for all key roles.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Ask */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Ask</h2>
              <p className="text-xl text-muted-foreground">
                Clear, simple, milestone-driven seed round
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-primary/30 bg-card/80 backdrop-blur">
                <CardContent className="p-10">
                  <Building2 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">$3.0M Seed Equity</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-muted-foreground">Structure</span>
                      <span className="font-semibold">SAFE</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-muted-foreground">Post-Money Cap</span>
                      <span className="font-semibold">$20M</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Terms</span>
                      <span className="font-semibold">MFN</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Funds team, infrastructure, go-to-market, and first-loss reserve for warehouse
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/30 bg-card/80 backdrop-blur">
                <CardContent className="p-10">
                  <CreditCard className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">$10M Credit Facility</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-muted-foreground">Advance Rate</span>
                      <span className="font-semibold">90%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-muted-foreground">Pricing</span>
                      <span className="font-semibold">SOFR+9%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-muted-foreground">Commitment Fee</span>
                      <span className="font-semibold">1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">First-Loss</span>
                      <span className="font-semibold">10%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Warehouse funds receivables inventory without equity dilution
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold mb-6 text-center">What This Achieves</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-bold mb-2">Ship v1.0</h4>
                    <p className="text-sm text-muted-foreground">Risk engine, ops console, PMS hooks</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-bold mb-2">Scale to $25M GMV</h4>
                    <p className="text-sm text-muted-foreground">600-800 hosts, proven unit economics</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-bold mb-2">Prove ≤1.5% Loss</h4>
                    <p className="text-sm text-muted-foreground">De-risk model, secure $50M warehouse</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Now */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Now / Why Us</h2>
              <p className="text-xl text-muted-foreground">
                Timing, specialization, and execution alignment
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <Database className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Data Liquidity Era</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    APIs and open finance finally enable receivable-based underwriting at scale—platforms provide verification that wasn't possible 5 years ago
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Purpose-Built</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Not generic MCA or BNPL—built specifically for real estate income patterns with deep domain expertise and custom workflows
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <Zap className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Fast Execution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    MVP live, docs complete, SPV template ready, focused wedge strategy—ready to deploy capital and scale immediately
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10 border-t">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-muted-foreground">
                Ready to discuss investment or partnership opportunities
              </p>
            </div>

            <Card className="border-2 border-primary/20 shadow-2xl">
              <CardContent className="p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Shaurav Taneja</h3>
                      <p className="text-muted-foreground font-medium mb-6">Founder & CEO</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <a href="mailto:taneja@reap.cash" className="text-primary hover:underline font-medium">
                            taneja@reap.cash
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          <a href="tel:+16464009444" className="text-primary hover:underline font-medium">
                            +1 (646) 400-9444
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium">New York, NY</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <p className="text-sm text-muted-foreground mb-3">Also available at:</p>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Primary:</span>{' '}
                          <a href="https://reap.cash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            reap.cash
                          </a>
                        </p>
                        <p>
                          <span className="font-medium">Corporate:</span>{' '}
                          <a href="https://realestateadvancepartners.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            realestateadvancepartners.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-muted/30 rounded-xl p-6">
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Investment Materials
                      </h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>Full pitch deck (24 slides)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>Financial model (36-month)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>Data room access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>Compliance documentation</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <Button size="lg" className="w-full text-lg h-14" asChild>
                        <Link to="/contact">Request Investment Deck</Link>
                      </Button>
                      <Button size="lg" variant="outline" className="w-full text-lg h-14">
                        Schedule Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default SeedInvestment;