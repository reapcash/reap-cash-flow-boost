import { Button } from "@/components/ui/button";
import heroVisual from "@/assets/hero-visual.png";
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

      <div className="container mx-auto px-4 relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-5xl lg:text-6xl leading-tight">
                <span className="text-white">Turn your </span>
                <span className="text-gradient-primary">real estate income</span>
                <span className="text-white"> into </span>
                <span className="text-gradient-primary">instant capital</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-xl leading-relaxed normal-case">REAP provides real estate professionals with instant cash advances on confirmed commissions, rentals, and payments.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{
            animationDelay: '0.2s'
          }}>
              <Button size="lg" className="text-base px-8 bg-white text-secondary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all animate-glow-pulse" asChild>
                <a href="#apply">Apply Now</a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" asChild>
                <a href="#how-it-works">Contact Us</a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 animate-slide-up" style={{
            animationDelay: '0.4s'
          }}>
              <div className="text-white/90">
                <div className="text-2xl">$5M+</div>
                <div className="text-sm text-white/60 normal-case">Advanced</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-white/90">
                <div className="text-2xl">500+</div>
                <div className="text-sm text-white/60 normal-case">Professionals</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-white/90">
                <div className="text-2xl">24hrs</div>
                <div className="text-sm text-white/60 normal-case">To Funding</div>
              </div>
            </div>

            {/* Credibility Badges */}
            <div className="pt-8 animate-slide-up" style={{
            animationDelay: '0.6s'
          }}>
              <p className="text-sm text-white/60 normal-case mb-4">Trusted by professionals from</p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <span className="text-white font-semibold">Compass</span>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <span className="text-white font-semibold">eXp Realty</span>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <span className="text-white font-semibold">Keller Williams</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative">
              <img src={heroVisual} alt="Real estate professionals collaborating with property growth visualization" className="w-full h-auto object-contain drop-shadow-2xl" />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default Hero;