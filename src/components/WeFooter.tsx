import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"
import Image from "next/image"

const links = [
  { href: "/", label: "We" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/timeline", label: "Timeline" },
]

export default function WeFooter() {
  return (
    <footer style={{ backgroundColor: "var(--color-zinc)" }} className="text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
                <Image src="/logoybg.png" alt="Celestius Logo" width={150} height={40}/>
            </div>
            <p className="text-sm" style={{ color: "var(--color-light)" }}>
              Innovate • Share • Collaborate
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-light)" }}>
              Shaping ideas, sharing knowledge, building together.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:text-[var(--color-primary)]"
                  style={{ color: "var(--color-light)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Club-Celestius"
                className="p-2 rounded-lg transition-all duration-200 hover:bg-[var(--color-dark)] hover:scale-110"
                style={{ backgroundColor: "var(--color-dark)" }}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
              </a>
              <a
                href="https://www.linkedin.com/company/club-celestius-cit/"
                className="p-2 rounded-lg transition-all duration-200 hover:bg-[var(--color-dark)] hover:scale-110"
                style={{ backgroundColor: "var(--color-dark)" }}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
              </a>
              <a
                href="https://www.instagram.com/celestius.cit?igsh=YWEydnNnOG9tNmV2"
                className="p-2 rounded-lg transition-all duration-200 hover:bg-[var(--color-dark)] hover:scale-110"
                style={{ backgroundColor: "var(--color-dark)" }}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: "var(--color-dark)" }}></div>

        {/* Copyright */}
        <div className="pt-6 text-center">
          <p className="text-sm" style={{ color: "var(--color-light)" }}>
            © 2025 Club Celestius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
