import { Button } from "@/components/ui/button";
import heroVisual from "@/assets/hero-visual.png";

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-bg))] to-[hsl(var(--hero-bg-end))]">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-wave"
              style={{
                width: '150%',
                left: '-25%',
                top: `${i * 12}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Turn your </span>
                <span className="text-gradient-primary">real estate income</span>
                <span className="text-white"> into </span>
                <span className="text-gradient-primary">instant capital</span>
              </h1>
              <p className="text-xl text-white/80 max-w-xl leading-relaxed">
                Access your earned income today. REAP provides real estate professionals with instant cash advances on confirmed commissions, rentals, and payments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-white text-secondary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all" 
                asChild
              >
                <a href="#apply">Apply Now</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" 
                asChild
              >
                <a href="#how-it-works">Start Building</a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-white/90">
                <div className="text-2xl font-bold">$5M+</div>
                <div className="text-sm text-white/60">Advanced</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-white/90">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/60">Professionals</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-white/90">
                <div className="text-2xl font-bold">24hrs</div>
                <div className="text-sm text-white/60">To Funding</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img
                src={heroVisual}
                alt="Modern fintech visualization for real estate professionals"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
