"use client"

import { useEffect, useRef, useState } from "react"

const Section4 = () => {
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([])
  const [visibleSections, setVisibleSections] = useState<boolean[]>([false, false, false, false])

  const sections = [
    {
      id: "intro",
      title: "What We Do",
      subtitle: "Discover opportunities to grow, learn, and make an impact through our diverse range of activities.",
      background: "bg-[#18181B]",
      textColor: "text-[#ffffff]",
    },
    {
      id: "knowledge",
      title: "Knowledge Sharing",
      subtitle: "Workshops & sessions to spread skills, ideas, and best practices.",
      background: "bg-[#2C2C2C]",
      textColor: "text-[#ffffff]",
    },
    {
      id: "events",
      title: "Technical Events",
      subtitle: "Hackathons, coding contests, and tech talks to challenge and inspire.",
      background: "bg-[#545454]",
      textColor: "text-[#ffffff]",
    },
    {
      id: "projects",
      title: "Projects",
      subtitle: "Collaborative real-world projects that turn ideas into impact.",
      background: "bg-black",
      textColor: "text-[#ffffff]",
    },
  ]

  // IntersectionObserver to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = sectionRefs.current.findIndex((el) => el === entry.target)
          if (entry.isIntersecting && idx !== -1) {
            setVisibleSections((prev) => {
              const updated = [...prev]
              updated[idx] = true
              return updated
            })
          }
        })
      },
      { threshold: 0.25 }
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative">
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => { sectionRefs.current[index] = el }}
          className={`transition-all duration-700 ease-in-out transform
            ${visibleSections[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
            ${section.background}
            h-auto sm:h-screen flex items-center justify-center
            py-20 sm:py-0
          `}
        >
          <div className="text-center px-6 max-w-5xl mx-auto">
            <h1 className={`text-4xl md:text-8xl lg:text-9xl font-bold mb-6 ${section.textColor} tracking-tight leading-snug sm:leading-none`}>
              {section.title.split(" ").map((word, i) => (
                <span key={i} className={`${i === 1 ? "text-[#FAD02C]" : ""} block`}>
                  {word}
                </span>
              ))}
            </h1>
            <p className={`text-base md:text-2xl lg:text-3xl font-light ${section.textColor} opacity-80 leading-relaxed`}>
              {section.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Section4
