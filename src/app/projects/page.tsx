"use client";

import React from "react";
import ProjectsList from "@/components/ProjectsList";

export default function Projects() {
  return (
    <main className="h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Celestius Projects</h1>

      <div className="h-full overflow-y-auto">
        <ProjectsList />
      </div>
    </main>
  );
}
