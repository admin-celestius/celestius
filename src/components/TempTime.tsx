"use client"

import type React from "react"
import Image from "next/image"
import { useState, useCallback } from "react"

type TimelineItem = {
  id: string
  title: string
  description?: string
  date_of_event: string // ISO date
  images?: string[]
  tags?: string[]
  is_draft?: boolean
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
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
}: {
  title: string
  images?: string[]
  expanded: boolean
}) {
  const n = Math.min(images.length, 5)
  if (n === 0) return null

  return (
    <div className="relative mt-3 h-64 w-full">
      {images.slice(0, n).map((src, i) => {
        const isLeft = i % 2 === 0

        // Base stack positions (more separation while still overlapped)
        // Wider horizontal offsets, a bit more vertical staggering, and a touch more rotation per depth.
        const baseX = (isLeft ? -1 : 1) * (22 + i * 18) // previously ~14 + i * 4
        const baseY = -8 * i // previously -6 * i
        const baseRot = (isLeft ? -6 : 6) + (isLeft ? -1 : 1) * i // slightly vary by index
        const baseZ = 10 + i

        // Elliptical fan-out (unchanged)
        const spread = 140
        const start = -spread / 2
        const step = n === 1 ? 0 : spread / (n - 1)
        const angleDeg = start + step * i
        const angleRad = (angleDeg * Math.PI) / 180
        const rx = 180
        const ry = 90
        const fanX = Math.sin(angleRad) * rx
        const fanY = -Math.cos(angleRad) * ry + 60
        const sign = isLeft ? -1 : 1
        const fanRot = sign * 8 + angleDeg * 0.05

        const transform = expanded
          ? `translate(calc(-50% + ${fanX}px), calc(-50% + ${fanY}px)) rotate(${fanRot}deg)`
          : `translate(calc(-50% + ${baseX}px), calc(-50% + ${baseY}px)) rotate(${baseRot}deg)`

        return (
          <Image
            key={i}
            src={src || "/placeholder.svg?height=240&width=320&query=timeline%20image"}
            alt={`${title} image ${i + 1}`}
            width={260}
            height={190}
            className="absolute left-1/2 top-1/2 rounded-md object-cover"
            style={{
              transform,
              zIndex: baseZ,
              boxShadow: expanded ? `0 10px 28px rgba(0,0,0,0.38)` : `0 6px 14px rgba(0,0,0,0.25)`,
              transition: "transform 320ms ease, box-shadow 320ms ease",
              border: "1px solid var(--color-dark)",
              backgroundColor: "var(--color-dark)",
            }}
          />
        )
      })}
    </div>
  )
}

function TimelineCard({ item, }: { item: TimelineItem; isFirst: boolean }) {
  const dateLabel = formatDate(item.date_of_event)
  const hasImages = (item.images?.length || 0) > 0
  const [expanded, setExpanded] = useState(false)

  const onEnter = useCallback(() => setExpanded(true), [])
  const onLeave = useCallback(() => setExpanded(false), [])

  return (
    <li className="relative pl-14" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {/* vertical rail (bold, rounded) */}
      <div
        className="absolute left-4 top-0 h-full w-2 rounded-full"
        aria-hidden="true"
        style={{ backgroundColor: "var(--color-dark)" }}
      />
      {/* node on the rail */}
      <span
        className="absolute top-2 block h-4 w-4 rounded-full transform -translate-x-1/2"
        aria-hidden="true"
        style={{
          left: "calc(1rem + 0.25rem)", // rail left (1rem) + half rail width (0.25rem)
          backgroundColor: "var(--color-primary)",
          boxShadow: "0 0 0 5px var(--color-zinc)", // ring to sit "on top" of the rail
        }}
      />
      {/* transparent container (no background) */}
      <div className="relative">
        <div className="pb-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h3
              className="text-lg md:text-xl font-semibold text-balance font-sans"
              style={{ color: "var(--color-white)" }}
            >
              {item.title}
            </h3>
            {/* clearer date badge */}
            <DateBadge date={dateLabel} />
          </div>

          {hasImages ? <OverlapImages title={item.title} images={item.images} expanded={expanded} /> : null}

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

          {/* keyboard focus to expand */}
          <button className="sr-only" tabIndex={0} aria-label="Reveal details" onFocus={onEnter} onBlur={onLeave} />
        </div>
      </div>
    </li>
  )
}

export default function TimelinePage() {
  // Replace with DB data (public.timeline), sorted recent->past
  const items: TimelineItem[] = [
    {
      id: "1",
      title: "Product Launch V2",
      description: "Version 2 shipped with performance upgrades and improved onboarding.",
      date_of_event: "2025-08-21",
      images: ["/dashboard-stats.png", "/launch-announcement.png", "/onboarding-flow.png"],
      tags: ["release", "product"],
    },
    {
      id: "2",
      title: "Marketing Campaign Kickoff",
      description: "Multi-channel campaign across email, social, and paid to drive awareness.",
      date_of_event: "2025-07-15",
      images: ["/abstract-ad-creative.png", "/email-newsletter.png"],
      tags: ["marketing", "growth"],
    },
    {
      id: "3",
      title: "Beta Program Started",
      description: "Closed beta launched, captured early adopter feedback for iterations.",
      date_of_event: "2025-05-03",
      images: ["/beta-feedback.png"],
      tags: ["beta", "users"],
    },
    {
      id: "4",
      title: "Initial Concept",
      description: "Aligned on the problem, drafted wireframes, and set milestones.",
      date_of_event: "2025-03-10",
      images: [],
      tags: ["planning"],
    },
  ].sort((a, b) => (a.date_of_event < b.date_of_event ? 1 : -1))

  return (
    <main className="min-h-screen w-full font-sans" style={{ backgroundColor: "var(--color-zinc)" }}>
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
          Recent activities are shown at the top; hover or focus an item to fan images and show details.
        </p>
      </header>

      <section className="mx-auto w-full max-w-3xl px-4 pb-16">
        <ol className="relative flex flex-col gap-6">
          {items.map((item, idx) => (
            <TimelineCard key={item.id} item={item} isFirst={idx === 0} />
          ))}
        </ol>
      </section>

      <footer className="mx-auto w-full max-w-3xl px-4 pb-10">
        <p className="text-xs" style={{ color: "var(--color-light)" }}>
          Colors used (5): Primary (#FAD02C), Zinc (#18181B), Dark (#2C2C2C), Light (#545454), White (#ffffff)
        </p>
      </footer>
    </main>
  )
}
