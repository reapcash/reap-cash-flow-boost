import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section id="apply" className="py-20 sm:py-24 bg-[hsl(var(--hero-bg))]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white">
            Ready to Unlock Your Earnings?
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Apply in minutes. Get approved. Funded within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href="/auth?mode=signup" className="flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-white/20 bg-transparent text-white hover:bg-white/5"
              asChild
            >
              <a href="#simulate">Calculate Your Advance</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
