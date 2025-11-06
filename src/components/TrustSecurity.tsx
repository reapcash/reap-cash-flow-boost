import { Shield } from "lucide-react";
const TrustSecurity = () => {
  return <section className="pt-24 pb-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-5xl lg:text-6xl mb-6">
            Secure. Compliant. Built for Professionals.
          </h2>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed normal-case">REAP operates on encrypted, compliant financial infrastructure. We partner with industry leaders like Stripe, DocuSign, and leading technology to keep your data safe and your transactions fast.</p>

        </div>
      </div>
    </section>;
};
export default TrustSecurity;