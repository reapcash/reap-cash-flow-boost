import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section id="apply" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold">
            Ready to Unlock Your Future Earnings?
          </h2>
          <p className="text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto">
            Join hundreds of hosts who are taking control of their cash flow today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-10 py-6 h-auto"
            >
              Apply Now
            </Button>
            <p className="text-sm opacity-75">
              Get approved in minutes • Funds in 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
