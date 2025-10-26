import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const CreatedByHosts = () => {
  return (
    <section className="py-20 bg-section-light">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary">
              Created by Hosts for Hosts
            </h2>
            <div className="space-y-4 text-lg text-foreground/80">
              <p>
                At Reap, we understand the challenges of unpredictable cash flows as a Real Estate professional. 
                We built Reap for short-term rental hosts because we are hosts ourselves.
              </p>
              <p>
                We've built this platform to help you unlock your future earnings today. 
                No more waiting, no more cash flow gaps.
              </p>
            </div>
            <Button size="lg" asChild>
              <a href="#apply">Ready to Experience the Difference? Get Started Today.</a>
            </Button>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-primary/10 rounded-3xl p-8 lg:p-12">
              <Users className="w-24 h-24 text-primary mb-6" />
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-secondary">
                  Built by Hosts Who Understand Your Needs
                </h3>
                <p className="text-foreground/70">
                  We've experienced the same cash flow challenges you face. That's why we created 
                  a solution that truly works for the short-term rental community.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Happy Hosts</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-3xl font-bold text-primary">$5M+</div>
                    <div className="text-sm text-muted-foreground">Advanced</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatedByHosts;
