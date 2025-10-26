import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator } from "lucide-react";

const Pricing = () => {
  const [bookingValue, setBookingValue] = useState("");
  const [calculatedFee, setCalculatedFee] = useState<number | null>(null);
  const [calculatedAdvance, setCalculatedAdvance] = useState<number | null>(null);

  const calculateAdvance = () => {
    const value = parseFloat(bookingValue);
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
              Transparent, No-Surprise Pricing
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Get up to 100% of your confirmed booking value. Our fees are simple and transparent.
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

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Booking Value ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter your booking value"
                      value={bookingValue}
                      onChange={(e) => setBookingValue(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <Button 
                    onClick={calculateAdvance} 
                    className="w-full"
                    size="lg"
                  >
                    Calculate My Advance
                  </Button>
                </div>

                {calculatedAdvance !== null && calculatedFee !== null && (
                  <div className="mt-8 p-6 bg-primary/10 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Booking Value:</span>
                      <span className="font-bold text-xl">
                        ${parseFloat(bookingValue).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Our Fee (2-5%):</span>
                      <span className="font-bold text-xl text-muted-foreground">
                        -${calculatedFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">You Receive:</span>
                        <span className="font-bold text-3xl text-primary">
                          ${calculatedAdvance.toFixed(2)}
                        </span>
                      </div>
                    </div>
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
