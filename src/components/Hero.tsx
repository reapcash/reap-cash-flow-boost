import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
const Hero = () => {
  return <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-Bleed Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-bg))] via-[hsl(var(--hero-bg-end))] to-[hsl(var(--hero-bg))] animate-gradient-shift bg-[length:200%_200%]">
        {/* Overlay Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-accent/10" />
        
        {/* Animated Wave Patterns */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(12)].map((_, i) => <div key={i} className="absolute h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-wave" style={{
            width: '150%',
            left: '-25%',
            top: `${i * 8}%`,
            animationDelay: `${i * 0.4}s`
          }} />)}
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-primary rounded-full animate-float" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.3}s`,
          animationDuration: `${3 + Math.random() * 2}s`
        }} />)}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-5xl mx-auto">
          {/* Main Content - Centered */}
          <div className="space-y-12 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-slide-up">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-sm text-white/90">Trusted by 500+ Real Estate Professionals</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold">
                <span className="text-white">Turn Your </span>
                <span className="block text-gradient-primary mt-2">Real Estate Income</span>
                <span className="text-white block mt-2">Into Instant Capital</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed normal-case px-4">
                Get instant cash advances on confirmed commissions, rentals, and payments. No waiting. No hassle. Just fast funding.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                size="lg" 
                className="text-lg px-10 py-7 bg-white text-secondary hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all animate-glow-pulse group" 
                asChild
              >
                <a href="/auth?mode=signup" className="flex items-center gap-2">
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-7 border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" 
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 pt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-white/70 normal-case">Get funded within 24 hours of approval</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Secure & Trusted</h3>
                <p className="text-white/70 normal-case">Bank-level security and full transparency</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Grow Your Business</h3>
                <p className="text-white/70 normal-case">Reinvest in opportunities without delay</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default Hero;