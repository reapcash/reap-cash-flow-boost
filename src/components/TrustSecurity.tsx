import { Shield } from "lucide-react";

const TrustSecurity = () => {
  return (
    <section className="py-20 bg-section-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Secure. Compliant. Built for Professionals.
          </h2>
          
          <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto">
            REAP operates on encrypted, compliant financial infrastructure. 
            We partner with industry leaders like Plaid, DocuSign, and HubSpot to keep your data safe and your transactions fast.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-secondary">Plaid</div>
            <div className="text-2xl font-bold text-secondary">DocuSign</div>
            <div className="text-2xl font-bold text-secondary">Experian</div>
            <div className="text-2xl font-bold text-secondary">AWS</div>
            <div className="text-2xl font-bold text-secondary">HubSpot</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSecurity;
