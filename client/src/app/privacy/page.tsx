import React from "react";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - JobPortal",
  description: "Privacy policy detailing data collection, processing, and protection on the JobPortal platform.",
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
            <Lock className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Effective Date: January 1, 2026. Last updated: October 2026.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed bg-zinc-900/30 border border-zinc-800/80 rounded-lg p-6 sm:p-10">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white tracking-tight">
            1. Information We Collect
          </h2>
          <p>
            JobPortal collects personal information necessary to deliver talent recruitment and role-based platform services:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Account Credentials:</strong> Name, verified email address, hashed passwords (bcrypt with cost factor 12), and optional contact telephone numbers.
            </li>
            <li>
              <strong className="text-zinc-200">Candidate Profiles:</strong> Resumes, employment histories, educational credentials, and portfolio links uploaded during application processes.
            </li>
            <li>
              <strong className="text-zinc-200">Employer Information:</strong> Legal company entity name, operational website, industry categorization, corporate headquarters, and company size.
            </li>
            <li>
              <strong className="text-zinc-200">Technical Telemetry:</strong> IP addresses, HTTP headers, session tokens, and authentication timestamps recorded to safeguard multi-tenant tenant isolation.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white tracking-tight">
            2. Purpose of Data Processing
          </h2>
          <p>
            Your information is processed for specific, transparent purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>Facilitating direct job applications between candidates and verified hiring organizations.</li>
            <li>Enforcing enterprise authentication and secure session revocation.</li>
            <li>Dispatching time-sensitive one-time verification passcodes (OTP) for account verification and password resets.</li>
            <li>Performing platform verification reviews to eliminate fraudulent corporate profiles and spam requisitions.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white tracking-tight">
            3. Third-Party Sub-processors
          </h2>
          <p>
            We partner with enterprise infrastructure providers bound by rigorous data protection agreements:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Neon Cloud PostgreSQL:</strong> Encrypted persistent relational database hosting with TLS 1.3 in transit and AES-256 at rest.
            </li>
            <li>
              <strong className="text-zinc-200">Resend:</strong> Transactional email distribution for cryptographic OTP delivery and system notifications.
            </li>
          </ul>
          <p>
            We do not sell, rent, or monetize your personal data to advertisement brokers or data aggregators.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white tracking-tight">
            4. Session Security and Cookie Policy
          </h2>
          <p>
            JobPortal uses JSON Web Tokens (JWT) signed with HMAC-SHA256 for authenticated API requests. Client-side authentication tokens are stored locally solely to preserve session continuity and are immediately purged upon user sign-out or session invalidation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white tracking-tight">
            5. User Rights and Data Deletion
          </h2>
          <p>
            Every user retains the right to inspect, correct, or request permanent deletion of their account records and uploaded candidate documentation. To request account deletion or data portability, contact platform administration through authenticated channels.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white tracking-tight">
            6. Changes to this Privacy Policy
          </h2>
          <p>
            Material updates to our privacy practices will be announced on this page with a revised effective date. Continued use of the platform after updates indicates acknowledgment of the revised terms.
          </p>
        </section>
      </div>
    </div>
  );
}
