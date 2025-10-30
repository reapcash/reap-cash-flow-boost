import { Home, Building2, HardHat, Hotel, Briefcase } from "lucide-react";
import { useState } from "react";

const industries = [{
  icon: Home,
  title: "Real Estate Agents",
  value: "agents",
  description: "Unlock commission payouts early",
  challenge: "Commission payouts take 30–90 days",
  currentSolution: "Commission advance companies",
  problem: "High fees, outdated process, not tech-driven"
}, {
  icon: Building2,
  title: "Property Managers",
  value: "managers",
  description: "Advance on upcoming management fees",
  challenge: "Wait on monthly rent disbursements",
  currentSolution: "Credit cards / lines",
  problem: "High interest, not aligned to rental cycle"
}, {
  icon: HardHat,
  title: "Contractors",
  value: "contractors",
  description: "Get paid for progress before invoices clear",
  challenge: "Net-30/Net-60 invoice payments",
  currentSolution: "Factoring services",
  problem: "Complex, expensive, not built for small ops"
}, {
  icon: Hotel,
  title: "STR Hosts",
  value: "hosts",
  description: "Receive cash now for future bookings",
  challenge: "Delayed platform payouts",
  currentSolution: "Credit cards / short-term loans",
  problem: "Risky debt, credit-based approvals"
}, {
  icon: Briefcase,
  title: "Brokers / Developers",
  value: "developers",
  description: "Manage liquidity during project cycles",
  challenge: "Tied-up equity in projects",
  currentSolution: "Bank loans",
  problem: "Bureaucratic, slow underwriting"
}];
const WhoWeServe = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  return <section id="industries" className="pt-24 pb-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl mb-6">
            Built for Real Estate Professionals
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            As a real estate professional, you have future earnings on the way — but traditional financial infrastructure wasn't built around your unique cashflow. That's where <span className="text-primary font-semibold">REAP</span> comes in. We unlock your earned income so you can scale your operations to the next level. Our technology platform gives you access to your capital, on your terms.
          </p>
        </div>

        <div className="grid lg:grid-cols-[350px,1fr] gap-8 max-w-7xl mx-auto">
          {/* Industry Cards - Left Side */}
          <div className="space-y-4">
            {industries.map(industry => {
              const Icon = industry.icon;
              const isSelected = selectedIndustry.value === industry.value;
              return <button
                key={industry.value}
                onClick={() => setSelectedIndustry(industry)}
                className={`w-full bg-card border rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  isSelected ? 'border-primary bg-primary/5 shadow-lg' : 'border-border'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 ${
                    isSelected ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-primary'}`} />
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
            <h3 className="text-3xl lg:text-4xl mb-8">
              The Problem No One Else Solves
            </h3>
            
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 flex-shrink-0">
                  <span className="text-2xl">✨</span>
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