import React from "react";
import Image from "next/image";

const Section1 = () => {
  return (
    <div className="h-[calc(100vh-4.5rem)] flex items-center justify-between px-8">
      <div className="flex-1 pl-12 flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          <span style={{ color: "var(--color-primary)" }}>Innovate</span>
          <span className="mx-2" style={{ color: "var(--color-white)" }}>. </span>
          <span style={{ color: "var(--color-white)" }}>Share</span>
          <span className="mx-2" style={{ color: "var(--color-white)" }}>. </span>
          <span style={{ color: "var(--color-primary)" }}>Collaborate</span>
        </h1>
        <p className="text-lg mt-2 max-w-xl">
          A student-run community driving{" "}
          <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            innovation
          </span>
          , open source, and{" "}
          <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            collaboration
          </span>{" "}
          through technology and{" "}
          <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            shared knowledge
          </span>
          .
        </p>
      </div>
      <div className="flex-1 flex justify-start ml-80">
        <Image
          src="/ggout.png"
          alt="Section 1 Image"
          width={270}
          height={350}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Section1;
