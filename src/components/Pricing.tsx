import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

const Pricing = () => {
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutDate, setPayoutDate] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [creditTier, setCreditTier] = useState("");
  const [calculatedFee, setCalculatedFee] = useState<number | null>(null);
  const [calculatedAdvance, setCalculatedAdvance] = useState<number | null>(null);

  const calculateAdvance = () => {
    const value = parseFloat(payoutAmount);
    if (!isNaN(value) && value > 0) {
      // Fee structure: 2% - 5% (using average of 3.5% for demo)
      const feeRate = 0.035;
      const fee = value * feeRate;
      const advance = value - fee;
      
      setCalculatedFee(fee);
      setCalculatedAdvance(advance);
    }
  };

  return (
    <section id="simulate" className="py-20 bg-section-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
              Estimate Your Advance
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Enter your upcoming income, payout date, and see how much you can unlock today.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 lg:p-12">
            <div className="space-y-8">
              {/* Calculator */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-secondary">
                    Calculate Your Advance
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="payout">Expected Payout ($)</Label>
                    <Input
                      id="payout"
                      type="number"
                      placeholder="10000"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Payout Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={payoutDate}
                      onChange={(e) => setPayoutDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry Type</Label>
                    <Select value={industryType} onValueChange={setIndustryType}>
                      <SelectTrigger id="industry" className="mt-2">
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

                  <div>
                    <Label htmlFor="credit">Credit Tier (Optional)</Label>
                    <Select value={creditTier} onValueChange={setCreditTier}>
                      <SelectTrigger id="credit" className="mt-2">
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent (750+)</SelectItem>
                        <SelectItem value="good">Good (700-749)</SelectItem>
                        <SelectItem value="fair">Fair (650-699)</SelectItem>
                        <SelectItem value="building">Building (below 650)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={calculateAdvance} 
                  className="w-full"
                  size="lg"
                >
                  Calculate My Advance
                </Button>

                {calculatedAdvance !== null && calculatedFee !== null && (
                  <div className="mt-6 p-6 bg-primary/10 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Expected Payout:</span>
                      <span className="font-bold text-xl">
                        ${parseFloat(payoutAmount).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Fee Range (2-5%):</span>
                      <span className="font-bold text-xl text-muted-foreground">
                        -${calculatedFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Net Cash Today:</span>
                        <span className="font-bold text-3xl text-primary">
                          ${calculatedAdvance.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" size="lg" asChild>
                      <a href="#apply">Apply Now</a>
                    </Button>
                  </div>
                )}
              </div>

              {/* Fee Structure Info */}
              <div className="border-t border-border pt-8">
                <h4 className="font-bold text-lg mb-4">Fee Structure</h4>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Fee structure: 2% - 5% of the total booking value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>No hidden charges or surprise fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Repayment automatically deducted when you receive guest payment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
