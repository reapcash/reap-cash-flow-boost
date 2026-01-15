import isoConnect from "@/assets/iso-connect.png";
import isoApproval from "@/assets/iso-approval.png";
import isoFunding from "@/assets/iso-funding.png";

const steps = [
  {
    number: "01",
    image: isoConnect,
    title: "Connect Your Income",
    description: "Securely link your platform (MLS, Airbnb, or invoices) and verify upcoming payouts.",
  },
  {
    number: "02",
    image: isoApproval,
    title: "Get Your Offer",
    description: "Our system calculates your eligible advance based on verified earnings and risk score.",
  },
  {
    number: "03",
    image: isoFunding,
    title: "Receive Your Funds",
    description: "Sign electronically, and funds are deposited to your bank within 24 hours.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="bg-card border border-border rounded-xl p-8 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                {/* Step Number */}
                <div className="text-6xl font-display text-primary/10 mb-4">
                  {step.number}
                </div>

                {/* Isometric Image */}
                <div className="mb-6 flex justify-center">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-px bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
