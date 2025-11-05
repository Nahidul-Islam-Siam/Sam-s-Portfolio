
"use client"

import * as React from "react"
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { Calendar, MapPin, Building, Award, ChevronDown, ChevronUp, Download } from 'lucide-react'

type ExperienceItem = {
  title: string
  company: string
  location: string
  period: string
  type: string
  description: string
  achievements: string[]
  technologies: string[]
  color: string // Tailwind gradient e.g. "from-purple-500 to-pink-500"
}

const EXPERIENCES: ExperienceItem[] = [
  {
    title: "Frontend Developer",
    company: "Algeo Inc",
    location: "Remote",
    period: "01/04/2024 - Jan 2025",
    type: "Internship",
    description:
      "Developed responsive web applications and collaborated with design teams to create exceptional user experiences.",
    achievements: [
      "Built 10+ responsive websites",
      "Improved user engagement by 35%",
      "Implemented modern design systems",
      "Optimized loading speeds by 50%",
    ],
    technologies: [
      "React",
      "Javascript",
      "Tailwind CSS",
      "Next.js",
      "Ant Design",
      "Framer Motion",
      "Redux",
      "Google Maps API",
      "API Integration",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Junior Frontend Developer",
    company: "SM Technologies",
    location: "Banasree, Dhaka",
    period: "Mach 2025 - Present",
    type: "Full-time",
    description:
      "Developed responsive web applications and api integration using Redux and Next.js framework and collaborated with design teams to create exceptional user experiences.",
    achievements: [
      "Delivered 12+ client projects",
      "Learned Next.js, Redux , TypeScript and API integration",
      "Collaborated with cross-functional teams",
      "Maintained 98% client satisfaction",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Javascript",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "WebSockets",
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "API Integration",
      "Ant Design",
      "Framer Motion",
    ],
    color: "from-emerald-500 to-teal-500",
  },
]

export default function ExperienceSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null)

  // Scroll-driven vertical progress line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 10%", "end 80%"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 })

  return (
    <section id="experience" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My journey through the tech industry, building innovative solutions and growing as a developer.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Base timeline line */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500/70 opacity-20 pointer-events-none" />

          {/* Scroll progress overlay */}
          <motion.div
            style={{ scaleY: progress }}
            className="absolute origin-top left-5 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <button
              type="button"
              className="inline-flex items-center px-8 py-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 active:scale-[0.99] transition"
              onClick={() => {
                // Replace with your resume link
                window.open("https://drive.google.com/file/d/1jlCaWSemEyphnvqytkdm6cZ1D1pY5Zeh/view?usp=sharing", "_blank", "noopener,noreferrer")
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Full Resume
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const shouldReduce = useReducedMotion()
  const [open, setOpen] = React.useState(index === 0) // open first by default on desktop
  const cardRef = React.useRef<HTMLDivElement | null>(null)

  // Subtle 3D hover tilt (disabled if reduced motion)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-6, 6])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduce) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    tiltX.set(px)
    tiltY.set(py)
  }
  const handlePointerLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative flex flex-col items-start md:items-center ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline Dot */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        className={`absolute left-5 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 z-10 bg-gradient-to-r ${exp.color}`}
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-purple-500/30" />
      </motion.div>

      {/* Content Card */}
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={shouldReduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" as any }}
        whileHover={shouldReduce ? { y: -6 } : { y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`w-full md:w-1/2 md:ml-12 ${
          index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
        }`}
      >
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg ring-1 ring-gray-100 dark:ring-gray-700 ${
            index % 2 === 0 ? "md:mr-6 lg:mr-8" : ""
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{exp.title}</h3>
              <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <Building className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="font-medium">{exp.company}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
                  {exp.period}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
                  {exp.location}
                </div>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r whitespace-nowrap ${exp.color}`}
              aria-label={`Position type: ${exp.type}`}
            >
              {exp.type}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{exp.description}</p>

          {/* Expand/Collapse Toggle - visible on mobile, optional on desktop */}
          <div className="flex items-center justify-between mb-2 md:hidden">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Details</span>
            <button
              type="button"
              className="inline-flex items-center h-8 px-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
              aria-expanded={open}
              aria-controls={`exp-${index}-details`}
              onClick={() => setOpen((s) => !s)}
            >
              {open ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show
                </>
              )}
            </button>
          </div>

          {/* Details: Achievements + Technologies */}
          <AnimatePresence initial={false}>
            {(open || typeof window === "undefined") && (
              <motion.div
                id={`exp-${index}-details`}
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                {/* Achievements */}
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2" aria-hidden="true" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="text-sm text-gray-700 dark:text-gray-300 flex items-start"
                      >
                        <span
                          className={`w-1.5 h-1.5 mt-2 mr-2 rounded-full bg-gradient-to-r flex-shrink-0 ${exp.color}`}
                        />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies - horizontally scrollable and draggable */}
                <div className="mt-4">
                  <h5 className="sr-only">Technologies</h5>
                  <div className="relative">
                    <motion.div
                      className="flex gap-2 overflow-x-auto py-1 pr-2"
                      drag="x"
                      dragConstraints={{ left: -120, right: 0 }}
                      dragElastic={0.08}
                      whileTap={{ cursor: "grabbing" }}
                    >
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={`${tech}-${i}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 }}
                          whileHover={{ scale: 1.06 }}
                          className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-xs font-medium whitespace-nowrap"
                          role="listitem"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop helper toggle */}
          <div className="mt-3 hidden md:block">
            <button
              type="button"
              className="inline-flex items-center h-8 px-2 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
              aria-expanded={open}
              aria-controls={`exp-${index}-details`}
              onClick={() => setOpen((s) => !s)}
            >
              {open ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Hide details
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show details
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
