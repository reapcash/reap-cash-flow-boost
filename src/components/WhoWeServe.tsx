import { Home, Building2, HardHat, Hotel, Briefcase } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        <Tabs defaultValue="agents" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto mb-8">
            {industries.map(industry => {
              const Icon = industry.icon;
              return <TabsTrigger 
                key={industry.value} 
                value={industry.value}
                className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary/10"
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs lg:text-sm">{industry.title}</span>
              </TabsTrigger>;
            })}
          </TabsList>

          {industries.map(industry => (
            <TabsContent key={industry.value} value={industry.value} className="mt-0">
              <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
                <h3 className="text-3xl lg:text-4xl mb-8 text-center">
                  The Problem No One Else Solves
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-2">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <h4 className="text-xl font-semibold text-destructive">The Challenge</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {industry.challenge}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-2">
                      <span className="text-2xl">🏦</span>
                    </div>
                    <h4 className="text-xl font-semibold">Current "Solution"</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {industry.currentSolution}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-2">
                      <span className="text-2xl">❌</span>
                    </div>
                    <h4 className="text-xl font-semibold text-destructive">Problem With It</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {industry.problem}
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
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-10">
          <a href="#simulate" className="inline-block text-primary font-semibold hover:underline text-lg">
            Find Out What You Qualify For →
          </a>
        </div>
      </div>
    </section>;
};
export default WhoWeServe;