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

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
            Not a Lender. A Cashflow Platform.
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            <span className="text-primary">REAP</span> purchases your verified future income at a transparent discount — no credit checks, no compounding interest, no paperwork delays.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mb-20 overflow-x-auto px-4">
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg min-w-[600px]">
            <div className="grid grid-cols-2 bg-muted/50">
              <div className="px-4 sm:px-8 py-4 sm:py-6 border-r border-border">
                <h3 className="text-lg sm:text-xl md:text-2xl text-muted-foreground break-words">Traditional Finance</h3>
              </div>
              <div className="px-4 sm:px-8 py-4 sm:py-6">
                <h3 className="text-lg sm:text-xl md:text-2xl text-primary font-semibold break-words"><span className="text-primary">REAP</span>'s Model</h3>
              </div>
            </div>
            <div className="divide-y divide-border">
              {comparisons.map((item, index) => (
                <div key={index} className="grid grid-cols-2">
                  <div className="px-4 sm:px-8 py-4 sm:py-6 border-r border-border">
                    <p className="text-sm sm:text-base text-muted-foreground break-words">{item.traditional}</p>
                  </div>
                  <div className="px-4 sm:px-8 py-4 sm:py-6 bg-primary/5">
                    <p className="text-sm sm:text-base text-foreground font-medium break-words">{item.reap}</p>
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
