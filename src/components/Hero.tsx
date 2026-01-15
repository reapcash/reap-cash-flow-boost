import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(var(--hero-bg))]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-bg))] via-[hsl(var(--hero-bg-end))] to-[hsl(var(--hero-bg))]" />
      
      {/* Subtle grid pattern for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(0 0% 100% / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-32 sm:py-40">
        <div className="max-w-4xl mx-auto">
          {/* Main Content - Centered */}
          <div className="space-y-8 text-center">
            {/* Trust Badge */}
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Trusted by 500+ Real Estate Professionals
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6 animate-fade-up-delay-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white">
                Turn Your Future Income
                <span className="block text-gradient-primary mt-2">Into Capital Today</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Get instant cash advances on confirmed commissions, rentals, and payments. 
                No credit checks. No waiting. Funded within 24 hours.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-2">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 h-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all group" 
                asChild
              >
                <a href="/auth?mode=signup" className="flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6 h-auto border border-white/20 bg-transparent text-white hover:bg-white/5" 
                asChild
              >
                <a href="#simulate">Calculate Your Advance</a>
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16 max-w-2xl mx-auto animate-fade-up-delay-3">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-display text-white mb-1">24h</p>
                <p className="text-sm text-white/50">Funding Time</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-3xl sm:text-4xl font-display text-white mb-1">0.11%</p>
                <p className="text-sm text-white/50">Daily Fee</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-display text-white mb-1">$50M+</p>
                <p className="text-sm text-white/50">Advanced</p>
              </div>
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
