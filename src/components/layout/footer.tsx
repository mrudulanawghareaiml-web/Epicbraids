import Link from "next/link";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-20">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            EpicBraids
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Handcrafted premium bracelets and accessories made with passion.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-black transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/customize" className="hover:text-black transition-colors">
                Customize
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wider">
            Connect With Us
          </h3>

          <div className="space-y-4 text-sm text-gray-600">

            {/* Email */}
            <a
              href="mailto:your@email.com"
              className="flex items-center gap-2 hover:text-black transition-colors"
            >
              <Mail size={16} />
              epicbraidsforyou@gmail.com
            </a>

            {/* Phone */}
            <a
              href="tel:+91 91759 44 598"
              className="flex items-center gap-2 hover:text-black transition-colors"
            >
              <Phone size={16} />
              +91 91759 44 598
            </a>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/_epicbraids?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <Instagram />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <Facebook />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EpicBraids. All rights reserved.
      </div>
    </footer>
  );
}
