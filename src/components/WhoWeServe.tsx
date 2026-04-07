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
  currentSolution: "Credit cards or short-term financing",
  problem: "Risky obligations and credit-based approvals that don't reflect your booking income."
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
  return <section id="industries" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6">
            Built for Real Estate Professionals
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We unlock your earned income so you can scale your operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px,1fr] xl:grid-cols-[350px,1fr] gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Industry Cards - Left Side */}
          <div className="space-y-3 lg:space-y-4">
            {industries.map(industry => {
            const Icon = industry.icon;
            const isSelected = selectedIndustry.value === industry.value;
            return <button key={industry.value} onClick={() => setSelectedIndustry(industry)} className={`w-full bg-card border rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${isSelected ? 'border-primary bg-primary/5 shadow-lg' : 'border-border'}`}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <img src={industry.image} alt={industry.title} className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base sm:text-lg mb-0.5 sm:mb-1 font-semibold ${isSelected ? 'text-primary' : ''}`}>
                      {industry.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </button>;
          })}
          </div>

          {/* Details - Right Side */}
          <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 xl:p-12">
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-8 mb-6 sm:mb-8">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl break-words">
                  {selectedIndustry.sectionTitle}
                </h3>
              </div>
              <div className="hidden sm:block flex-shrink-0">
                <img src={selectedIndustry.image} alt={selectedIndustry.title} className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain opacity-80 transition-all duration-300" />
              </div>
            </div>
            
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-destructive/10 flex-shrink-0">
                    <span className="text-base sm:text-xl">⚠️</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-destructive">The Challenge</h4>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-0 sm:pl-13">
                  {selectedIndustry.challenge}
                </p>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex-shrink-0">
                    <span className="text-base sm:text-xl">🏦</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold">Current "Solution"</h4>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-0 sm:pl-13">
                  {selectedIndustry.currentSolution}
                </p>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-destructive/10 flex-shrink-0">
                    <span className="text-base sm:text-xl">❌</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-destructive">Problem With It</h4>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-0 sm:pl-13">
                  {selectedIndustry.problem}
                </p>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 p-5 sm:p-6 bg-primary/10 rounded-xl border border-primary/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2 text-primary">
                    <span className="text-primary font-bold">REAP</span> Solves This
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Get instant access to your earned income with transparent, tech-driven advances. 
                    No hidden fees, no credit checks, no bureaucracy — just fast capital aligned to your real estate cashflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-10 px-4">
          <a href="#simulate" className="inline-block text-primary font-semibold hover:underline text-base sm:text-lg">
            Find Out What You Qualify For →
          </a>
        </div>
      </div>
    </section>;
};
export default WhoWeServe;