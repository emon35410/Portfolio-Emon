import { motion } from 'framer-motion'
import { GraduationCap, MapPin, BookOpen, Award, Code2 } from 'lucide-react'

const Education = () => {
  const educationData = [
    {
      type: "Academic",
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "Metropolitan University, Sylhet",
      period: "2023 — Present (4th Year / 1st Semester)",
      location: "Sylhet, Bangladesh",
      description: "Focusing on Software Engineering, Data Structures, and Web Technologies. Currently working on final year research/project.",
      skills: ["Data Structures", "Algorithms", "DBMS", "Artificial Intelligence"]
    },
    {
      type: "Certification",
      degree: "Complete Web Development (Level-1)",
      institution: "Programming Hero",
      period: "Running (90% Completed)",
      location: "Online (Jhankar Mahbub)",
      description: "Intensive training on MERN Stack (MongoDB, Express, React, Node.js). Working on various full-stack industry projects.",
      skills: ["React.js", "Firebase", "Tailwind CSS", "Node.js","MongoDB"],
      progress: 90 
    }
  ]

  // Optimized Container Variants for Staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  }

  // Optimized Card Variants with smooth easing
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  }

  return (
    <section id="education" className="py-14 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 blur-[120px] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-bold text-white mb-4">Academic & Training</h3>
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        </motion.div>

        {/* Education List with Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group p-8 rounded-[2.5rem] bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 hover:border-green-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
            >
              {/* Background Icon Decoration */}
              <div className="absolute -right-8 -top-8 text-white/5 group-hover:text-green-500/10 transition-all duration-700 group-hover:rotate-12">
                {edu.type === "Academic" ? <GraduationCap size={200} /> : <Award size={200} />}
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="p-3 bg-green-500/10 rounded-2xl text-green-500 group-hover:scale-110 transition-transform duration-500">
                    {edu.type === "Academic" ? <GraduationCap size={32} /> : <Code2 size={32} />}
                  </div>
                  <span className="px-4 py-1.5 bg-green-500 text-black text-[10px] font-black rounded-lg uppercase tracking-[0.1em] shadow-lg">
                    {edu.period}
                  </span>
                </div>

                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors italic">
                  {edu.degree}
                </h4>
                <p className="text-lg text-gray-300 font-medium flex items-center gap-2 mb-4">
                  <BookOpen size={18} className="text-green-500" /> {edu.institution}
                </p>

                {/* Progress Bar with Staggered Load */}
                {edu.progress && (
                  <div className="mb-6 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span className="font-bold uppercase tracking-widest">Course Completion</span>
                      <span className="text-green-500 font-black">{edu.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${edu.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                        className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5"><MapPin size={16} className="text-green-500" /> {edu.location}</span>
                </div>

                <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl text-md">
                  {edu.description}
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {edu.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-[10px] uppercase tracking-[0.15em] font-black px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/40 group-hover:border-green-500/20 group-hover:text-green-400 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Education