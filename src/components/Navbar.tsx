"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"

const Navbar = () => {
  const pathname = usePathname()
  const [showNavbar, setShowNavbar] = useState(true)
  const lastScrollY = useRef(0)

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
      className={`fixed top-0 left-0 w-full flex items-center px-12 py-3 transition-transform duration-300 z-50 bg-[var(--color-black)] ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center">
        <Image src="/logoybg.png" alt="Celestius Logo" width={150} height={40}/>
      </div>

      <div className="flex-1 flex justify-center">
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

      <div className="w-[200px]"></div>
    </nav>
  )
}

export default Navbar
