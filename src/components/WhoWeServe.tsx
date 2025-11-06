import { Home, Building2, HardHat, Hotel, Briefcase, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import isoGrowth from "@/assets/iso-growth.png";
import isoAgent from "@/assets/iso-agent.png";
import isoPropertyManager from "@/assets/iso-property-manager.png";
import isoContractor from "@/assets/iso-contractor.png";
import isoHost from "@/assets/iso-host.png";
import isoDeveloper from "@/assets/iso-developer.png";
const industries = [{
  icon: Home,
  image: isoAgent,
  title: "Real Estate Agents",
  value: "agents",
  description: "Unlock commission payouts early",
  sectionTitle: "Waiting 30-90 Days for Your Commission?",
  challenge: "Commission payouts take 30–90 days after closing, leaving agents strapped for cash despite closed deals.",
  currentSolution: "Commission advance companies",
  problem: "High fees (up to 12%), outdated paperwork processes, and no tech-driven transparency."
}, {
  icon: Building2,
  image: isoPropertyManager,
  title: "Property Managers",
  value: "managers",
  description: "Advance on upcoming management fees",
  sectionTitle: "Stuck Waiting on Monthly Rent Cycles?",
  challenge: "Monthly management fees only arrive after tenant rent is collected and disbursed.",
  currentSolution: "Credit cards or business lines of credit",
  problem: "High interest rates and repayment schedules that don't align with your rental income cycle."
}, {
  icon: HardHat,
  image: isoContractor,
  title: "Contractors",
  value: "contractors",
  description: "Get paid for progress before invoices clear",
  sectionTitle: "Tired of Net-30 and Net-60 Payment Terms?",
  challenge: "Contractors complete the work but wait 30-60+ days for invoice payments to clear.",
  currentSolution: "Invoice factoring services",
  problem: "Complex terms, expensive fees, and solutions not designed for smaller contracting operations."
}, {
  icon: Hotel,
  image: isoHost,
  title: "STR Hosts",
  value: "hosts",
  description: "Receive cash now for future bookings",
  sectionTitle: "Platform Payouts Holding Up Your Operations?",
  challenge: "Short-term rental platforms delay payouts until after guest checkout, creating cashflow gaps.",
  currentSolution: "Credit cards or short-term business loans",
  problem: "Risky debt accumulation and credit-based approvals that don't reflect your booking income."
}, {
  icon: Briefcase,
  image: isoDeveloper,
  title: "Brokers / Developers",
  value: "developers",
  description: "Manage liquidity during project cycles",
  sectionTitle: "Capital Tied Up in Long Development Cycles?",
  challenge: "Equity and capital remain locked in projects throughout lengthy development and sales cycles.",
  currentSolution: "Traditional bank loans and bridge financing",
  problem: "Bureaucratic approval processes, slow underwriting, and rigid terms that don't match project timelines."
}];
const WhoWeServe = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  return <section id="industries" className="pt-24 pb-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl mb-6">
            Built for Real Estate Professionals
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">We unlock your earned income so you can scale your operations<span className="text-primary font-semibold">REAP</span> comes in. We unlock your earned income so you can scale your operations to the next level. Our technology platform gives you access to your capital, on your terms.
          </p>
        </div>

        <div className="grid lg:grid-cols-[350px,1fr] gap-8 max-w-7xl mx-auto">
          {/* Industry Cards - Left Side */}
          <div className="space-y-4">
            {industries.map(industry => {
            const Icon = industry.icon;
            const isSelected = selectedIndustry.value === industry.value;
            return <button key={industry.value} onClick={() => setSelectedIndustry(industry)} className={`w-full bg-card border rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${isSelected ? 'border-primary bg-primary/5 shadow-lg' : 'border-border'}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img src={industry.image} alt={industry.title} className="w-16 h-16 object-contain" />
                  </div>
                  <div>
                    <h3 className={`text-lg mb-1 font-semibold ${isSelected ? 'text-primary' : ''}`}>
                      {industry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </button>;
          })}
          </div>

          {/* Details - Right Side */}
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
            <div className="flex items-start gap-8 mb-8">
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl">
                  {selectedIndustry.sectionTitle}
                </h3>
              </div>
              <div className="hidden lg:block flex-shrink-0">
                <img src={selectedIndustry.image} alt={selectedIndustry.title} className="w-32 h-auto object-contain opacity-80 transition-all duration-300" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-destructive/10">
                    <span className="text-xl">⚠️</span>
                  </div>
                  <h4 className="text-xl font-semibold text-destructive">The Challenge</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-13">
                  {selectedIndustry.challenge}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                    <span className="text-xl">🏦</span>
                  </div>
                  <h4 className="text-xl font-semibold">Current "Solution"</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-13">
                  {selectedIndustry.currentSolution}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-destructive/10">
                    <span className="text-xl">❌</span>
                  </div>
                  <h4 className="text-xl font-semibold text-destructive">Problem With It</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-13">
                  {selectedIndustry.problem}
                </p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-primary/10 rounded-xl border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-primary">
                    <span className="text-primary font-bold">REAP</span> Solves This
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Get instant access to your earned income with transparent, tech-driven advances. 
                    No hidden fees, no credit checks, no bureaucracy — just fast capital aligned to your real estate cashflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="#simulate" className="inline-block text-primary font-semibold hover:underline text-lg">
            Find Out What You Qualify For →
          </a>
        </div>
      </div>
    </section>;
};
export default WhoWeServe;