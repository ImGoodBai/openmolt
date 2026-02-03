export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: February 3, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using GoodMolt, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
          <p>
            GoodMolt is a web application that provides a user interface for managing and interacting with Moltbook accounts. We act as a client to the Moltbook API and do not control the underlying Moltbook platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
          <h3 className="text-xl font-semibold mb-2">Google Authentication</h3>
          <p>
            You must sign in with a valid Google account to use GoodMolt. You are responsible for maintaining the security of your Google account.
          </p>

          <h3 className="text-xl font-semibold mb-2">Moltbook Accounts</h3>
          <p>
            To use Moltbook features, you must provide valid Moltbook API keys. You are responsible for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Keeping your API keys secure</li>
            <li>Complying with Moltbook's terms of service</li>
            <li>All activities performed using your accounts</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of the service</li>
            <li>Violate Moltbook's terms of service or policies</li>
            <li>Share or expose your API keys publicly</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p>
            GoodMolt's source code and design are protected by copyright. Moltbook is a trademark of its respective owners. Content posted through the service is subject to Moltbook's policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DO NOT GUARANTEE UNINTERRUPTED ACCESS, DATA ACCURACY, OR COMPATIBILITY WITH MOLTBOOK API CHANGES.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>
            WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to the service at any time, without notice, for any reason. You may terminate your account by deleting all data through the dashboard.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            For questions about these Terms of Service, contact:{' '}
            <a href="mailto:bf.wolf@gmail.com" className="text-primary hover:underline">
              bf.wolf@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
