"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"

type TimelineItem = {
  id: string
  title: string
  description?: string
  date_of_event: string
  images?: string[]
  tags?: string[]
  is_draft?: boolean
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs"
      style={{
        color: "var(--color-white)",
        backgroundColor: "transparent",
        border: "1px solid var(--color-light)",
        opacity: 0.9,
      }}
    >
      {children}
    </span>
  )
}

function DateBadge({ date }: { date: string }) {
  return (
    <time
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide"
      style={{
        borderColor: "var(--color-primary)",
        color: "var(--color-primary)",
        backgroundColor: "transparent",
      }}
      aria-label={`Event date: ${date}`}
    >
      {date}
    </time>
  )
}

function OverlapImages({
  title,
  images = [],
  expanded,
  isMobile = false,
}: {
  title: string
  images?: string[]
  expanded: boolean
  isMobile?: boolean
}) {
  const n = Math.min(images.length, 5)

  // React Hooks must be called unconditionally,
  // so call them at top level, before any early returns
  const [mobileFrontIndex, setMobileFrontIndex] = useState(0)

  useEffect(() => {
    if (!isMobile) setMobileFrontIndex(0)
  }, [isMobile])

  if (n === 0) return null

  const onMobileClick = () => {
    setMobileFrontIndex((prev) => (prev + 1) % n)
  }

  return (
    <div
      className="relative mt-3 h-64 w-full select-none"
      style={{ touchAction: "manipulation" }}
      onClick={isMobile ? onMobileClick : undefined}
      aria-label={`Image gallery for ${title}, ${n} images`}
      role={isMobile ? "button" : undefined}
      tabIndex={isMobile ? 0 : undefined}
      onKeyDown={(e) => {
        if (isMobile && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onMobileClick()
        }
      }}
    >
      {images.slice(0, n).map((src, i) => {
        const mobileX = (i - 2) * 40
        const mobileY = 20
        const mobileRot = (i - 2) * 5

        const isLeft = i % 2 === 0
        const baseX = (isLeft ? -1 : 1) * (22 + i * 18)
        const baseY = -8 * i
        const baseRot = (isLeft ? -6 : 6) + (isLeft ? -1 : 1) * i
        const baseZ = 10 + i

        const spread = isMobile ? 80 : 140
        const start = -spread / 2
        const step = n === 1 ? 0 : spread / (n - 1)
        const angleDeg = start + step * i
        const angleRad = (angleDeg * Math.PI) / 180
        const rx = isMobile ? 100 : 180
        const ry = isMobile ? 60 : 90
        const fanX = Math.sin(angleRad) * rx
        const fanY = -Math.cos(angleRad) * ry + (isMobile ? 40 : 60)
        const sign = isLeft ? -1 : 1
        const fanRot = sign * (isMobile ? 4 : 8) + angleDeg * 0.05

        const transform = expanded
          ? `translate(calc(-50% + ${fanX}px), calc(-50% + ${fanY}px)) rotate(${fanRot}deg)`
          : isMobile
          ? `translate(calc(-50% + ${mobileX}px), calc(-50% + ${mobileY}px)) rotate(${mobileRot}deg)`
          : `translate(calc(-50% + ${baseX}px), calc(-50% + ${baseY}px)) rotate(${baseRot}deg)`

        let zIndex = baseZ
        if (isMobile) {
          const offset = (i - mobileFrontIndex + n) % n
          zIndex = 100 + (n - offset)
        }

        const isFront = isMobile && mobileFrontIndex === i

        const style: React.CSSProperties = {
          transform,
          zIndex,
          cursor: isMobile ? "pointer" : "default",
          boxShadow: isFront ? `0 10px 28px rgba(0,0,0,0.38)` : `0 6px 14px rgba(0,0,0,0.25)`,
          transition: "transform 320ms ease, box-shadow 320ms ease, filter 320ms ease, scale 320ms ease",
          border: "1px solid var(--color-dark)",
          backgroundColor: "var(--color-dark)",
          position: "absolute",
          scale: isFront ? 1.05 : 1,
          filter: isFront ? "brightness(1.1)" : "brightness(1)",
        }

        return (
          <Image
            key={i}
            src={src || "/placeholder.svg?height=240&width=320&query=timeline%20image"}
            alt={`${title} image ${i + 1}`}
            width={250}
            height={250}
            className="absolute left-1/2 top-1/2 rounded-md object-cover"
            style={style}
            onClick={() => setMobileFrontIndex(i)}
          />
        )
      })}
    </div>
  )
}

