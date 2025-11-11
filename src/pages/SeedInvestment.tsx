import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Target, Zap, Users, PieChart, BarChart3, CheckCircle2, ArrowRight, Rocket, Shield, LineChart } from 'lucide-react';

const SeedInvestment = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold">Seed Round</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Fund the Future of Real Estate Finance
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
            $3M seed equity + $10M credit facility to build the operating system for real estate professionals
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">$3.0M</div>
              <div className="text-muted-foreground">Equity Raise</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">$10M</div>
              <div className="text-muted-foreground">Credit Facility</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">$20M</div>
              <div className="text-muted-foreground">Post-Money Cap</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/contact">Request Investment Deck</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Schedule Call
            </Button>
          </div>
        </section>

        {/* The Opportunity */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">The Opportunity</h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Start with STR advances in a $47B market, then expand across the entire $4.5T real estate finance ecosystem
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card p-8 rounded-xl border hover-scale text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">$47B</div>
                  <h3 className="text-xl font-bold mb-3">STR Market TAM</h3>
                  <p className="text-muted-foreground">1.4M active properties generating verified revenue</p>
                </div>
                
                <div className="bg-card p-8 rounded-xl border hover-scale text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">$25M</div>
                  <h3 className="text-xl font-bold mb-3">18-Month GMV Target</h3>
                  <p className="text-muted-foreground">Cumulative advances through validated distribution</p>
                </div>
                
                <div className="bg-card p-8 rounded-xl border hover-scale text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LineChart className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">19%</div>
                  <h3 className="text-xl font-bold mb-3">Platform Yield</h3>
                  <p className="text-muted-foreground">Annualized after costs, proven unit economics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Round Architecture */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Round Architecture</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* OpCo Equity */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary p-8 rounded-xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">A. OpCo Equity</h3>
                      <p className="text-muted-foreground">Product development & go-to-market</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-card/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Raise Amount</div>
                      <div className="text-2xl font-bold">$2.5M - $3.0M</div>
                    </div>
                    
                    <div className="bg-card/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Instrument</div>
                      <div className="font-semibold">SAFE (post-money)</div>
                      <div className="text-sm mt-1">$18-$22M cap, 20% discount, MFN</div>
                    </div>
                    
                    <div className="bg-card/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Use of Funds</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Team (engineering, risk, ops)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Compliance & underwriting infrastructure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Marketing & data pipelines</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>First-loss reserve for SPV</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Credit SPV */}
                <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-2 border-secondary p-8 rounded-xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">B. Credit SPV</h3>
                      <p className="text-muted-foreground">Warehouse for advance capital</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-card/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Target Line</div>
                      <div className="text-2xl font-bold">$8M - $12M</div>
                      <div className="text-sm mt-1">Expandable to $25M</div>
                    </div>
                    
                    <div className="bg-card/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Structure</div>
                      <div className="font-semibold">Borrowing-base, 85-90% advance rate</div>
                      <div className="text-sm mt-1">SOFR + 8-10% (≈12-14% APR all-in)</div>
                    </div>
                    
                    <div className="bg-card/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Waterfall Priority</div>
                      <ul className="space-y-1 text-sm">
                        <li>1. Servicing & trust costs</li>
                        <li>2. Interest to lender</li>
                        <li>3. Principal to lender</li>
                        <li>4. Replenish first-loss</li>
                        <li>5. Residual to OpCo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-primary/5 border border-primary/20 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Why This Split?</h4>
                    <p className="text-muted-foreground">
                      Your equity funds software + risk engine; your debt funds the receivables. 
                      This structure prevents dilution from financing "inventory" while maintaining capital efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use of Funds */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Seed Use of Funds</h2>
              <p className="text-xl text-muted-foreground text-center mb-12">
                18-month runway to reach $25M GMV and secure Series A
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Product & Data</h3>
                    <span className="text-2xl font-bold text-primary">38%</span>
                  </div>
                  <p className="text-muted-foreground">
                    5-7 engineers, data pipeline (Airbnb/VRBO, Plaid, Experian), underwriting service, admin console
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">GTM & Acquisition</h3>
                    <span className="text-2xl font-bold text-primary">24%</span>
                  </div>
                  <p className="text-muted-foreground">
                    Host acquisition (FB groups, PMS partners), referral payouts, lifecycle email/SMS
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Risk & Compliance</h3>
                    <span className="text-2xl font-bold text-primary">14%</span>
                  </div>
                  <p className="text-muted-foreground">
                    KYC/AML, document verification (DocuSign), audits, legal counsel
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">First-Loss Reserve</h3>
                    <span className="text-2xl font-bold text-primary">12%</span>
                  </div>
                  <p className="text-muted-foreground">
                    ~$300-$350K to unlock $3M-$3.5M first draw; grows with credit line
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Ops & Support</h3>
                    <span className="text-2xl font-bold text-primary">12%</span>
                  </div>
                  <p className="text-muted-foreground">
                    Servicing workflows, collections, customer support (Zendesk)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unit Economics */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Defensible Unit Economics</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-card p-8 rounded-xl border">
                  <BarChart3 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-6">Average STR Advance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Advance Amount</span>
                      <span className="font-bold text-lg">$10,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-bold text-lg">60 days</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Fee (7.5%)</span>
                      <span className="font-bold text-lg">$750</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-xl border">
                  <PieChart className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-6">Per-Advance Economics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Fee Revenue</span>
                      <span className="font-bold text-lg text-primary">+7.5%</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Cost of Capital</span>
                      <span className="font-bold text-lg">-2.0%</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Expected Loss</span>
                      <span className="font-bold text-lg">-1.3%</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Servicing & Ops</span>
                      <span className="font-bold text-lg">-1.0%</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold">Net Contribution</span>
                      <span className="font-bold text-2xl text-primary">3.2%</span>
                    </div>
                    <div className="text-center pt-4 border-t">
                      <div className="text-3xl font-bold text-primary">~19%</div>
                      <div className="text-sm text-muted-foreground">Annualized Platform Yield</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3">Scale Improvements</h4>
                <p className="text-muted-foreground">
                  At scale, automation reduces ops to ~0.6% and better risk stratification brings expected loss to ~1.0%, 
                  improving net contribution to 4-5% per 60-day advance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 18-Month Milestones */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">18-Month Milestones</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-card p-8 rounded-xl border">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">Traction</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>600-800</strong> hosts onboarded</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>350-450</strong> active hosts/month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>$20-30M</strong> cumulative GMV</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>$3.5-5.0M</strong> net revenue run-rate</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-8 rounded-xl border">
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">Risk & Quality</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>90-day loss rate <strong>≤1.5%</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Platform repayment capture <strong>≥92%</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Time to cash <strong>≤48 hours</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>CAC payback <strong>≤2 advances</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-8 rounded-xl border">
                  <Rocket className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">Series A Ready</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>$25-50M</strong> warehouse term sheet signed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>3-5 PMS</strong> partnerships live</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Second product (agent commissions) in beta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>≥10% GMV</strong> from new products</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Ask */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary p-12 rounded-2xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">The Ask</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-card p-6 rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-2">$3.0M</div>
                    <div className="font-semibold mb-2">Seed Equity (OpCo)</div>
                    <div className="text-sm text-muted-foreground">SAFE $20M cap / 20% discount</div>
                  </div>
                  <div className="bg-card p-6 rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-2">$10M</div>
                    <div className="font-semibold mb-2">Credit Facility (SPV)</div>
                    <div className="text-sm text-muted-foreground">90% advance rate, SOFR+9%, 1% commitment, 10% first-loss</div>
                  </div>
                </div>
                
                <div className="bg-card p-6 rounded-xl mb-8">
                  <h3 className="font-bold text-lg mb-4">What This Buys</h3>
                  <ul className="space-y-2 text-left max-w-2xl mx-auto">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Ship v1.0 risk engine & operations platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Scale host acquisition through validated channels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Reach $25M GMV with ≤1.5% loss rate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Secure $50M+ warehouse for Series A</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="text-lg px-8" asChild>
                    <Link to="/contact">Request Full Deck</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Schedule Due Diligence Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Room Preview */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Data Room Ready</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border">
                  <h3 className="font-bold text-lg mb-3">Financial Models</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Cohort calculator & unit economics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Fee algorithm & back-tests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>GTM experiments & CAC/LTV assumptions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl border">
                  <h3 className="font-bold text-lg mb-3">Legal & Compliance</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>KYC/AML, InfoSec, BCP procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Draft SPV docs & waterfall structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Compliance memo (receivables vs lending)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl border">
                  <h3 className="font-bold text-lg mb-3">Technology Stack</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Tech architecture & vendor list</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Data pipeline documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Security & infrastructure setup</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl border">
                  <h3 className="font-bold text-lg mb-3">Credit Facility Terms</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Eligibility criteria & concentration limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Borrowing base haircuts by risk score</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Reporting & audit procedures</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Back the Future?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join us in building the operating system for real estate professionals. 
              $47B market today, $4.5T opportunity tomorrow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/10">
                Download One-Pager
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeedInvestment;