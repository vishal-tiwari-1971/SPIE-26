import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-14">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LOGO */}
          <div>
            <img src="/logo.png" alt="SPIE Logo" className="h-14 mb-3" />
            <p className="text-sm text-gray-400">
              Society of Production & Industrial Engineering<br />
              NIT Jamshedpur
            </p>
          </div>

          {/* HOME */}
          <div>
            <h4 className="text-white font-semibold mb-4">HOME</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* EVENTS */}
          <div>
            <h4 className="text-white font-semibold mb-4">EVENTS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-semibold mb-4">CONTACT US</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SPIE™, NIT Jamshedpur. All rights reserved.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-5">
            <a
              href="https://www.facebook.com/prodyog24/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <img
                src="/icons/facebook.svg"
                alt="Facebook"
                className="h-5 w-5"
              />
            </a>

            <a
              href="https://www.instagram.com/prodyog_nitjsr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <img
                src="/icons/instagram.svg"
                alt="Instagram"
                className="h-5 w-5"
              />
            </a>

            <a
              href="https://www.linkedin.com/company/society-of-production-and-industrial-engineering-nit-jamshedpur"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                className="h-5 w-5"
              />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
