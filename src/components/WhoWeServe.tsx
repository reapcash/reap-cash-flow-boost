import { Home, Building2, HardHat, Hotel, Briefcase } from "lucide-react";

const industries = [
  {
    icon: Home,
    title: "Real Estate Agents",
    description: "Unlock commission payouts early",
  },
  {
    icon: Building2,
    title: "Property Managers",
    description: "Advance on upcoming management fees",
  },
  {
    icon: HardHat,
    title: "Contractors",
    description: "Get paid for progress before invoices clear",
  },
  {
    icon: Hotel,
    title: "STR Hosts",
    description: "Receive cash now for future bookings",
  },
  {
    icon: Briefcase,
    title: "Brokers / Developers",
    description: "Manage liquidity during project cycles",
  },
];

const WhoWeServe = () => {
  return (
    <section id="industries" className="pt-24 pb-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl mb-6">
            Built for Real Estate Professionals
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            REAP powers cash flow for everyone who earns from real estate — not just investors or agents. 
            Our technology provides fast access to capital for anyone earning from property-related income.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.title}
                className="bg-card border border-border rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg mb-2">
                  {industry.title}
                </h3>
                <p className="text-sm text-muted-foreground normal-case">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a 
            href="#simulate"
            className="inline-block text-primary font-semibold hover:underline"
          >
            Find Out What You Qualify For →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
