import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoWeServe from "@/components/WhoWeServe";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import WhyReap from "@/components/WhyReap";
import Pricing from "@/components/Pricing";
import TrustSecurity from "@/components/TrustSecurity";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WhoWeServe />
        <Benefits />
        <Pricing />
        <TrustSecurity />
        <WhyReap />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
