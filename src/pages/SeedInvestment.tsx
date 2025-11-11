import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InvestorLock from '@/components/InvestorLock';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Target, Zap, Users, PieChart, BarChart3, CheckCircle2, ArrowRight, Rocket, Shield, LineChart, AlertCircle, Clock, CreditCard, Building2, Repeat, TrendingDown, Code, Database, GitBranch } from 'lucide-react';

const SeedInvestment = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if previously unlocked
    const unlocked = localStorage.getItem('seed_access') === 'true';
    setIsUnlocked(unlocked);
  }, []);

  const handleUnlock = () => {
    localStorage.setItem('seed_access', 'true');
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

        {/* The Problem */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">The Problem</h2>
                <p className="text-2xl md:text-3xl text-muted-foreground font-semibold max-w-3xl mx-auto">
                  Real estate pros earn reliably—but get paid slowly
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <Clock className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-xl font-bold mb-3">30-90 Day Cash Gaps</h3>
                  <p className="text-muted-foreground">Between bookings/closings and actual payouts, creating liquidity crunches</p>
                </div>

                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <TrendingDown className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-xl font-bold mb-3">Earnings ≠ Credit</h3>
                  <p className="text-muted-foreground">Traditional lenders don't underwrite future earnings, only past credit history</p>
                </div>

                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <CreditCard className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-xl font-bold mb-3">High-Cost Options</h3>
                  <p className="text-muted-foreground">Forced to rely on credit cards or miss growth opportunities entirely</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/30 p-8 rounded-2xl">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xl md:text-2xl font-semibold italic mb-2">
                      "I have confirmed bookings and pending commissions—but cash arrives weeks later."
                    </p>
                    <p className="text-muted-foreground">— The voice of thousands of real estate professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Who We Serve</h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Starting with the cleanest data signals, expanding across the real estate professional ecosystem
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary p-8 rounded-xl">
                  <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full mb-4">
                    CORE ICP #1
                  </div>
                  <Building2 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-3">STR Hosts</h3>
                  <p className="text-muted-foreground mb-4">
                    Airbnb & VRBO hosts with confirmed bookings. Cleanest data, fastest underwriting, immediate validation.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Live now</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary p-8 rounded-xl">
                  <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm font-bold rounded-full mb-4">
                    CORE ICP #2
                  </div>
                  <Users className="h-12 w-12 text-secondary mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Real Estate Agents</h3>
                  <p className="text-muted-foreground mb-4">
                    Agents with pending commissions. Next wedge for expansion with proven distribution channels.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                    <Rocket className="h-4 w-4" />
                    <span>Next 6-12 months</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border">
                <h4 className="font-bold mb-3">Secondary Markets</h4>
                <p className="text-muted-foreground">Property managers, contractors, and developers with verified receivables—each expanding our addressable market</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">The Solution</h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Instant liquidity from verified future income—not a loan
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <DollarSign className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Advance up to 100%</h3>
                  <p className="text-muted-foreground">Of future platform payouts or commission checks, based on verified data</p>
                </div>

                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <PieChart className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Flat, Transparent Fee</h3>
                  <p className="text-muted-foreground">No interest charges, no credit hit, no hidden costs—just a clear advance fee</p>
                </div>

                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <Repeat className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Automated Repayment</h3>
                  <p className="text-muted-foreground">Seamless collection when platform or brokerage pays out—no manual payments</p>
                </div>

                <div className="bg-card p-8 rounded-xl border hover-scale">
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Smart Underwriting</h3>
                  <p className="text-muted-foreground">Uses booking data, banking signals, and soft credit checks—not traditional FICO</p>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Key Differentiator</h4>
                    <p className="text-muted-foreground">
                      We <strong>buy receivables at a discount</strong>—we don't lend. This enables faster approvals, 
                      lower friction, and better alignment with platform economics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">How It Works</h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Simple for users, rigorous for risk—48 hours to cash
              </p>

              <div className="bg-card p-8 rounded-xl border mb-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Connect Accounts</h3>
                      <p className="text-muted-foreground">Link Airbnb (read-only) + bank account via Plaid for instant verification</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Verify Identity</h3>
                      <p className="text-muted-foreground">Upload KYC documents; soft credit pull via Experian (no impact to score)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Select & Calculate</h3>
                      <p className="text-muted-foreground">
                        Choose bookings → Fee Algorithm calculates: <code className="text-sm bg-muted px-2 py-1 rounded">F = max(Fmin, A × R_eff × D)</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Sign & Receive</h3>
                      <p className="text-muted-foreground">DocuSign agreement → instant ACH disbursement to bank account</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Auto-Repay & Repeat</h3>
                      <p className="text-muted-foreground">On payout date → automated ACH pull, reconcile, ready for next advance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-xl border-2 border-primary/20">
                <h4 className="font-bold text-center mb-6">Complete Flow Cycle</h4>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold">Connect</div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="bg-card px-4 py-2 rounded-lg font-semibold border">Verify</div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="bg-card px-4 py-2 rounded-lg font-semibold border">Calculate</div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="bg-card px-4 py-2 rounded-lg font-semibold border">Sign</div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">Receive Cash</div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold">Auto-Repay</div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold">Repeat</div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Seamless, repeatable cycle that builds trust and reduces friction over time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Fee Algorithm */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Dynamic, explainable, auditable—no hidden charges
              </p>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary p-8 rounded-xl mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Master Fee Equation</h3>
                <div className="bg-card p-6 rounded-lg text-center mb-6">
                  <code className="text-2xl font-mono font-bold">F = max(F<sub>min</sub>, A × R<sub>eff</sub> × D)</code>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-card p-6 rounded-lg">
                    <h4 className="font-bold mb-3">Base Rate (R<sub>base</sub>)</h4>
                    <p className="text-3xl font-bold text-primary mb-2">0.12%</p>
                    <p className="text-sm text-muted-foreground">per day</p>
                  </div>

                  <div className="bg-card p-6 rounded-lg">
                    <h4 className="font-bold mb-3">Scale Factor (S)</h4>
                    <p className="text-3xl font-bold text-primary mb-2">0.95-1.10</p>
                    <p className="text-sm text-muted-foreground">by amount tier</p>
                  </div>

                  <div className="bg-card p-6 rounded-lg">
                    <h4 className="font-bold mb-3">Risk Factor (RF)</h4>
                    <p className="text-3xl font-bold text-primary mb-2">1.0-1.25</p>
                    <p className="text-sm text-muted-foreground">history, reviews, credit</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-xl border">
                <h3 className="text-2xl font-bold mb-6">Example Calculation</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold mb-4">Inputs</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Advance Amount (A)</span>
                        <span className="font-bold">$11,000</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Duration (D)</span>
                        <span className="font-bold">78 days</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Effective Rate</span>
                        <span className="font-bold">0.126%/day</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Output</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Total Fee</span>
                        <span className="font-bold text-destructive">-$1,080</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Fee Percentage</span>
                        <span className="font-bold">9.8%</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t-2 border-primary">
                        <span className="font-bold">You Receive Today</span>
                        <span className="font-bold text-2xl text-primary">$9,920</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

        {/* Competition & Moat */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Our Competitive Moat</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-card p-8 rounded-xl border">
                  <h3 className="text-2xl font-bold mb-6 text-destructive">Alternatives (Gaps)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground"><strong>Credit Cards:</strong> High interest, FICO-based, wrong product-market fit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground"><strong>Merchant Cash Advance:</strong> Generic, expensive, slow underwriting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground"><strong>BNPL:</strong> Consumer-focused, doesn't handle B2B receivables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground"><strong>Bank LOCs:</strong> Slow approval, traditional credit requirements</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary p-8 rounded-xl">
                  <h3 className="text-2xl font-bold mb-6 text-primary">REAP Advantage</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Verified Receivables:</strong> Direct platform integration = 92%+ repayment capture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Data Integrations:</strong> Platform + banking + soft credit = superior underwriting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Purchase Structure:</strong> Not a loan = faster approval, lower friction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Purpose-Built:</strong> Designed for real estate income patterns from day one</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary p-8 rounded-xl">
                <h4 className="font-bold text-center text-2xl mb-8">The Competitive Flywheel</h4>
                <div className="relative">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-primary text-primary-foreground p-6 rounded-xl text-center">
                      <Building2 className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-bold">PMS Distribution</p>
                    </div>
                    <div className="bg-card p-6 rounded-xl text-center border-2 border-secondary">
                      <Database className="h-8 w-8 mx-auto mb-2 text-secondary" />
                      <p className="font-bold">More Data</p>
                    </div>
                    <div className="bg-card p-6 rounded-xl text-center border">
                      <Shield className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-bold">Better Underwriting</p>
                    </div>
                    <div className="bg-green-500 text-white p-6 rounded-xl text-center">
                      <TrendingDown className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-bold">Lower Loss</p>
                    </div>
                    <div className="bg-card p-6 rounded-xl text-center border">
                      <DollarSign className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-bold">Cheaper Capital</p>
                    </div>
                    <div className="bg-accent text-accent-foreground p-6 rounded-xl text-center">
                      <Target className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-bold">Better Pricing</p>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <div className="inline-flex items-center gap-2 bg-card px-6 py-3 rounded-full border-2 border-primary">
                      <Repeat className="h-5 w-5 text-primary" />
                      <p className="font-bold">Continuous Cycle</p>
                    </div>
                  </div>
                </div>
                <p className="text-center text-muted-foreground mt-6">
                  <strong>The Flywheel:</strong> Distribution + Data → Superior Collections → Cheaper Capital → Market Leadership
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Roadmap */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Product Roadmap</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary p-8 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold text-sm">
                      0-6 MO
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">Foundation</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>STR advances live & scaling</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Risk engine v1.0 deployed</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Basic PMS API hooks</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Operations console</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-l-4 border-secondary p-8 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-bold text-sm">
                      6-12 MO
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">Expansion</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <Rocket className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span>Agent commission advances</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Rocket className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span>Deep PMS integrations (5+ partners)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Rocket className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span>Automated collections workflows</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Rocket className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span>Enhanced fraud controls</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-l-4 border-accent p-8 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold text-sm">
                      12-24 MO
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">Platform</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>Payment rails (ACH same-day)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>Card issuing capabilities</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>Multi-booking portfolio lines</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>Advanced analytics dashboard</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-primary/5 border border-primary/20 p-6 rounded-xl text-center">
                <p className="text-muted-foreground">
                  <strong>Strategic Note:</strong> Each step compounds distribution and data advantages—building moats at every layer
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Distribution Strategy */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Distribution: Own the Pipe</h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Multiple channels to avoid CAC arms races and capture the full value chain
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border hover-scale">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Direct</h3>
                  <p className="text-muted-foreground">Airbnb/STR groups, creator partnerships, host communities, and organic content</p>
                </div>

                <div className="bg-card p-6 rounded-xl border hover-scale">
                  <Building2 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Partnerships</h3>
                  <p className="text-muted-foreground">PMS/channel managers (Hostaway, Guesty, Lodgify), brokerages, and referral networks</p>
                </div>

                <div className="bg-card p-6 rounded-xl border hover-scale">
                  <Code className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">API Embedding</h3>
                  <p className="text-muted-foreground">White-label offers inside PMS platforms—REAP as infrastructure (rev-share model)</p>
                </div>

                <div className="bg-card p-6 rounded-xl border hover-scale">
                  <Repeat className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Referral Flywheel</h3>
                  <p className="text-muted-foreground">Give/Get bonus program for repeat advances—retention drives acquisition</p>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Strategic Focus</h4>
                    <p className="text-muted-foreground">
                      By owning PMS integrations, we become infrastructure—not just another vendor. 
                      This creates defensible distribution that compounds over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Team</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary p-8 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl">
                      ST
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Shaurav Taneja</h3>
                      <p className="text-muted-foreground">Founder & CEO</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    PM/fintech operations background with real estate operating experience. 
                    Built GTM playbooks for high-growth startups. Leading product, risk, and fundraising.
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold">Contact</p>
                    <p className="text-sm text-muted-foreground">taneja@reap.cash • +1 (646) 400-9444</p>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-xl border">
                  <h3 className="text-xl font-bold mb-6">Key Hires (Seed-Funded)</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Database className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold">CTO</h4>
                        <p className="text-sm text-muted-foreground">Risk/data infrastructure, Laravel/AWS, fintech underwriting experience</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold">Head of Risk</h4>
                        <p className="text-sm text-muted-foreground">Receivables underwriting, collections, facility management</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <GitBranch className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold">Operations Lead</h4>
                        <p className="text-sm text-muted-foreground">DocuSign workflows, servicing, collections automation</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border">
                <h4 className="font-bold mb-3">Advisors & Support</h4>
                <p className="text-muted-foreground">
                  Credit facility structuring, PMS distribution partnerships, regulatory compliance counsel. 
                  Seed allocates to 4-6 core team members with proven experience in fintech infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Model */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">18-Month Financial Model</h2>
              
              <div className="bg-card rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-bold">Metric</th>
                        <th className="text-right p-4 font-bold">Month 6</th>
                        <th className="text-right p-4 font-bold">Month 12</th>
                        <th className="text-right p-4 font-bold">Month 18</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-4 font-medium">Active hosts (monthly)</td>
                        <td className="p-4 text-right">120</td>
                        <td className="p-4 text-right">300</td>
                        <td className="p-4 text-right font-bold text-primary">420</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-4 font-medium">Advances per month</td>
                        <td className="p-4 text-right">180</td>
                        <td className="p-4 text-right">420</td>
                        <td className="p-4 text-right font-bold text-primary">600</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Average advance</td>
                        <td className="p-4 text-right">$9,800</td>
                        <td className="p-4 text-right">$10,100</td>
                        <td className="p-4 text-right font-bold text-primary">$10,300</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-4 font-medium">Monthly GMV advanced</td>
                        <td className="p-4 text-right">$1.8M</td>
                        <td className="p-4 text-right">$4.2M</td>
                        <td className="p-4 text-right font-bold text-primary">$6.2M</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Net platform margin</td>
                        <td className="p-4 text-right">3.1%</td>
                        <td className="p-4 text-right">3.2%</td>
                        <td className="p-4 text-right font-bold text-primary">3.4%</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-4 font-medium">Net revenue (monthly)</td>
                        <td className="p-4 text-right">$56k</td>
                        <td className="p-4 text-right">$134k</td>
                        <td className="p-4 text-right font-bold text-primary">$211k</td>
                      </tr>
                      <tr className="bg-primary/10 border-t-2 border-primary">
                        <td className="p-4 font-bold">Cumulative GMV</td>
                        <td className="p-4 text-right font-bold">$6.5M</td>
                        <td className="p-4 text-right font-bold">$24.5M</td>
                        <td className="p-4 text-right font-bold text-2xl text-primary">$45M</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 bg-primary/5 border border-primary/20 p-6 rounded-xl text-center">
                <p className="text-muted-foreground">
                  <strong>Conservative Ramp:</strong> Primary lever is facility utilization and repeat rate. 
                  Model assumes careful scaling to maintain loss ≤1.5%.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 18-Month Milestones */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Series A Readiness Milestones</h2>
              
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