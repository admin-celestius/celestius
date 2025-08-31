"use client";

import React, { FC } from "react";

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: "Open" | "Completed";
  is_draft: boolean;
  link: string;
}

const StatusBadge: FC<{ status: Project["status"] }> = ({ status }) => {
  const isOpen = status === "Open";
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-medium"
      style={{
        backgroundColor: isOpen ? "var(--color-primary)" : "var(--color-black)",
        color: isOpen ? "var(--color-zinc)" : "var(--color-white)",
        borderColor: "transparent",
      }}
    >
      {status}
    </span>
  );
};

const VisitButton: FC<{ href: string; label?: string }> = ({ href, label = "Visit" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} project`}
      className="inline-block px-4 py-2 rounded font-medium hover:brightness-95"
      style={{ backgroundColor: "var(--color-primary)", color: "var(--color-zinc)" }}
    >
      {label}
    </a>
  );
};

const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  return (
    <div
      className="rounded-lg p-4 flex flex-col justify-between bg-[var(--color-zinc)]"
    >
      <div className="mb-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold" style={{ color: "white" }}>
              {project.title}
            </h3>
            <div
              className="h-0.5 w-12 mt-1"
              style={{ backgroundColor: "var(--color-primary)" }}
              aria-hidden
            />
          </div>
          <StatusBadge status={project.status} />
        </div>

        {project.description && (
          <p className="opacity-80 mt-2" style={{ color: "var(--color-white)" }}>
            {project.description}
          </p>
        )}
      </div>

      <div>
        <VisitButton href={project.link} />
      </div>
    </div>
  );
};

export default ProjectCard;
