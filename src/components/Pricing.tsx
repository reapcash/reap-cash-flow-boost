import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { differenceInDays } from "date-fns";
import { ArrowRight, Calculator } from "lucide-react";

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
        let fee = payoutAmount * 0.0011 * daysUntilPayout;
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
      <section id="simulate" className="py-20 sm:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
                Advance Calculator
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Estimate Your Advance
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See exactly how much cash you can unlock today.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-10">
              <div className="space-y-8">
                {/* Inputs Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Payout Amount */}
                  <div className="space-y-3 sm:col-span-2 md:col-span-1">
                    <Label htmlFor="amount-input" className="text-sm font-medium">
                      Payout Amount
                    </Label>
                    <div className="space-y-3">
                      <Input
                        id="amount-input"
                        type="number"
                        min={1000}
                        max={100000}
                        step={1000}
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(Number(e.target.value))}
                        className="h-11"
                        placeholder="Enter amount"
                      />
                      <Slider
                        id="amount-slider"
                        min={1000}
                        max={100000}
                        step={1000}
                        value={[payoutAmount]}
                        onValueChange={(value) => setPayoutAmount(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$1K</span>
                        <span>$100K</span>
                      </div>
                    </div>
                  </div>

                  {/* Payout Date */}
                  <div className="space-y-3">
                    <Label htmlFor="date" className="text-sm font-medium">
                      Payout Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={payoutDate}
                      onChange={(e) => setPayoutDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="h-11"
                    />
                  </div>

                  {/* Industry Type */}
                  <div className="space-y-3">
                    <Label htmlFor="industry" className="text-sm font-medium">
                      Industry Type
                    </Label>
                    <Select value={industryType} onValueChange={setIndustryType}>
                      <SelectTrigger id="industry" className="h-11">
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
                    className="h-12 px-8"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Advance
                  </Button>
                </div>

                {/* Results Display */}
                {hasResults && (
                  <div className="p-6 sm:p-8 bg-[hsl(var(--hero-bg))] rounded-xl text-white">
                    <div className="text-center">
                      <p className="text-sm text-white/60 mb-2">Your Advance Amount</p>
                      <p className="text-4xl sm:text-5xl font-display text-white mb-4">
                        ${calculatedAdvance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <div className="flex justify-center gap-8 text-sm">
                        <div>
                          <p className="text-white/50">Expected Payout</p>
                          <p className="text-white font-medium">${payoutAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-white/50">Fee</p>
                          <p className="text-white font-medium">
                            ${calculatedFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fee Structure Info */}
              <div className="border-t border-border pt-8 mt-10">
                <h4 className="text-base font-medium mb-4">Why Choose REAP</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Ultra-low fees — Less than 0.12% per day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Complete transparency — No hidden charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Effortless repayment — Automatic when you receive your payout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Built for your business — Designed for real estate professionals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Apply Now Button */}
      {hasResults && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button size="lg" className="h-14 px-6 shadow-lg" asChild>
            <a href="/auth?mode=signup" className="flex items-center gap-2">
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      )}
    </>
  );
};

export default Pricing;
