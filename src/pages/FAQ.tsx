import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is REAP Cash?",
    answer: "REAP (Real Estate Advance Partners) provides cash advances on verified future income — such as pending Airbnb bookings or real-estate commissions. We're not a lender; we simply purchase a portion of your confirmed earnings at a transparent flat fee so you can access funds today."
  },
  {
    question: "How does the cash advance process work?",
    answer: "You sign up, connect your rental or real-estate account, and verify your future income. Once approved, REAP offers you an advance (up to 100% of confirmed earnings). You e-sign the agreement via DocuSign, and funds are transferred to your bank — typically within 24–48 hours."
  },
  {
    question: "Is this an advance or will it affect my credit score?",
    answer: "No. A REAP advance is not a traditional financial product and doesn't require a credit check that impacts your score. We're purchasing your future income at a discount. When your platform or brokerage pays you, that income automatically repays the advance."
  },
  {
    question: "How much does it cost?",
    answer: "Our fees are simple and transparent — usually 2% – 5% of the total amount advanced, depending on duration, market conditions, and risk factors. There are no hidden charges and no compounding interest. You always see the total cost upfront before you accept."
  },
  {
    question: "Who qualifies for REAP?",
    answer: "REAP is built for verified real-estate professionals, including: Airbnb or short-term rental hosts with confirmed bookings, real-estate agents with pending commission payouts, and property managers or contractors awaiting invoice payments. Eligibility requires a valid ID, connected bank account, and proof of future income."
  },
  {
    question: "Why should I choose REAP over other financing options?",
    answer: "Traditional banks don't understand real-estate cash flow — they lend based on credit, not future income. REAP focuses on what you've already earned, not your FICO score. Our process is fast, transparent, and tailored to real-estate professionals — giving you liquidity when you need it most."
  },
  {
    question: "Is my data safe with REAP Cash?",
    answer: "Absolutely. REAP uses bank-level encryption and secure tokenization to protect all personal and financial data. We never store your credentials — all bank and platform connections (like Airbnb or Plaid) use read-only access. Your identity documents and contracts are securely stored and encrypted in compliance with GDPR and U.S. data privacy laws."
  },
  {
    question: "How does repayment work?",
    answer: "Repayment happens automatically once your booking payout or commission payment clears. REAP monitors your connected account for the incoming funds, then securely pulls the agreed-upon amount via ACH. There's no need for manual payments or reminders — the system handles it seamlessly."
  },
  {
    question: "What happens if my booking is canceled or delayed?",
    answer: "If a booking is canceled or a payout is delayed, REAP works with you directly to adjust or reschedule repayment. Because we purchase your receivables (not lend), there are no late fees or penalties. We evaluate each case fairly to protect both your cash flow and REAP's capital."
  },
  {
    question: "Is REAP a financial institution?",
    answer: "No — REAP is not a bank or traditional financial institution. We operate as a receivables-purchase platform, meaning we advance funds based on income you've already earned through verified contracts or bookings. This model allows faster approvals, simplified terms, and zero impact on your credit score."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Find answers to common questions about REAP Cash and how we help real estate professionals access their earned income faster.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6 hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our team is here to help. Get in touch and we'll respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/auth?mode=signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
