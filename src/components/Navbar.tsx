"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()
  const links = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/events", label: "Events" },
    { href: "/projects", label: "Projects" },
    { href: "/timeline", label: "Timeline" },
  ]

  return (
    <nav className="flex items-center px-8 py-4">
      <div className="flex items-center">
        <Image src="/logoybg.png" alt="Celestius Logo" width={170} height={40}/>
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
