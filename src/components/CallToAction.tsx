import { Button } from "@/components/ui/button";
const CallToAction = () => {
  return <section id="apply" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Ready to Unlock Your Real Estate Earnings?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed normal-case">Apply in minutes. Get approved. Funded within a day.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-base px-10 py-6 h-auto" asChild>
              <a href="/auth?mode=signup">Apply Now</a>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-10 py-6 h-auto border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
              <a href="#simulate">Simulate My Advance</a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default CallToAction;