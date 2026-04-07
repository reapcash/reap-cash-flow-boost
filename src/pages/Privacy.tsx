import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: April 7, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Real Estate Advance Partners ("REAP," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your personal information when you use the REAP platform. By using our services, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Identity Information:</strong> Full name, email address, phone number, government-issued ID, and professional credentials.</li>
              <li><strong className="text-foreground">Financial Information:</strong> Bank account details (last 4 digits), mortgage information, income history, booking revenue data, and commission records.</li>
              <li><strong className="text-foreground">Property Information:</strong> Property addresses, ownership status, property type, occupancy rates, and booking platform connections.</li>
              <li><strong className="text-foreground">Platform Data:</strong> Data synced from connected platforms such as Airbnb, VRBO, or brokerage systems, including booking calendars and payout history.</li>
              <li><strong className="text-foreground">Device &amp; Usage Data:</strong> IP address, browser type, device identifiers, pages visited, and interaction patterns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To verify your identity and eligibility for advances</li>
              <li>To underwrite and process receivables purchase transactions</li>
              <li>To manage repayment tracking and account servicing</li>
              <li>To communicate with you about your account, applications, and advance status</li>
              <li>To improve our platform, products, and user experience</li>
              <li>To comply with legal and regulatory obligations</li>
              <li>To detect and prevent fraud or unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. SMS &amp; Phone Communications</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you provide a phone number, we may use it to send transactional SMS messages (advance status updates, repayment reminders, verification codes) and, with your consent, promotional communications about new features or products. You may opt out of promotional messages at any time by replying STOP or contacting support@reap.cash. Standard message and data rates may apply. We do not sell your phone number to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Sharing &amp; Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Service Providers:</strong> Third-party vendors who assist with identity verification, payment processing, data analytics, and platform infrastructure.</li>
              <li><strong className="text-foreground">Platform Partners:</strong> Booking platforms and brokerage systems you authorize us to connect with for receivable verification.</li>
              <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request.</li>
              <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including encryption in transit (TLS) and at rest, access controls, audit logging, and regular security assessments. While we take reasonable steps to protect your data, no method of electronic transmission or storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. Financial records related to advances are retained for a minimum of seven years as required by applicable regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. You may also have the right to object to or restrict certain processing activities. To exercise these rights, contact us at{' '}
              <a href="mailto:support@reap.cash" className="text-primary hover:underline">support@reap.cash</a>.
              We will respond to valid requests within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Cookies &amp; Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar technologies to maintain your session, remember preferences, and analyze platform usage. You can manage cookie preferences through your browser settings, though disabling cookies may affect platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the "Last updated" date. Continued use of the platform after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related inquiries, contact us at{' '}
              <a href="mailto:support@reap.cash" className="text-primary hover:underline">support@reap.cash</a>.
            </p>
          </section>

          <p className="text-xs text-muted-foreground border-t pt-6 mt-8">
            This document is a placeholder and does not constitute legal advice. REAP recommends consulting with a qualified attorney before finalizing any privacy policy.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
