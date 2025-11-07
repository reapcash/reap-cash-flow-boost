import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface DeveloperSectionProps {
  form: UseFormReturn<any>;
}

const DeveloperSection = ({ form }: DeveloperSectionProps) => {
  const projectTypes = [
    { id: 'residential_single', label: 'Single-Family Residential' },
    { id: 'residential_multi', label: 'Multi-Family Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'mixed_use', label: 'Mixed-Use' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'land_development', label: 'Land Development' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Developer Information</h3>
        <div className="space-y-4">
          {/* Company Information */}
          <FormField
            control={form.control}
            name="developerCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Development Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Skyline Development Group LLC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="developerLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Developer License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="DL-123456" {...field} />
                  </FormControl>
                  <FormDescription>If applicable in your state</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Development Experience *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="12" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Project Types */}
          <FormField
            control={form.control}
            name="developmentTypes"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Development Specialties *</FormLabel>
                  <FormDescription>
                    Select all that apply
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectTypes.map((type) => (
                    <FormField
                      key={type.id}
                      control={form.control}
                      name="developmentTypes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={type.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(type.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), type.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== type.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {type.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Active Projects */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Active Development Projects</h4>
            
            <FormField
              control={form.control}
              name="numberOfActiveProjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Active Projects *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      placeholder="3" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalProjectValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Active Project Value ($) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="5000000.00" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Combined estimated value of all active projects</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectsSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projects Summary *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your active projects: locations, types, stages of completion, total units/square footage, and estimated completion dates..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include project names, locations, sizes, and current status
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pre-Sales & Future Revenue */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Pre-Sales & Future Income</h4>
            
            <FormField
              control={form.control}
              name="numberOfPreSaleContracts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Pre-Sale Contracts *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="15" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Signed contracts for units/properties not yet completed</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalPreSaleValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Pre-Sale Value ($) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="3500000.00" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Total value of all pre-sale contracts</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedClosingTimeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Closing Timeline *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under_90">Under 90 days</SelectItem>
                      <SelectItem value="90_180">90-180 days</SelectItem>
                      <SelectItem value="180_365">6-12 months</SelectItem>
                      <SelectItem value="over_365">Over 12 months</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>When pre-sales are expected to close</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preSaleContractsSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pre-Sale Contracts Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your pre-sale contracts: unit numbers, sale prices, deposit amounts, and expected closing dates..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Financing & Track Record */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Financing & Track Record</h4>
            
            <FormField
              control={form.control}
              name="currentFinancingArrangements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Financing Arrangements *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your current financing: construction loans, private equity, JV partners, and total capital secured..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="completedProjectsLast5Years"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completed Projects (Last 5 Years)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="8" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Number of successfully completed projects</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalCompletedProjectValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Completed Project Value ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="15000000.00" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Combined value of projects completed in last 5 years</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperSection;
