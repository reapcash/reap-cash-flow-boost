import { Shield, Zap, Link, TrendingUp, Database, Users } from "lucide-react";

const WhyReap = () => {
  const comparisons = [
    {
      traditional: "Lends against credit",
      reap: "Advances against verified income"
    },
    {
      traditional: "Separate for each niche",
      reap: "Unified for all real estate verticals"
    },
    {
      traditional: "Manual, slow underwriting",
      reap: "API-based verification"
    },
    {
      traditional: "Interest-based repayment",
      reap: "Transparent flat-fee model"
    },
    {
      traditional: "Bank-centric",
      reap: "Platform-centric (MLS, Airbnb, QuickBooks)"
    }
  ];

  const barriers = [
    {
      icon: Link,
      title: "Cross-Vertical Integration",
      description: "Connects to Airbnb, MLS, and QuickBooks together"
    },
    {
      icon: Shield,
      title: "Receivables Model",
      description: "Avoids lending hurdles through receivables purchases"
    },
    {
      icon: Zap,
      title: "Fintech Infrastructure",
      description: "API-driven with Plaid, DocuSign, and HubSpot"
    },
    {
      icon: Users,
      title: "Real Estate Specialization",
      description: "Built for commission, escrow, and booking cycles"
    }
  ];

  return (
    <section className="pt-24 pb-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-5xl lg:text-6xl mb-6">
            Not a Lender. A Cashflow Platform.
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            <span className="text-primary">REAP</span> purchases your verified future income at a transparent discount — no credit checks, no compounding interest, no paperwork delays.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
            <div className="grid grid-cols-2 bg-muted/50">
              <div className="px-8 py-6 border-r border-border">
                <h3 className="text-2xl text-muted-foreground">Traditional Finance</h3>
              </div>
              <div className="px-8 py-6">
                <h3 className="text-2xl text-primary font-semibold"><span className="text-primary">REAP</span>'s Model</h3>
              </div>
            </div>
            <div className="divide-y divide-border">
              {comparisons.map((item, index) => (
                <div key={index} className="grid grid-cols-2">
                  <div className="px-8 py-6 border-r border-border">
                    <p className="text-muted-foreground">{item.traditional}</p>
                  </div>
                  <div className="px-8 py-6 bg-primary/5">
                    <p className="text-foreground font-medium">{item.reap}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitive Barriers */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl mb-4">Built to Last</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span className="text-primary">REAP</span>'s infrastructure creates a moat competitors can't easily replicate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {barriers.map((barrier) => {
              const Icon = barrier.icon;
              return (
                <div
                  key={barrier.title}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{barrier.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {barrier.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyReap;
