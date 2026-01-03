export default function PrivacyPolicyPage() {
  return (
    <section className="px-6 py-14 max-w-5xl mx-auto text-[#F5F3F4]">
      <h1
        style={{
          fontFamily: "Bebas Neue, sans-serif",
          fontSize: "2.5rem",
          letterSpacing: "0.15em",
          color: "#FFB703",
          marginBottom: "2rem",
        }}
      >
        PRIVACY POLICY
      </h1>

      <div className="dossier-card space-y-6 font-['Courier Prime'] text-[#B1A7A6]">
        <p>
          This Privacy Policy explains how the Society of Production & Industrial
          Engineering (SPIE), NIT Jamshedpur, collects, uses, and protects user
          information when you access our website.
        </p>

        <div>
          <h2 className="section-title mb-2">Information We Collect</h2>
          <p>
            We may collect basic information such as name, email address, and
            academic details when users register for events, contact us, or
            participate in activities organized by SPIE.
          </p>
        </div>

        <div>
          <h2 className="section-title mb-2">How We Use Information</h2>
          <ul className="mission-list">
            <li>Event registrations and communications</li>
            <li>Internal analytics and improvements</li>
            <li>Official announcements and updates</li>
          </ul>
        </div>

        <div>
          <h2 className="section-title mb-2">Data Protection</h2>
          <p>
            SPIE takes reasonable technical and organizational measures to
            protect your data. We do not sell or share personal information with
            third parties without consent unless required by law.
          </p>
        </div>

        <div>
          <h2 className="section-title mb-2">External Links</h2>
          <p>
            Our website may contain links to external platforms. SPIE is not
            responsible for the privacy practices or content of those websites.
          </p>
        </div>

        <div>
          <h2 className="section-title mb-2">Policy Updates</h2>
          <p>
            This Privacy Policy may be updated periodically. Continued use of
            the website implies acceptance of the revised policy.
          </p>
        </div>

        <p className="text-sm text-[#666]">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
