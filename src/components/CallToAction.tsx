import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section id="apply" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold">
            Ready to Unlock Your Real Estate Earnings?
          </h2>
          <p className="text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto">
            Apply in minutes. Get approved in hours. Funded within 24.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-10 py-6 h-auto"
              asChild
            >
              <a href="#apply">Apply Now</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-10 py-6 h-auto border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a href="#simulate">Simulate My Advance</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
