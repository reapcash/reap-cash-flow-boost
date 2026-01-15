import { Home, Building2, HardHat, Hotel, Briefcase, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import isoAgent from "@/assets/iso-agent.png";
import isoPropertyManager from "@/assets/iso-property-manager.png";
import isoContractor from "@/assets/iso-contractor.png";
import isoHost from "@/assets/iso-host.png";
import isoDeveloper from "@/assets/iso-developer.png";

const industries = [
  {
    icon: Home,
    image: isoAgent,
    title: "Real Estate Agents",
    value: "agents",
    description: "Unlock commission payouts early",
    sectionTitle: "Waiting 30-90 Days for Your Commission?",
    challenge: "Commission payouts take 30–90 days after closing, leaving agents strapped for cash despite closed deals.",
    currentSolution: "Commission advance companies",
    problem: "High fees (up to 12%), outdated paperwork processes, and no tech-driven transparency.",
  },
  {
    icon: Building2,
    image: isoPropertyManager,
    title: "Property Managers",
    value: "managers",
    description: "Advance on upcoming management fees",
    sectionTitle: "Stuck Waiting on Monthly Rent Cycles?",
    challenge: "Monthly management fees only arrive after tenant rent is collected and disbursed.",
    currentSolution: "Credit cards or business lines of credit",
    problem: "High interest rates and repayment schedules that don't align with your rental income cycle.",
  },
  {
    icon: HardHat,
    image: isoContractor,
    title: "Contractors",
    value: "contractors",
    description: "Get paid for progress before invoices clear",
    sectionTitle: "Tired of Net-30 and Net-60 Payment Terms?",
    challenge: "Contractors complete the work but wait 30-60+ days for invoice payments to clear.",
    currentSolution: "Invoice factoring services",
    problem: "Complex terms, expensive fees, and solutions not designed for smaller contracting operations.",
  },
  {
    icon: Hotel,
    image: isoHost,
    title: "STR Hosts",
    value: "hosts",
    description: "Receive cash now for future bookings",
    sectionTitle: "Platform Payouts Holding Up Your Operations?",
    challenge: "Short-term rental platforms delay payouts until after guest checkout, creating cashflow gaps.",
    currentSolution: "Credit cards or short-term business loans",
    problem: "Risky debt accumulation and credit-based approvals that don't reflect your booking income.",
  },
  {
    icon: Briefcase,
    image: isoDeveloper,
    title: "Brokers / Developers",
    value: "developers",
    description: "Manage liquidity during project cycles",
    sectionTitle: "Capital Tied Up in Long Development Cycles?",
    challenge: "Equity and capital remain locked in projects throughout lengthy development and sales cycles.",
    currentSolution: "Traditional bank loans and bridge financing",
    problem: "Bureaucratic approval processes, slow underwriting, and rigid terms that don't match project timelines.",
  },
];

const WhoWeServe = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  return (
    <section id="industries" className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            Who We Serve
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            Built for Real Estate Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We unlock your earned income so you can scale your operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px,1fr] gap-8 max-w-6xl mx-auto">
          {/* Industry Cards - Left Side */}
          <div className="space-y-3">
            {industries.map((industry) => {
              const isSelected = selectedIndustry.value === industry.value;
              return (
                <button
                  key={industry.value}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`w-full bg-card border rounded-lg p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={industry.image}
                        alt={industry.title}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base font-medium ${
                          isSelected ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {industry.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details - Right Side */}
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-4 mb-8">
              <h3 className="text-2xl sm:text-3xl font-display text-foreground">
                {selectedIndustry.sectionTitle}
              </h3>
              <img
                src={selectedIndustry.image}
                alt={selectedIndustry.title}
                className="w-20 h-20 object-contain opacity-60 hidden sm:block"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-destructive uppercase tracking-wide">
                    The Challenge
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedIndustry.challenge}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Current "Solution"
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedIndustry.currentSolution}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-destructive uppercase tracking-wide">
                    The Problem
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedIndustry.problem}
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2 text-primary">
                    REAP Solves This
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get instant access to your earned income with transparent, tech-driven advances.
                    No hidden fees, no credit checks, no bureaucracy — just fast capital aligned to
                    your real estate cashflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#simulate"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Find Out What You Qualify For →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
