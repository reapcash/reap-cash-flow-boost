import { FileText, CheckCircle, Wallet } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Connect Your Income",
    description: "Securely link your platform (MLS, Airbnb, or invoices) and verify upcoming payouts.",
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "Get Your Offer",
    description: "Our system calculates your eligible advance based on verified earnings and risk score.",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Receive Your Funds",
    description: "Sign electronically, and funds are deposited to your bank within 24 hours.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="pt-24 pb-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl mb-6">
            How REAP Works in 3 Simple Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative group"
              >
                <div className="bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:scale-105">
                  {/* Step Number */}
                  <div className="text-primary/20 text-6xl font-black mb-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl mb-4">
                    {step.title}
                  </h3>
                  <p className="text-base lg:text-lg text-muted-foreground normal-case leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-primary/30" />
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-primary/30 border-b-4 border-b-transparent" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
