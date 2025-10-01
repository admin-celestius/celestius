"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"

const Navbar = () => {
  const pathname = usePathname()
  const [showNavbar, setShowNavbar] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  // Hide-on-scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { href: "/", label: "We" },
    { href: "/events", label: "Events" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/timeline", label: "Timeline" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center px-4 sm:px-12 py-4 sm:py-6 transition-transform duration-300 z-50 bg-[var(--color-black)] shadow-md ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 transform translate-y-1 sm:translate-y-2">
        <Image src="/logoybg.png" alt="Celestius Logo" width={160} height={45} />
      </div>

      {/* Desktop Links */}
      <div className="hidden sm:flex flex-1 justify-center">
        <ul className="flex gap-12">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-base font-medium hover:text-[var(--color-primary)] transition-colors ${
                  pathname === link.href ? "underline underline-offset-4" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right spacer for desktop */}
      <div className="hidden sm:block w-[200px]"></div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden flex-1 flex justify-end">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-[var(--color-black)] flex flex-col gap-4 px-4 py-4 sm:hidden z-40 shadow-lg">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium hover:text-[var(--color-primary)] transition-colors ${
                  pathname === link.href ? "underline underline-offset-4" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
