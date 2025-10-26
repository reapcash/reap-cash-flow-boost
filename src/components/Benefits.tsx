import { Clock, CreditCard, Calendar, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Fast Access to Funds",
    description: "Receive cash in 24 hours.",
  },
  {
    icon: CreditCard,
    title: "No Upfront Payments",
    description: "Repay only when you receive guest payments.",
  },
  {
    icon: Calendar,
    title: "Flexible Repayment Terms",
    description: "Repay in sync with your rental income.",
  },
  {
    icon: ShieldCheck,
    title: "Risk-Free Financing",
    description: "Pay back only if the booking goes through.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-section-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Why Reap Cash?
          </h2>
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
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70">
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
