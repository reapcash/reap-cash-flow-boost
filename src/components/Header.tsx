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
    name: "Contact Us",
    href: "/contact",
    isRoute: true
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="relative group">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div>
                  <span className="text-xl sm:text-2xl text-primary normal-case break-words"><span className="text-primary">REAP</span>.CASH</span>
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
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => link.isRoute ? <Link key={link.name} to={link.href} className="text-foreground hover:text-primary transition-colors normal-case">
                  {link.name}
                </Link> : <a key={link.name} href={link.href} className="text-foreground hover:text-primary transition-colors normal-case">
                  {link.name}
                </a>)}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" asChild>
              
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/seed-investment">Investor Portal</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild>
              <a href="/auth?mode=signup">Apply Now</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => link.isRoute ? <Link key={link.name} to={link.href} className="text-foreground hover:text-primary transition-colors py-2 normal-case" onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </Link> : <a key={link.name} href={link.href} className="text-foreground hover:text-primary transition-colors py-2 normal-case" onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </a>)}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" asChild className="w-full">
                  <Link to="/investors">Investors</Link>
                </Button>
                <Button variant="ghost" asChild className="w-full">
                  <Link to="/seed-investment">Seed Round</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <a href="/auth?mode=signup">Apply Now</a>
                </Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;