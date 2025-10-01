"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Section1 = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true); // trigger animation after mount
  }, []);

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col md:flex-row items-center justify-between px-4 pt-10 md:px-8">
      
      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-center md:pl-25">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-snug md:leading-tight">
          <span className="text-[var(--color-primary)]">Innovate</span>
          <span className="mx-1 text-[var(--color-white)]">. </span>
          <span className="text-[var(--color-white)]">Share</span>
          <span className="mx-1 text-[var(--color-white)]">. </span>
          <span className="text-[var(--color-primary)]">Collaborate</span>
        </h1>
        <p className="text-base sm:text-lg md:text-lg mt-2 max-w-full md:max-w-xl">
          Club Celestius is a student-run community driving{" "}
          <span className="text-[var(--color-primary)] font-semibold">
            innovation
          </span>
          , open source, and{" "}
          <span className="text-[var(--color-primary)] font-semibold">
            collaboration
          </span>{" "}
          through technology and{" "}
          <span className="text-[var(--color-primary)] font-semibold">
            shared knowledge
          </span>
          .
        </p>
      </div>

      {/* Image Section with on-load animation */}
      <div
        className={`flex-1 flex justify-center md:justify-start mt-6 md:mt-0 pt-5 md:ml-80 
          transition-all duration-1000 ease-out 
          ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <Image
          src="/ggoute.jpg"
          alt="Section 1 Image"
          width={270}
          height={250}
          className="object-contain w-3/4 sm:w-1/2 md:w-auto -mt-10"
          priority
        />
      </div>
    </div>
  );
};

export default Section1;
