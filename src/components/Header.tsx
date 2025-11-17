import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{
    name: "Home",
    href: "#home"
  }, {
    name: "Simulate Advance",
    href: "#simulate"
  }, {
    name: "FAQs",
    href: "/faq",
    isRoute: true
  }, {
    name: "Blog",
    href: "/blog",
    isRoute: true
  }, {
    name: "Contact Us",
    href: "/contact",
    isRoute: true
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="relative group flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div>
                  <span className="text-lg sm:text-xl md:text-2xl text-primary normal-case break-words"><span className="text-primary">REAP</span>.CASH</span>
                  <span className="block text-xs text-muted-foreground normal-case hidden sm:block">Real Estate Advance Partners</span>
                </div>
                {/* Dollar bills falling animation */}
                <div className="absolute -top-8 left-0 w-full overflow-hidden h-32 pointer-events-none">
                  <DollarSign className="absolute text-primary/30 w-4 h-4 animate-dollar-fall" style={{
                  left: "10%",
                  animationDelay: "0s"
                }} />
                  <DollarSign className="absolute text-primary/30 w-4 h-4 animate-dollar-fall" style={{
                  left: "50%",
                  animationDelay: "1s"
                }} />
                  <DollarSign className="absolute text-primary/30 w-4 h-4 animate-dollar-fall" style={{
                  left: "80%",
                  animationDelay: "2s"
                }} />
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => link.isRoute ? <Link key={link.name} to={link.href} className="text-foreground hover:text-primary transition-colors normal-case">
                  {link.name}
                </Link> : <a key={link.name} href={link.href} className="text-foreground hover:text-primary transition-colors normal-case">
                  {link.name}
                </a>)}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Button variant="ghost" asChild className="hidden xl:flex">
              
            </Button>
            <Button variant="ghost" asChild size="sm" className="text-sm">
              <Link to="/seed-investment">Investor Portal</Link>
            </Button>
            <Button variant="outline" asChild size="sm" className="text-sm">
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild size="sm" className="text-sm">
              <a href="/auth?mode=signup">Apply Now</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 -mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="lg:hidden py-4 border-t border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="flex flex-col gap-3">
              {navLinks.map(link => link.isRoute ? <Link key={link.name} to={link.href} className="text-foreground hover:text-primary transition-colors py-2.5 px-2 text-base normal-case rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </Link> : <a key={link.name} href={link.href} className="text-foreground hover:text-primary transition-colors py-2.5 px-2 text-base normal-case rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </a>)}
              <div className="flex flex-col gap-2.5 pt-4 mt-2 border-t border-border">
                <Button variant="ghost" asChild className="w-full justify-start h-11 text-base">
                  <Link to="/investors" onClick={() => setIsMenuOpen(false)}>Investors</Link>
                </Button>
                <Button variant="ghost" asChild className="w-full justify-start h-11 text-base">
                  <Link to="/seed-investment" onClick={() => setIsMenuOpen(false)}>Seed Round</Link>
                </Button>
                <Button variant="outline" asChild className="w-full h-11 text-base">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="w-full h-11 text-base">
                  <a href="/auth?mode=signup" onClick={() => setIsMenuOpen(false)}>Apply Now</a>
                </Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;