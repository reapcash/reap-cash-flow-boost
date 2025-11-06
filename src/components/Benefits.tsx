import { Zap, DollarSign, Brain, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Instant Liquidity",
    description: "Get paid the day you earn — not 30-90 days later.",
  },
  {
    icon: Brain,
    title: "Credit Independent",
    description: "Approvals based on verified income, not credit scores.",
  },
  {
    icon: DollarSign,
    title: "No Compounding Interest",
    description: "Transparent flat fees. We purchase income, we don't lend.",
  },
  {
    icon: TrendingUp,
    title: "Automated Repayment",
    description: "Settles automatically when your income arrives.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl mb-6">
            What <span className="text-primary">REAP</span> Does Differently
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span className="text-primary">REAP</span> connects to your income sources, verifies upcoming payments, and advances you cash today — settling automatically when income arrives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-card rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl mb-4">
                  {benefit.title}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground normal-case leading-relaxed">
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
