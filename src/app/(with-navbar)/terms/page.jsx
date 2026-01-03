export default function TermsAndConditionsPage() {
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
        TERMS & CONDITIONS
      </h1>

      <div className="dossier-card space-y-6 font-['Courier Prime'] text-[#B1A7A6]">
        <p>
          By accessing and using the SPIE website, you agree to comply with the
          following Terms and Conditions. Please read them carefully.
        </p>

        <div>
          <h2 className="section-title mb-2">Use of Website</h2>
          <p>
            This website is intended for informational and academic purposes.
            Users must not misuse content, attempt unauthorized access, or
            disrupt site functionality.
          </p>
        </div>

        <div>
          <h2 className="section-title mb-2">Intellectual Property</h2>
          <p>
            All content, logos, graphics, and media on this website are the
            property of SPIE unless otherwise stated. Unauthorized reproduction
            is prohibited.
          </p>
        </div>

        <div>
          <h2 className="section-title mb-2">Event Participation</h2>
          <p>
            Participation in events organized by SPIE is subject to event-specific
            rules, eligibility criteria, and approval by the organizing committee.
          </p>
        </div>

        <div>
          <h2 className="section-title mb-2">Limitation of Liability</h2>
          <p>
            SPIE is not responsible for any loss, damage, or inconvenience arising
            from the use of this website or participation in events.
          </p>
        </div>

        <div>
          <h2 className="section-title mb-2">Changes to Terms</h2>
          <p>
            SPIE reserves the right to update these Terms & Conditions at any
            time. Continued usage constitutes acceptance of changes.
          </p>
        </div>

        <p className="text-sm text-[#666]">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
