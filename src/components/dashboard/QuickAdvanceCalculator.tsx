import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp } from 'lucide-react';

export default function QuickAdvanceCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [occupancyRate, setOccupancyRate] = useState<number>(75);
  
  const annualRevenue = monthlyRevenue * 12;
  const adjustedRevenue = annualRevenue * (occupancyRate / 100);
  const maxAdvance = adjustedRevenue * 0.7; // 70% advance rate
  const monthlyPayment = maxAdvance / 12;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Quick Advance Calculator</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">
        Estimate how much you could advance based on your property's revenue
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="monthly-revenue">Average Monthly Revenue</Label>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">$</span>
            <Input
              id="monthly-revenue"
              type="number"
              placeholder="5000"
              value={monthlyRevenue || ''}
              onChange={(e) => setMonthlyRevenue(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="occupancy">Expected Occupancy Rate (%)</Label>
          <Input
            id="occupancy"
            type="number"
            placeholder="75"
            min="0"
            max="100"
            value={occupancyRate}
            onChange={(e) => setOccupancyRate(parseFloat(e.target.value) || 0)}
            className="mt-1"
          />
        </div>

        {monthlyRevenue > 0 && (
          <div className="pt-4 border-t space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Annual Revenue</span>
              <span className="font-medium">${annualRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Adjusted for Occupancy</span>
              <span className="font-medium">${adjustedRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="font-semibold">Estimated Advance</span>
              </div>
              <span className="text-2xl font-bold text-primary">
                ${maxAdvance.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Payment (12 months)</span>
              <span className="font-medium">${monthlyPayment.toLocaleString()}</span>
            </div>
          </div>
        )}

        <Button 
          className="w-full mt-4" 
          onClick={() => window.location.href = '/application/new'}
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
}