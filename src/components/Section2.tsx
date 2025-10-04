"use client"
import React, { useRef, useEffect, useState } from "react";
import { FaLightbulb, FaUsers, FaCode, FaBookOpen } from "react-icons/fa";

interface Focus {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const focuses: Focus[] = [
  {
    icon: <FaCode className="text-2xl text-[var(--color-primary)]" />,
    title: "Skill Development",
    desc: "Level up your programming through workshops, coding challenges, and real-world projects.",
  },
  {
    icon: <FaUsers className="text-2xl text-[var(--color-primary)]" />,
    title: "Collaboration",
    desc: "Work with peers on innovative projects and learn from shared experiences.",
  },
  {
    icon: <FaLightbulb className="text-2xl text-[var(--color-primary)]" />,
    title: "Innovation",
    desc: "Experiment with emerging technologies and showcase ideas through competitions.",
  },
  {
    icon: <FaBookOpen className="text-2xl text-[var(--color-primary)]" />,
    title: "Knowledge Sharing",
    desc: "Foster a culture of learning by exchanging insights, resources, and expertise.",
  },
];

const Section2: React.FC = () => {
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [visibleBlocks, setVisibleBlocks] = useState<boolean[]>(focuses.map(() => false));
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Blocks animation
    const observerBlocks = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = blockRefs.current.findIndex((el) => el === entry.target);
          if (entry.isIntersecting && idx !== -1) {
            setVisibleBlocks((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    blockRefs.current.forEach((block) => {
      if (block) observerBlocks.observe(block);
    });

    // Text animation
    const observerText = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTextVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (textRef.current) observerText.observe(textRef.current);

    return () => {
      observerBlocks.disconnect();
      observerText.disconnect();
    };
  }, []);

  return (
    <div className="min-h-[100vh] flex flex-col md:flex-row items-center justify-center px-4 sm:px-12 md:px-20 py-12 md:py-0">
      
      {/* Left Text Section */}
      <div
        ref={textRef}
        className={`w-full md:w-1/2 md:pr-16 flex flex-col justify-center mb-10 md:mb-0 items-center md:items-start text-center md:text-left transition-all duration-700 ease-out
          ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">
          <span className="text-[var(--color-white)]">What We</span>
          <span className="mx-2 text-[var(--color-primary)]">Are </span>
        </h2>
        <p className="text-base sm:text-lg md:text-[20px] text-gray-200 leading-relaxed">
          Club Celestius, a student-run organization that brings together
          competitive programming and technology enthusiasts. We provide a platform
          to sharpen skills, collaborate on projects, explore new technologies,
          and share knowledge within a vibrant community.
        </p>
      </div>

      {/* Right Focus Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start pt-10">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 text-center md:text-left">
          <span className="text-[var(--color-white)]">What We</span>
          <span className="mx-2 text-[var(--color-primary)]">Focus </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {focuses.map((focus, idx) => (
            <div
              key={focus.title}
              ref={(el) => { blockRefs.current[idx] = el; }}
              className={`bg-zinc-800 rounded-xl p-6 sm:p-7 flex flex-col items-center shadow h-full min-h-[180px] transition-all duration-700 ease-out
                ${visibleBlocks[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                transitionDelay: visibleBlocks[idx] ? `${idx * 150}ms` : "0ms",
              }}
            >
              {focus.icon}
              <h4 className="mt-4 mb-2 text-lg sm:text-lg font-semibold text-[var(--color-primary)] text-center">
                {focus.title}
              </h4>
              <p className="text-center text-gray-100 text-sm sm:text-base leading-relaxed font-normal">
                {focus.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section2;
