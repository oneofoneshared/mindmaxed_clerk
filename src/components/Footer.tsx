import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="bg-white border-t border-gray-200 py-10"
      id="main-footer"
    >
      <div className="container mx-auto px-4">
        <div className="footer-content grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="footer-section">
            <div className="footer-logo flex items-center space-x-2 mb-2">
              <Image
                src="/assets/images/logo/mindmaxed-logo.svg"
                alt="MindMaxED AI"
                width={32}
                height={32}
              />
              <span className="font-bold text-lg">MindMaxED AI</span>
            </div>
            <p className="footer-description text-gray-600 mb-4">
              Empowering minds to thrive through AI-enhanced coaching and brain
              fitness training.
            </p>
            <div className="social-links flex space-x-4">
              <a
                href="https://www.linkedin.com/in/dustin-the-dean-of-zen/"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-blue-700 text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* LinkedIn SVG */}
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/dustin.dean.635008"
                aria-label="Facebook"
                className="text-gray-400 hover:text-blue-600 text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Facebook SVG */}
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mindcoachdustin/?next=%2F&hl=en"
                aria-label="Instagram"
                className="text-gray-400 hover:text-pink-500 text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Instagram SVG */}
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13-.38a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
                </svg>
              </a>
            </div>
          </div>
          {/* Services */}
          <div className="footer-section">
            <h4 className="font-semibold mb-2">Services</h4>
            <ul className="text-gray-600 space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Coaching Programs
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Our Method
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Schedule Session
                </a>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div className="footer-section">
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="text-gray-600 space-y-1">
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#coaches" className="hover:underline">
                  Our Coaches
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div className="footer-section">
            <h4 className="font-semibold mb-2">Contact</h4>
            <ul className="text-gray-600 space-y-1">
              <li>
                <a
                  href="mailto:hello@mindmaxed.com"
                  className="hover:underline"
                >
                  hello@mindmaxed.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-8900
                </a>
              </li>
              <li>Available 7 days a week</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>&copy; 2025 MindMaxED Institute. All rights reserved.</p>
          <div className="legal-links flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
