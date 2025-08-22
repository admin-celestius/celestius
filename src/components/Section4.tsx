"use client"

import { useEffect, useRef, useState } from "react"

const Section4 = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const [isLocked, setIsLocked] = useState(false)
  const isUnlocking = useRef(false)

  const sections = [
    {
      id: "intro",
      title: "What We Do",
      subtitle: "Discover opportunities to grow, learn, and make an impact through our diverse range of activities.",
      background: "bg-[#18181B]", // zinc
      textColor: "text-[#ffffff]", // white
    },
    {
      id: "knowledge",
      title: "Knowledge Sharing",
      subtitle: "Workshops & sessions to spread skills, ideas, and best practices.",
      background: "bg-[#2C2C2C]", // dark
      textColor: "text-[#ffffff]", // white
    },
    {
      id: "events",
      title: "Technical Events",
      subtitle: "Hackathons, coding contests, and tech talks to challenge and inspire.",
      background: "bg-[#545454]", // light
      textColor: "text-[#ffffff]", // white
    },
    {
      id: "projects",
      title: "Projects",
      subtitle: "Collaborative real-world projects that turn ideas into impact.",
      background: "bg-black", // black
      textColor: "text-[#ffffff]", // white
    },
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollTimeout: NodeJS.Timeout | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > 0.5 &&
          !isUnlocking.current
        ) {
          // Debounce scrollIntoView for smoothness
          if (scrollTimeout) clearTimeout(scrollTimeout)
          scrollTimeout = setTimeout(() => {
            setIsLocked(true)
            container.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }, 80)
        } else if (!entry.isIntersecting) {
          setIsLocked(false)
          isScrolling.current = false
          isUnlocking.current = false
        }
      },
      { threshold: [0.5] },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      console.log("[v0] Wheel event:", {
        isScrolling: isScrolling.current,
        isLocked,
        currentSection,
        deltaY: e.deltaY,
      })

      if (isScrolling.current) {
        e.preventDefault()
        return
      }

      if (!isLocked) return

      if (e.deltaY < 0 && currentSection === 0) {
        // Allow scrolling out of section when at first slide
        console.log("[v0] Unlocking section for upward scroll")
        isUnlocking.current = true
        setIsLocked(false)
        isScrolling.current = false
        // Don't prevent default - allow natural scroll
        return
      }

      e.preventDefault()
      isScrolling.current = true

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // Scroll down
        setCurrentSection((prev) => prev + 1)
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll up within section
        setCurrentSection((prev) => prev - 1)
      }

      setTimeout(() => {
        isScrolling.current = false
        console.log("[v0] Scroll timeout completed")
      }, 600)
    }

    if (isLocked) {
      window.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [currentSection, sections.length, isLocked])

  useEffect(() => {
    if (!isLocked && currentSection !== 0) {
      setTimeout(() => {
        setCurrentSection(0)
      }, 100)
    }
  }, [isLocked, currentSection])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1)
      } else if (e.key === "ArrowUp" && currentSection > 0) {
        setCurrentSection((prev) => prev - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection, sections.length])

  return (
    <div ref={containerRef} className="h-screen overflow-hidden relative">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`
            absolute inset-0 flex items-center justify-center
            ${section.background}
            transition-all duration-700 ease-in-out
            ${
              currentSection === index
                ? "opacity-100 translate-y-0 scale-100"
                : currentSection > index
                  ? "opacity-0 -translate-y-full scale-95"
                  : "opacity-0 translate-y-full scale-95"
            }
          `}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FAD02C]/10 rounded-full blur-2xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
            {index === 0 ? (
              // Intro section
              <div
                className={`
                transition-all duration-500 ease-out delay-200
                ${currentSection === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              >
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 text-[#ffffff] tracking-tight leading-none">
                  What We
                  <span className="block text-[#FAD02C]">Do</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto text-[#ffffff] opacity-80 leading-relaxed">
                  {section.subtitle}
                </p>
              </div>
            ) : (
              // Activity sections
              <div
                className={`
                transition-all duration-500 ease-out delay-200
                ${currentSection === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              >
                <div className="mb-12">
                  <div className="text-sm md:text-base font-medium tracking-widest uppercase mb-6 text-[#FAD02C] opacity-80">
                    Activities
                  </div>
                  <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-[#ffffff] tracking-tight leading-none">
                    {section.title.split(" ").map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        className={`
                          block transition-all duration-300 ease-out
                          ${wordIndex === 1 ? "text-[#FAD02C]" : ""}
                          ${currentSection === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
                        `}
                        style={{ transitionDelay: `${300 + wordIndex * 100}ms` }}
                      >
                        {word}
                      </span>
                    ))}
                  </h2>
                </div>

                <p
                  className={`
                  text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto text-[#ffffff] opacity-80 leading-relaxed
                  transition-all duration-500 ease-out delay-500
                  ${currentSection === index ? "opacity-80 translate-y-0" : "opacity-0 translate-y-4"}
                `}
                >
                  {section.subtitle}
                </p>
              </div>
            )}
          </div>

          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4">
            {sections.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSection(idx)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${currentSection === idx ? "bg-[#FAD02C] scale-125" : "bg-white/30 hover:bg-white/50"}
                `}
              />
            ))}
          </div>

          {/* Scroll indicator for first section */}
          {index === 0 && currentSection === 0 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-fade-in-up">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Section4
