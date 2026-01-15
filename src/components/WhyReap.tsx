import { Check, X } from "lucide-react";

const WhyReap = () => {
  const comparisons = [
    {
      traditional: "Lends against credit",
      reap: "Advances against verified income",
    },
    {
      traditional: "Separate for each niche",
      reap: "Unified for all real estate verticals",
    },
    {
      traditional: "Manual, slow underwriting",
      reap: "API-based verification",
    },
    {
      traditional: "Interest-based repayment",
      reap: "Transparent flat-fee model",
    },
    {
      traditional: "Bank-centric",
      reap: "Platform-centric (MLS, Airbnb, QuickBooks)",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            The REAP Difference
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            Not a Lender. A Cashflow Platform.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We purchase your verified future income at a transparent discount — no credit 
            checks, no compounding interest, no paperwork delays.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 bg-muted/50 border-b border-border">
              <div className="px-6 py-4 border-r border-border">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Traditional Finance
                </h3>
              </div>
              <div className="px-6 py-4">
                <h3 className="text-sm font-medium text-primary uppercase tracking-wide">
                  REAP's Model
                </h3>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border">
              {comparisons.map((item, index) => (
                <div key={index} className="grid grid-cols-2">
                  <div className="px-6 py-4 border-r border-border flex items-start gap-3">
                    <X className="w-4 h-4 text-destructive/60 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{item.traditional}</p>
                  </div>
                  <div className="px-6 py-4 bg-primary/5 flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground font-medium">{item.reap}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyReap;
