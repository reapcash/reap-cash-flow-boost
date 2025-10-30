import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { differenceInDays } from "date-fns";
import { TrendingUp, ArrowRight, DollarSign, Calculator } from "lucide-react";

const Pricing = () => {
  const [payoutAmount, setPayoutAmount] = useState(15000);
  const [payoutDate, setPayoutDate] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [calculatedFee, setCalculatedFee] = useState<number>(0);
  const [calculatedAdvance, setCalculatedAdvance] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    if (payoutAmount > 0 && payoutDate) {
      const today = new Date();
      const payoutDateObj = new Date(payoutDate);
      const daysUntilPayout = differenceInDays(payoutDateObj, today);
      
      if (daysUntilPayout > 0) {
        // Fee formula: payoutAmount * 0.11% per day * days
        let fee = payoutAmount * 0.0011 * daysUntilPayout;
        
        // Ensure minimum fee of $45
        fee = Math.max(fee, 45);
        
        const advance = payoutAmount - fee;
        
        setCalculatedFee(fee);
        setCalculatedAdvance(advance > 0 ? advance : 0);
        setShowResults(true);
      } else {
        setCalculatedFee(0);
        setCalculatedAdvance(0);
        setShowResults(false);
      }
    }
  };

  const hasValidInputs = payoutAmount > 0 && payoutDate;
  const hasResults = showResults && calculatedAdvance > 0;

  return (
    <>
      <section id="simulate" className="pt-24 pb-28 bg-muted relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl lg:text-6xl mb-6">
                Estimate Your Advance
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                See exactly how much cash you can unlock today. Adjust the inputs and watch your advance update in real-time.
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-xl">
              {/* Live Results Display - Top */}
              {hasResults && (
                <div className="mb-10 p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 animate-scale-in">
                  <div className="flex items-center gap-2 mb-6">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <h3 className="text-xl text-muted-foreground normal-case">Your Advance Breakdown</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-card/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2 normal-case">Expected Payout</p>
                      <p className="text-3xl font-bold">${payoutAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-card/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2 normal-case">Fee</p>
                      <p className="text-3xl font-bold text-destructive">-${calculatedFee.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-xl border-2 border-primary">
                      <p className="text-sm text-primary mb-2 normal-case font-semibold">Cash to You Today</p>
                      <p className="text-4xl font-bold text-primary">${calculatedAdvance.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Controls */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl">
                    Adjust Your Details
                  </h3>
                </div>

                {/* All Inputs in Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Payout Amount */}
                  <div className="space-y-3">
                    <Label htmlFor="amount-slider" className="text-base">Payout Amount</Label>
                    <div className="space-y-2">
                      <div className="text-xl font-bold text-primary">
                        ${payoutAmount.toLocaleString()}
                      </div>
                      <Slider
                        id="amount-slider"
                        min={1000}
                        max={100000}
                        step={1000}
                        value={[payoutAmount]}
                        onValueChange={(value) => setPayoutAmount(value[0])}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$1K</span>
                        <span>$100K</span>
                      </div>
                    </div>
                  </div>

                  {/* Payout Date */}
                  <div className="space-y-3">
                    <Label htmlFor="date" className="text-base">Payout Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={payoutDate}
                      onChange={(e) => setPayoutDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Industry Type */}
                  <div className="space-y-3">
                    <Label htmlFor="industry" className="text-base">Industry Type</Label>
                    <Select value={industryType} onValueChange={setIndustryType}>
                      <SelectTrigger id="industry" className="h-12 text-base">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agent">Real Estate Agent</SelectItem>
                        <SelectItem value="str">STR Host</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                        <SelectItem value="manager">Property Manager</SelectItem>
                        <SelectItem value="broker">Broker/Developer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={handleCalculate}
                    disabled={!hasValidInputs}
                    className="h-14 px-12 text-lg font-semibold"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate My Advance
                  </Button>
                </div>

                {/* Results Display */}
                {hasResults && (
                  <div className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 animate-scale-in">
                    <div className="flex items-center gap-2 mb-6">
                      <DollarSign className="w-6 h-6 text-primary" />
                      <h3 className="text-xl text-muted-foreground normal-case">Your Advance Breakdown</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-card/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-2 normal-case">Expected Payout</p>
                        <p className="text-3xl font-bold">${payoutAmount.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-card/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-2 normal-case">Fee</p>
                        <p className="text-3xl font-bold text-destructive">-${calculatedFee.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-xl border-2 border-primary">
                        <p className="text-sm text-primary mb-2 normal-case font-semibold">Cash to You Today</p>
                        <p className="text-4xl font-bold text-primary">${calculatedAdvance.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fee Structure Info */}
              <div className="border-t border-border pt-8 mt-10">
                <h4 className="text-lg mb-4">How Our Fees Work</h4>
                <ul className="space-y-3 text-base text-muted-foreground normal-case">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Daily rate: 0.11% per day until payout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Minimum fee: $45</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>No hidden charges or surprise fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Automatic repayment when you receive your payout</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Apply Now Button */}
      {hasResults && (
        <div className="fixed bottom-8 right-8 z-50 animate-scale-in">
          <Button 
            size="lg"
            className="h-16 px-8 text-lg shadow-2xl animate-glow-pulse bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            asChild
          >
            <a href="#apply" className="flex items-center gap-3">
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      )}
    </>
  );
};

export default Pricing;
