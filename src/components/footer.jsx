import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* FOOTER TOP */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* SPIE Branding - Far Left */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-4">
              <img src="/globe.svg" alt="SPIE Logo" className="h-12 w-auto rounded" />
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">SPIE</h3>
                <p className="text-sm text-gray-400 leading-tight">
                  Society of Production & Industrial Engineering<br />
                  NIT Jamshedpur
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Content - Shifted Right */}
          <div className="md:ml-12 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* EXPLORE */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">Explore</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/team" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/events" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      Events
                    </Link>
                  </li>
                </ul>
              </div>

              {/* EVENTS */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">Events</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/prodyog" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      PRODYOG 2026
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      Gallery
                    </Link>
                  </li>
                </ul>
              </div>

              {/* CONTACT */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">Contact</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER DIVIDER */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {currentYear} <span className="text-red-500 font-semibold">SPIE™</span>, NIT Jamshedpur. All rights reserved.
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/prodyog_nitjsr/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-800 border border-gray-700 rounded flex items-center justify-center hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200"
              title="Follow us on Instagram"
            >
              <img src="/icons/instagram.svg" alt="Instagram" className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/prodyog24/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-800 border border-gray-700 rounded flex items-center justify-center hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200"
              title="Follow us on Facebook"
            >
              <img src="/icons/facebook.svg" alt="Facebook" className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/society-of-production-and-industrial-engineering-nit-jamshedpur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-800 border border-gray-700 rounded flex items-center justify-center hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200"
              title="Connect with us on LinkedIn"
            >
              <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
            </a>
            <a
              href="mailto:info@spie-nitjsr.com"
              className="w-8 h-8 bg-gray-800 border border-gray-700 rounded flex items-center justify-center hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200"
              title="Email us"
            >
              <img src="/icons/email.svg" alt="Email" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
