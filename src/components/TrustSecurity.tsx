import { Shield } from "lucide-react";

const TrustSecurity = () => {
  return (
    <section className="pt-24 pb-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-5xl lg:text-6xl mb-6">
            Bank-Grade Security. Regulatory Compliance. Enterprise Infrastructure.
          </h2>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed normal-case">
            REAP maintains institutional-grade security protocols and regulatory compliance standards. 
            Our infrastructure partners include Plaid, DocuSign, and AWS, ensuring encrypted transactions and comprehensive data protection.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl text-secondary normal-case">Plaid</div>
            <div className="text-2xl text-secondary normal-case">DocuSign</div>
            <div className="text-2xl text-secondary normal-case">Experian</div>
            <div className="text-2xl text-secondary normal-case">AWS</div>
            <div className="text-2xl text-secondary normal-case">HubSpot</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSecurity;