function TimelineCard({ item }: { item: TimelineItem }) {
  const dateLabel = formatDate(item.date_of_event)
  const hasImages = (item.images?.length || 0) > 0
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const onEnter = useCallback(() => setExpanded(true), [])
  const onLeave = useCallback(() => setExpanded(false), [])

  return (
    <li className="relative pl-14" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div
        className="absolute left-4 top-0 h-full w-2 rounded-full"
        aria-hidden="true"
        style={{ backgroundColor: "var(--color-dark)" }}
      />
      <span
        className="absolute top-2 block h-4 w-4 rounded-full transform -translate-x-1/2"
        aria-hidden="true"
        style={{
          left: "calc(1rem + 0.25rem)",
          backgroundColor: "var(--color-primary)",
          boxShadow: "0 0 0 5px var(--color-zinc)",
        }}
      />
      <div className="relative">
        <div className="pb-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h3
              className="text-lg md:text-xl font-semibold text-balance font-sans"
              style={{ color: "var(--color-white)" }}
            >
              {item.title}
            </h3>
            <DateBadge date={dateLabel} />
          </div>

          {hasImages ? (
            <OverlapImages title={item.title} images={item.images} expanded={expanded} isMobile={isMobile} />
          ) : null}

          {item.tags && item.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </div>
          ) : null}

          {item.description ? (
            <div
              className="mt-3 overflow-hidden transition-all duration-300 ease-out"
              style={{
                maxHeight: expanded ? 200 : 0,
                opacity: expanded ? 1 : 0,
              }}
              aria-hidden={!expanded}
            >
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-white)", opacity: 0.85 }}>
                {item.description}
              </p>
            </div>
          ) : null}

          <button className="sr-only" tabIndex={0} aria-label="Reveal details" onFocus={onEnter} onBlur={onLeave} />
        </div>
      </div>
    </li>
  )
}

export default function TimelinePage() {
  const [items, setItems] = useState<TimelineItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await fetch("/api/timeline")
        if (!res.ok) throw new Error("Failed to fetch timeline")
        const data: TimelineItem[] = await res.json()
        setItems(data.sort((a, b) => (a.date_of_event < b.date_of_event ? 1 : -1)))
      } catch (err) {
        console.error(err)
        setError("Network error")
      } finally {
        setLoading(false)
      }
    }

    void fetchTimeline()
  }, [])

  return (
    <main
      className="min-h-screen w-full font-sans relative"
      style={{
        backgroundColor: "var(--color-black)",
        overflowX: "hidden",
        width: "100vw",
      }}
    >
      <header className="mx-auto w-full max-w-3xl px-4 py-10 md:py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-balance" style={{ color: "var(--color-white)" }}>
            Timeline
          </h1>
          <div
            className="h-2 w-2 rounded-full"
            aria-hidden="true"
            title="Accent"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        </div>
        <p
          className="mt-2 text-sm md:text-base leading-relaxed max-w-prose"
          style={{ color: "var(--color-white)", opacity: 0.75 }}
        >
          Recent activities are shown at the top. Hover to see more clearly
        </p>
      </header>

      <section className="mx-auto w-full max-w-3xl px-4 pb-16">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ol className="relative flex flex-col gap-6">
            {items.map((item) => (
              <TimelineCard key={item.id} item={item} />
            ))}
          </ol>
        )}
      </section>
    </main>
  )
}
