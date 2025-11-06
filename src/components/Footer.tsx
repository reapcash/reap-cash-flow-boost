import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    quickLinks: [{
      name: "Home",
      href: "#home"
    }, {
      name: "How It Works",
      href: "#how-it-works"
    }, {
      name: "Industries We Serve",
      href: "#industries"
    }, {
      name: "Apply Now",
      href: "/auth"
    }],
    resources: [{
      name: "FAQs",
      href: "#faqs"
    }, {
      name: "Contact",
      href: "/contact",
      isRoute: true
    }, {
      name: "Careers",
      href: "#careers"
    }],
    legal: [{
      name: "Terms of Service",
      href: "#terms"
    }, {
      name: "Privacy Policy",
      href: "#privacy"
    }]
  };
  const socialLinks = [{
    icon: Facebook,
    href: "#",
    label: "Facebook"
  }, {
    icon: Instagram,
    href: "#",
    label: "Instagram"
  }, {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn"
  }, {
    icon: Twitter,
    href: "https://x.com",
    label: "X (Twitter)"
  }];
  return <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-bold text-primary"><span className="text-primary">REAP</span>.CASH</span>
              <span className="block text-sm text-muted-foreground mt-1">Real Estate Advance Partners.com
support@<span className="text-primary">reap</span>.cash</span>
            </div>
            <p className="text-base text-muted-foreground max-w-xs normal-case leading-relaxed">
              Empowering professionals with smarter cash flow. Built in New York.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map(link => <li key={link.name}>
                  <a href={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors normal-case">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map(link => <li key={link.name}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors normal-case">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors normal-case">
                      {link.name}
                    </a>
                  )}
                </li>)}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => <li key={link.name}>
                  <a href={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors normal-case">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground normal-case">
            © 2025 <span className="text-primary">REAP</span> Cash. All rights reserved. Licensed financial technology provider.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map(social => {
            const Icon = social.icon;
            return <a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </a>;
          })}
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;