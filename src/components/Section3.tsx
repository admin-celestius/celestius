"use client"

import { FaBookOpen, FaBolt, FaTools } from "react-icons/fa"

const activities = [
  {
    icon: (
      <FaBookOpen className="text-6xl text-[#FAD02C] mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" />
    ),
    title: "Knowledge Sharing",
    desc: "Workshops & sessions to spread skills, ideas, and best practices.",
  },
  {
    icon: (
      <FaBolt className="text-6xl text-[#FAD02C] mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3" />
    ),
    title: "Technical Events",
    desc: "Hackathons, coding contests, and tech talks to challenge and inspire.",
  },
  {
    icon: (
      <FaTools className="text-6xl text-[#FAD02C] mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2" />
    ),
    title: "Projects",
    desc: "Collaborative real-world projects that turn ideas into impact.",
  },
]

const Section3 = () => {
  return (
    <section className="min-h-[100vh]  flex flex-col items-center justify-center bg-black relative overflow-hidden py-20">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#FAD02C] rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-[#2C2C2C] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#FAD02C] rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-[#545454] rounded-full blur-2xl"></div>
      </div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-6xl md:text-7xl font-bold text-[#ffffff] mb-6 tracking-tight">
          What We <span className="text-[#FAD02C]">Do</span>
        </h2>
        <p className="text-xl text-[#545454] max-w-3xl mx-auto leading-relaxed px-4">
          Discover opportunities to grow, learn, and make an impact through our diverse range of activities
        </p>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-8 md:px-12 relative z-10 mb-16">
        {activities.map((activity, index) => (
          <div
            key={activity.title}
            className={`group flex flex-col items-center justify-center bg-gradient-to-br from-[#18181B] to-[#2C2C2C]/50 rounded-3xl p-12 border border-[#2C2C2C] min-h-[320px] 
            transition-all duration-700 ease-out
            hover:border-[#FAD02C]/60 hover:shadow-2xl hover:shadow-[#FAD02C]/10 
            hover:scale-105 hover:-translate-y-2
            transform-gpu cursor-pointer`}
            style={{
              animationDelay: `${index * 150}ms`,
              animation: "fadeInUp 0.8s ease-out forwards",
            }}
          >
            <div className="relative">
              {activity.icon}
              <div className="absolute inset-0 bg-[#FAD02C]/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <h3 className="text-2xl font-bold text-[#ffffff] mb-4 text-center group-hover:text-[#FAD02C] transition-colors duration-300">
              {activity.title}
            </h3>
            <p className="text-base text-[#545454] text-center font-normal leading-relaxed group-hover:text-[#ffffff]/80 transition-colors duration-300 max-w-xs">
              {activity.desc}
            </p>

            <div className="w-0 h-1 bg-[#FAD02C] rounded-full mt-6 group-hover:w-16 transition-all duration-500"></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default Section3
