"use client"

import { cn } from "@/utils/cn"

export interface Event {
  id: string
  title: string
  description: string
  event_date: string
  registration_open: string
  registration_close: string
  registration_link?: string | null
}

type Props = {
  event: Event
  className?: string
}

function parseDate(value: string): Date | null {
  const d = new Date(value)
  return isNaN(d.getTime()) ? null : d
}

function formatDateOnly(d: Date | null): string {
  if (!d) return ""
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatDateTime(d: Date | null): string {
  if (!d) return ""
  const datePart = d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const timePart = d
    .toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/am|pm/, (m) => m.toUpperCase())

  return `${datePart} · ${timePart}`
}



function formatDate(d: Date | null): string {
  if (!d) return ""
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function EventCard({ event, className }: Props) {
  const eventDate = parseDate(event.event_date)
  const regOpen = parseDate(event.registration_open)
  const regClose = parseDate(event.registration_close)
  const now = new Date()

  const hasLink = Boolean(event.registration_link)
  const isRegWindowValid = regOpen && regClose && regOpen <= regClose
  const isWithinRegWindow = !!(isRegWindowValid && regOpen <= now && now <= regClose)

  const canRegister = hasLink && isWithinRegWindow

  return (
    <article
      role="article"
      aria-labelledby={`event-${event.id}-title`}
      className={cn(
        "rounded-lg overflow-hidden grid md:grid-cols-[220px_1fr]",
        className
      )}
      style={{
        backgroundColor: "var(--color-dark, #18181B)",
        color: "var(--color-white, #ffffff)",
      }}
    >
      {/* Left Column */}
      <aside
        className="p-4 md:p-6 flex flex-col gap-3"
        style={{ backgroundColor: "black" }}
      >
        <div className="text-xs text-[color:var(--color-light,#A1A1AA)]">Event date</div>
        <div className="text-xl font-mono">
          {eventDate ? formatDateOnly(eventDate) : event.event_date}
        </div>
        <div className="h-px" style={{ backgroundColor: "var(--color-dark,#18181B)" }} />

        <div className="grid gap-4 text-sm">
          <div>
            <div className="text-[color:var(--color-light,#A1A1AA)] text-xs mb-1">Opens</div>
            <div className="font-mono">{regOpen ? formatDateTime(regOpen) : event.registration_open}</div>
          </div>
          <div>
            <div className="text-[color:var(--color-light,#A1A1AA)] text-xs mb-1">Closes</div>
            <div className="font-mono">{regClose ? formatDateTime(regClose) : event.registration_close}</div>
          </div>
        </div>
      </aside>

      {/* Right Column */}
      <div className="p-4 md:p-6 flex flex-col gap-4">
        <h3
          id={`event-${event.id}-title`}
          className="text-lg md:text-xl font-semibold leading-tight"
        >
          {event.title}
        </h3>

        <p
          className="text-sm text-[#c7c7cc] leading-relaxed line-clamp-10"
          style={{ minHeight: "14em" }} 
        >
          {event.description}
        </p>



        <div className="mt-auto max-w-sm">
          {canRegister ? (
            <a
              href={event.registration_link!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-[var(--color-primary)] text-black"
              // style={{
              //   backgroundColor: "var(--color-zinc, #27272A)",
              //   color: "var(--color-white, #ffffff)",
              // }}
            >
              Register
            </a>
          ) : (
            <span
              className="inline-flex w-full items-center justify-center rounded-lg border px-3 py-2 text-xs font-medium bg-[var(--color-primary)] text-black"
              // style={{
              //   borderColor: "var(--color-zinc,#27272A)",
              //   color: "var(--color-zinc,#27272A)",
              // }}
            >
              {isRegWindowValid ? (
                now < regOpen! ? <>Opens {formatDate(regOpen)}</> : <>Closed {formatDate(regClose)}</>
              ) : (
                <>Registration unavailable</>
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
