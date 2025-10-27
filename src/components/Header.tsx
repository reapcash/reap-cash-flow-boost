import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Industries We Serve", href: "#industries" },
    { name: "Simulate Advance", href: "#simulate" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="relative group">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div>
                  <span className="text-2xl font-bold text-primary">REAP</span>
                  <span className="block text-xs text-muted-foreground">Real Estate Advance Partners</span>
                </div>
                {/* Dollar bills falling animation */}
                <div className="absolute -top-8 left-0 w-full overflow-hidden h-32 pointer-events-none">
                  <DollarSign className="absolute text-primary/30 w-4 h-4 animate-dollar-fall" style={{ left: "10%", animationDelay: "0s" }} />
                  <DollarSign className="absolute text-primary/30 w-4 h-4 animate-dollar-fall" style={{ left: "50%", animationDelay: "1s" }} />
                  <DollarSign className="absolute text-primary/30 w-4 h-4 animate-dollar-fall" style={{ left: "80%", animationDelay: "2s" }} />
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" asChild>
              <a href="#login">Login</a>
            </Button>
            <Button asChild>
              <a href="#apply">Apply Now</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="outline" asChild className="w-full">
                  <a href="#login">Login</a>
                </Button>
                <Button asChild className="w-full">
                  <a href="#apply">Apply Now</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
