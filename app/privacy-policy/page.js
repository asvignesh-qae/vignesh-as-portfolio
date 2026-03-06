export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for vignesh-as.dev — how your personal data is collected, used, and protected.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://vignesh-as.dev/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-16 text-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <p className="font-medium mb-3 text-[#16f2b3] text-xl uppercase">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#a0a8c0] mb-10">
          Last updated: 6 March 2026
        </p>

        <div className="flex flex-col gap-10 text-[#d3d8e8] leading-relaxed">

          {/* 1. Controller */}
          <section aria-labelledby="section-controller">
            <h2
              id="section-controller"
              className="text-xl font-semibold text-white mb-3 border-l-4 border-[#16f2b3] pl-3"
            >
              1. Data Controller
            </h2>
            <p>
              The data controller for this website is:
            </p>
            <address className="not-italic mt-3 bg-[#10172d] border border-[#353a52] rounded-lg p-4 text-sm leading-7">
              <strong className="text-white">Vignesh Ambalam Suresh</strong>
              <br />
              Budapest, Hungary
              <br />
              Email:{" "}
              <a
                href="mailto:asvignesh.qae@gmail.com"
                className="text-[#16f2b3] underline"
              >
                asvignesh.qae@gmail.com
              </a>
            </address>
            <p className="mt-3 text-sm">
              This site operates as a personal portfolio and is not a registered
              business. For all data-related requests, please contact the email
              address above.
            </p>
          </section>

          {/* 2. What data we collect */}
          <section aria-labelledby="section-data-collected">
            <h2
              id="section-data-collected"
              className="text-xl font-semibold text-white mb-3 border-l-4 border-[#16f2b3] pl-3"
            >
              2. What Personal Data We Collect
            </h2>
            <p className="mb-3">
              We only collect personal data that you voluntarily provide through
              the contact form:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
              <li>
                <strong className="text-white">Full name</strong> — to address
                you in correspondence.
              </li>
              <li>
                <strong className="text-white">Email address</strong> — to send
                you a reply.
              </li>
              <li>
                <strong className="text-white">Message content</strong> — the
                inquiry or message you write.
              </li>
            </ul>
            <p className="mt-3 text-sm">
              We do <strong className="text-white">not</strong> collect
              sensitive personal data (as defined in Article 9 GDPR), financial
              information, or data from minors. We do not build user profiles or
              engage in automated decision-making.
            </p>
          </section>

          {/* 3. Purpose and legal basis */}
          <section aria-labelledby="section-purpose">
            <h2
              id="section-purpose"
              className="text-xl font-semibold text-white mb-3 border-l-4 border-[#16f2b3] pl-3"
            >
              3. Purpose and Legal Basis for Processing
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-[#353a52] rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#10172d] text-white">
                    <th className="text-left px-4 py-3 font-semibold border-b border-[#353a52]">
                      Purpose
                    </th>
                    <th className="text-left px-4 py-3 font-semibold border-b border-[#353a52]">
                      Legal Basis (GDPR Art. 6)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#353a52]">
                    <td className="px-4 py-3">
                      Responding to your contact form inquiry
                    </td>
                    <td className="px-4 py-3">
                      Art. 6(1)(a) — <em>Consent</em> (given via the consent
                      checkbox)
                    </td>
                  </tr>
                  <tr className="border-b border-[#353a52]">
                    <td className="px-4 py-3">
                      Website performance monitoring &amp; analytics
                    </td>
                    <td className="px-4 py-3">
                      Art. 6(1)(f) — <em>Legitimate interest</em> (ensuring
                      site reliability)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      Marketing / behavioural analytics via cookies (GTM)
                    </td>
                    <td className="px-4 py-3">
                      Art. 6(1)(a) — <em>Consent</em> (cookie banner)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Third-party processors */}
          <section aria-labelledby="section-processors">
            <h2
              id="section-processors"
              className="text-xl font-semibold text-white mb-3 border-l-4 border-[#16f2b3] pl-3"
            >
              4. Third-Party Processors
            </h2>
            <p className="mb-4 text-sm">
              Your contact form data is delivered via the following sub-processors.
              Each processor handles data only for the purposes stated and under
              appropriate data-processing agreements or standard contractual
              clauses.
            </p>
            <div className="flex flex-col gap-4">

              <div className="bg-[#10172d] border border-[#353a52] rounded-lg p-4 text-sm">
                <p className="text-white font-semibold mb-1">
                  Google Gmail / SMTP (Nodemailer)
                </p>
                <p>
                  Contact form submissions are forwarded to the data
                  controller&apos;s Gmail inbox. Your name, email, and message
                  are included in the email. Google acts as a processor under
                  Google&apos;s Workspace Data Processing Amendment.
                </p>
                <p className="mt-1 text-[#a0a8c0]">
                  Provider: Google LLC, USA. Transfer mechanism: EU Standard
                  Contractual Clauses.
                </p>
              </div>

              <div className="bg-[#10172d] border border-[#353a52] rounded-lg p-4 text-sm">
                <p className="text-white font-semibold mb-1">
                  Telegram Bot API
                </p>
                <p>
                  A real-time notification containing your name, email, and
                  message is sent to a private Telegram chat. No data is stored
                  by this service beyond the message delivery period.
                </p>
                <p className="mt-1 text-[#a0a8c0]">
                  Provider: Telegram FZ-LLC, UAE / Dubai. Review{" "}
                  <a
                    href="https://telegram.org/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#16f2b3] underline"
                  >
                    Telegram&apos;s Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="bg-[#10172d] border border-[#353a52] rounded-lg p-4 text-sm">
                <p className="text-white font-semibold mb-1">
                  Vercel (Hosting, Analytics &amp; Speed Insights)
                </p>
                <p>
                  This site is hosted on Vercel. Vercel Analytics and Speed
                  Insights collect anonymised, aggregated page-view and
                  performance data. No cookies are set; IP addresses are not
                  stored in identifiable form.
                </p>
                <p className="mt-1 text-[#a0a8c0]">
                  Provider: Vercel Inc., USA. Transfer mechanism: EU Standard
                  Contractual Clauses.{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#16f2b3] underline"
                  >
                    Vercel Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="bg-[#10172d] border border-[#353a52] rounded-lg p-4 text-sm">
                <p className="text-white font-semibold mb-1">
                  Google Tag Manager &amp; Google Analytics (optional, consent-based)
                </p>
                <p>
                  Google Tag Manager is loaded <strong className="text-white">only if you accept cookies</strong>{" "}
                  via the cookie consent banner. If accepted, GTM may set
                  cookies and collect usage data. You can withdraw consent at
                  any time by clearing your browser cookies or declining via the
                  banner.
                </p>
                <p className="mt-1 text-[#a0a8c0]">
                  Provider: Google LLC, USA. Transfer mechanism: EU Standard
                  Contractual Clauses.{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#16f2b3] underline"
                  >
                    Google Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="bg-[#10172d] border border-[#353a52] rounded-lg p-4 text-sm">
                <p className="text-white font-semibold mb-1">
                  Google Fonts (Next.js / self-hosted)
                </p>
                <p>
                  This site uses the Inter typeface loaded via Next.js&apos;s
                  font optimisation, which downloads and self-hosts font files
                  at build time. No requests are made to Google&apos;s servers
                  at runtime.
                </p>
              </div>

            </div>
          </section>

          {/* 5. Data retention */}
          <section aria-labelledby="section-retention">
            <h2
              id="section-retention"
              className="text-xl font-semibold text-white mb-3 border-l-4 border-[#16f2b3] pl-3"
            >
              5. Data Retention
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
              <li>
                <strong className="text-white">Contact form data</strong>{" "}
                (name, email, message): retained in the Gmail inbox for a
                maximum of <strong className="text-white">90 days</strong> after
                the inquiry is resolved, then permanently deleted.
              </li>
              <li>
                <strong className="text-white">Telegram notifications</strong>:
                messages are deleted from the private Telegram chat within{" "}
                <strong className="text-white">30 days</strong>.
              </li>
              <li>
                <strong className="text-white">Vercel analytics data</strong>:
                retained per Vercel&apos;s own retention policy (aggregated,
                anonymised — typically 30–90 days of raw events).
              </li>
              <li>
                <strong className="text-white">Cookie consent preference</strong>:
                stored in your browser&apos;s{" "}
                <code className="bg-[#1a2240] px-1 rounded text-xs">
                  localStorage
                </code>{" "}
                for 365 days, then re-asked.
              </li>
            </ul>
          </section>

          {/* 6. Cookies */}
          <section aria-labelledby="section-cookies">
            <h2
              id="section-cookies"
              className="text-xl font-semibold text-white mb-3 border-l-4 border-[#16f2b3] pl-3"
            >
              6. Cookies and Tracking Technologies
            </h2>
            <p className="mb-3 text-sm">
              We distinguish between cookies that are strictly necessary for the
              site to function and optional analytics/marketing cookies.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-[#353a52] rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#10172d] text-white">
                    <th className="text-left px-4 py-3 font-semibold border-b border-[#353a52]">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 font-semibold border-b border-[#353a52]">
                      Examples
                    </th>
                    <th className="text-left px-4 py-3 font-semibold border-b border-[#353a52]">
                      Consent required?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#353a52]">
                    <td className="px-4 py-3">Strictly necessary</td>
                    <td className="px-4 py-3">None (this site has no login / session cookies)</td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr className="border-b border-[#353a52]">
                    <td className="px-4 py-3">Performance / Analytics</td>
                    <td className="px-4 py-3">
                      Vercel Analytics (cookie-free, anonymised)
                    </td>
                    <td className="px-4 py-3">No (legitimate interest)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Marketing / Tracking</td>
                    <td className="px-4 py-3">Google Tag Manager, GA4</td>
                    <td className="px-4 py-3">Yes — cookie banner required</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              You can manage or withdraw your cookie consent at any time through
              the cookie banner at the bottom of this page, or by clearing your
              browser&apos;s local storage for this domain.
            </p>
          </section>

          {/* 7. Your rights */}
          <section aria-labelledby="section-rights">
            <h2
              id="section-rights"
              className="text-xl font-semibold text-white mb-3 border-l-4 border-[#16f2b3] pl-3"
            >
              7. Your Rights Under GDPR
            </h2>
            <p className="mb-3 text-sm">
              As a data subject in the EEA, you have the following rights under
              the General Data Protection Regulation (EU) 2016/679:
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex gap-2">
                <span className="text-[#16f2b3] font-bold shrink-0">&#8594;</span>
                <span>
                  <strong className="text-white">Right of access</strong> (Art. 15) — you may request a copy of any personal data held about you.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#16f2b3] font-bold shrink-0">&#8594;</span>
                <span>
                  <strong className="text-white">Right to rectification</strong> (Art. 16) — you may request correction of inaccurate data.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#16f2b3] font-bold shrink-0">&#8594;</span>
                <span>
                  <strong className="text-white">Right to erasure</strong> (Art. 17) — you may request deletion of your data at any time.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#16f2b3] font-bold shrink-0">&#8594;</span>
                <span>
                  <strong className="text-white">Right to restriction of processing</strong> (Art. 18) — you may request that processing be limited.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#16f2b3] font-bold shrink-0">&#8594;</span>
                <span>
                  <strong className="text-white">Right to data portability</strong> (Art. 20) — you may request your data in a machine-readable format.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#16f2b3] font-bold shrink-0">&#8594;</span>
                <span>
                  <strong className="text-white">Right to object</strong> (Art. 21) — you may object to processing based on legitimate interest.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#16f2b3] font-bold shrink-0">&#8594;</span>
                <span>
                  <strong className="text-white">Right to withdraw consent</strong> (Art. 7(3)) — you may withdraw any previously given consent at any time without affecting the lawfulness of processing before withdrawal.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm">
              To exercise any of these rights, email{" "}
              <a
                href="mailto:asvignesh.qae@gmail.com"
                className="text-[#16f2b3] underline"
              >
                asvignesh.qae@gmail.com
              </a>{" "}
              with the subject line <em>&quot;GDPR Data Request&quot;</em>. We will
              respond within <strong className="text-white">30 days</strong> in
              accordance with Article 12 GDPR.
            </p>
          </section>

          {/* 8. Supervisory authority */}
          <section aria-labelledby="section-authority">
            <h2
              id="section-authority"
              className="text-xl font-semibold text-white mb-3 border-l-4 border-[#16f2b3] pl-3"
            >
              8. Right to Lodge a Complaint
            </h2>
            <p className="text-sm">
              If you believe your data is being processed unlawfully, you have
              the right to lodge a complaint with your local data protection
              supervisory authority. As the data controller is based in Hungary,
              the competent authority is:
            </p>
            <address className="not-italic mt-3 bg-[#10172d] border border-[#353a52] rounded-lg p-4 text-sm leading-7">
              <strong className="text-white">
                Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)
              </strong>
              <br />
              National Authority for Data Protection and Freedom of Information
              <br />
              1055 Budapest, Falk Miksa utca 9–11, Hungary
              <br />
              <a
                href="https://naih.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16f2b3] underline"
              >
                naih.hu
              </a>
            </address>
          </section>

          {/* 9. Changes */}
          <section aria-labelledby="section-changes">
            <h2
              id="section-changes"
              className="text-xl font-semibold text-white mb-3 border-l-4 border-[#16f2b3] pl-3"
            >
              9. Changes to This Policy
            </h2>
            <p className="text-sm">
              This Privacy Policy may be updated to reflect changes in
              processing activities or applicable law. The &quot;Last
              updated&quot; date at the top of the page will always reflect the
              most recent revision. Where changes are material, we will make
              reasonable efforts to bring them to your attention (e.g., via an
              updated notice on the contact form).
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
