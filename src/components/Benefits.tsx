import { Zap, CreditCard, DollarSign, RefreshCw } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Instant Liquidity",
    description: "Get paid the day you earn — not 30-90 days later.",
  },
  {
    icon: CreditCard,
    title: "No Credit Checks",
    description: "Approvals based on verified income, not credit scores.",
  },
  {
    icon: DollarSign,
    title: "Transparent Fees",
    description: "Simple flat fees. No compounding interest or hidden charges.",
  },
  {
    icon: RefreshCw,
    title: "Auto Repayment",
    description: "Settles automatically when your income arrives.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 px-4">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            Why Choose REAP
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            Built Different
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We connect to your income sources, verify payments, and advance you cash today — 
            settling automatically when income arrives.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="mb-5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-display text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
