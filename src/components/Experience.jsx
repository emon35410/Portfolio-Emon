import { motion } from 'framer-motion'
import {
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Database,
  FileSearch,
  Building2,
  Calendar,
  Sparkles,
  Users
} from 'lucide-react'
import { HackerText } from './HackerText'
import { SpotlightCard } from './SpotlightCard'

const experiences = [
  {
    role: "School Teacher",
    company: "Shahid Cadet School & College",
    period: "Sep 2023 — Present",
    isCurrent: true,
    icon: GraduationCap,
    description:
      "Fostered dynamic learning environments, improved student engagement, and mastered advanced communication, mentorship, and leadership skills.",
    points: [
      { text: "Delivered structured lessons and broke down complex topics clearly.", icon: CheckCircle2 },
      { text: "Managed student academic tracking, assessments, and structured records.", icon: Database },
      { text: "Built exceptional public speaking, interpersonal, and team leadership skills.", icon: Users }
    ],
    skills: ["Leadership", "Public Speaking", "Instructional Design", "Mentorship", "Classroom Management"]
  },
  {
    role: "Medical Billing Agent",
    company: "IntelliGency Solutions",
    period: "Oct 2024 — Dec 2024",
    isCurrent: false,
    icon: Briefcase,
    description:
      "Specialized in high-precision healthcare data auditing, insurance claim verification, and systematic resolution of complex billing discrepancies.",
    points: [
      { text: "Audited and resolved medical billing discrepancies with high precision.", icon: FileSearch },
      { text: "Handled sensitive health records with 100% data confidentiality and integrity.", icon: Database },
      { text: "Optimized operational record management and claims auditing workflows.", icon: CheckCircle2 }
    ],
    skills: ["Data Auditing", "Records Integrity", "Discrepancy Resolution", "HIPAA Compliance", "Analytical Problem-Solving"]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

const Experience = () => {
  return (
    <div id="experience" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,100vw)] h-[500px] bg-emerald-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '8s' }} />
            <span>Journey So Far</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tight">
            <HackerText text="Professional Experience" speed={28} />
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-green-400 mt-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        </motion.div>

        {/* Experience Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch"
        >
          {experiences.map((exp, expIndex) => {
            const Icon = exp.icon

            return (
              <motion.div key={expIndex} variants={cardVariants} className="h-full">
                <SpotlightCard
                  enableTilt={false}
                  spotlightColor="rgba(16, 185, 129, 0.14)"
                  className="relative h-full flex flex-col justify-between p-6 sm:p-8 md:p-9 rounded-3xl bg-[#070d1b]/90 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 shadow-2xl overflow-hidden group"
                >
                  {/* Background Watermark Icon */}
                  <div className="absolute -right-6 -top-6 text-white/[0.02] group-hover:text-emerald-500/[0.06] group-hover:scale-105 group-hover:rotate-6 transition-all duration-700 pointer-events-none select-none">
                    <Icon size={190} strokeWidth={1} />
                  </div>

                  {/* Card Content Top */}
                  <div className="relative z-10">
                    {/* Header Row: Icon + Timeline Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-400/60 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                        <Icon size={26} strokeWidth={1.8} />
                      </div>

                      {exp.isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{exp.period}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-white/5 text-gray-300 border border-white/10">
                          <Calendar size={12} className="text-gray-400" />
                          <span>{exp.period}</span>
                        </span>
                      )}
                    </div>

                    {/* Role & Company */}
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                        {exp.role}
                      </h4>
                      <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-400/90 mt-1">
                        <Building2 size={13} className="text-emerald-400 flex-shrink-0" />
                        <span>{exp.company}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-xs sm:text-sm text-gray-300/90 leading-relaxed italic border-l-2 border-emerald-500/40 pl-3.5 bg-white/[0.01] py-1 rounded-r-lg">
                      &quot;{exp.description}&quot;
                    </p>

                    {/* Responsibility Points */}
                    <div className="space-y-2.5 mt-6 border-t border-white/5 pt-6">
                      {exp.points.map((item, idx) => {
                        const PointIcon = item.icon
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-300"
                          >
                            <PointIcon size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-[13px] text-gray-300 font-medium leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Skills / Badges Footer */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] sm:text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default Experience
