import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Investors = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Investor Relations</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Partner with REAP to unlock the potential of short-term rental financing
            </p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Investment Opportunity</h2>
                <p className="text-muted-foreground">
                  REAP provides innovative financing solutions to short-term rental property owners. 
                  Our platform connects investors with high-quality STR properties, offering attractive 
                  returns backed by future booking revenues.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Why Invest with REAP?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="text-xl font-semibold mb-2">Secured Returns</h3>
                    <p className="text-muted-foreground">
                      Investments backed by verified booking revenues and property assets
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="text-xl font-semibold mb-2">Diversified Portfolio</h3>
                    <p className="text-muted-foreground">
                      Spread risk across multiple properties and markets
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="text-xl font-semibold mb-2">Transparent Process</h3>
                    <p className="text-muted-foreground">
                      Full visibility into property performance and repayment status
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="text-xl font-semibold mb-2">Automated Management</h3>
                    <p className="text-muted-foreground">
                      Platform handles all collections and investor distributions
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
                <p className="text-muted-foreground mb-6">
                  Interested in learning more about investment opportunities with REAP? 
                  Contact our investor relations team.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Investor Relations
                </a>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investors;