"use client"
import React, { useRef, useEffect, useState } from "react";
import { FaLightbulb, FaUsers, FaCode, FaBookOpen } from "react-icons/fa";

const focuses = [
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

const Section2 = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const observer = new window.IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ threshold: 0.2 }
		);
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={sectionRef}
			className="h-[100vh] flex items-center justify-center px-20"
		>
			<div className="w-1/2 pr-16 flex flex-col justify-center">
				<h2 className="text-4xl font-bold mb-4">
					<span style={{ color: "var(--color-primary)" }}>We</span>
                    <span className="mx-2" style={{ color: "var(--color-white)" }}>are </span>
				</h2>
				<p className="text-[20px] text-gray-200 leading-relaxed">
					Club Celestius, a student-run organization that brings together
					competitive programming and technology enthusiasts. We provide a platform
					to sharpen skills, collaborate on projects, explore new technologies,
					and share knowledge within a vibrant community.
				</p>
			</div>
			<div className="w-1/2 flex flex-col items-center">
				<h2 className="text-3xl font-bold mb-4">
					<span style={{ color: "var(--color-primary)" }}>We</span>
                    <span className="mx-2" style={{ color: "var(--color-white)" }}>focus </span>
				</h2>
				<div className="grid grid-cols-2 gap-6 w-full">
					{focuses.map((focus, idx) => (
						<div
							key={focus.title}
							className={`bg-zinc-800 rounded-xl p-7 flex flex-col items-center shadow h-full min-h-[180px] transition-all duration-700 ease-out
                ${
					inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
				}
                ${inView ? `delay-${idx * 150}` : ""}`}
							style={{
								transitionDelay: inView ? `${idx * 150}ms` : "0ms",
							}}
						>
							{focus.icon}
							<h4 className="mt-4 mb-2 text-lg font-semibold text-[var(--color-primary)] text-center">
								{focus.title}
							</h4>
							<p className="text-center text-gray-100 text-base leading-relaxed font-normal">
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
