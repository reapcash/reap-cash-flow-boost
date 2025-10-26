import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-b from-hero-bg to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                Unlock Your Earnings
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Get instant cash advances on your confirmed rental bookings and take control of your cash flow today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="#apply">Apply Now</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Short-term rental host managing bookings"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient for better text visibility if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
            </div>
            
            {/* Floating animation element */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl animate-float">
              <div className="text-center">
                <div className="text-3xl font-bold">24hrs</div>
                <div className="text-sm">Instant Funding</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
