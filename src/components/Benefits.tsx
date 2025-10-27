import { Zap, DollarSign, Brain, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Fast Access to Capital",
    description: "Get approved and funded within 24 hours.",
  },
  {
    icon: DollarSign,
    title: "Transparent Fees",
    description: "Simple pricing, no hidden costs, no compounding interest.",
  },
  {
    icon: Brain,
    title: "Smart Risk Engine",
    description: "We assess verified earnings, not your credit history.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Platform",
    description: "Designed for the future of real estate — agents, hosts, contractors, developers.",
  },
];

const Benefits = () => {
  return (
    <section className="pt-24 pb-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl mb-6">
            Why Choose REAP
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Designed to keep you liquid, growing, and in control — not waiting for payouts.
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
