import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: April 7, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") govern your use of the REAP platform operated by Real Estate Advance Partners ("REAP," "we," "us," or "our"). By accessing or using our platform, you agree to be bound by these Terms. REAP is a financial technology company that facilitates the purchase of verified future receivables — we are not a bank, lender, or licensed financial institution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How Advances Work</h2>
            <p className="text-muted-foreground leading-relaxed">
              REAP purchases a portion of your verified future income (such as confirmed bookings, pending commissions, or approved invoices) at a discount. This is a receivables purchase transaction, not a loan. You receive funds upfront, and repayment occurs automatically as your future income is realized. Each advance is subject to eligibility verification, underwriting review, and final approval by REAP.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Advance Fees &amp; Repayment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Each advance carries a transparent flat fee disclosed before you accept. There are no compounding interest charges. Repayment is structured as a percentage of your incoming revenue until the total repayment amount (advance + fee) is satisfied. Repayment terms (weekly, bi-weekly, or monthly) are agreed upon at the time of advance approval. Failure to meet repayment obligations may result in collection actions and restrictions on future advances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Eligibility &amp; User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 18 years old and a legal resident of the United States. You represent that all information provided — including income data, property details, booking records, and financial documents — is accurate and complete. You agree to promptly notify REAP of any material changes to your income, bookings, or financial status. Providing false or misleading information may result in immediate termination of your account and repayment acceleration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. SMS &amp; Phone Communications Consent</h2>
            <p className="text-muted-foreground leading-relaxed">
              By providing your phone number, you consent to receive SMS messages, phone calls, and notifications from REAP related to your account, applications, advance status, and repayment reminders. Message and data rates may apply. You may opt out of non-essential communications at any time by contacting support@reap.cash, though transactional messages related to active advances may still be sent as required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Data &amp; Document Verification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You authorize REAP to verify the information you provide, including connecting to third-party platforms (such as Airbnb, VRBO, or brokerage systems) to confirm booking data, income history, and receivable validity. You also authorize REAP to request and review financial documents, property records, and identity verification as part of the underwriting process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Account Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              REAP reserves the right to suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or failure to meet repayment obligations. Outstanding advance balances remain due and payable upon termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              REAP provides its platform "as is" without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the fees paid by you in the twelve months preceding any claim. This section shall survive termination of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:support@reap.cash" className="text-primary hover:underline">support@reap.cash</a>.
            </p>
          </section>

          <p className="text-xs text-muted-foreground border-t pt-6 mt-8">
            This document is a placeholder and does not constitute legal advice. REAP recommends consulting with a qualified attorney before finalizing any terms of service.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
