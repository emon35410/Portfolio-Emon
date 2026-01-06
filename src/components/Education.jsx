import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react'

const Education = () => {
  const educationData = [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "Metropolitan University, Sylhet",
      period: "2023 — Present (4th Year / 1st Semester)",
      location: "Sylhet, Bangladesh",
      description: "Focusing on Software Engineering, Data Structures, and Web Technologies. Currently working on final year research/project.",
      cgpa: "Current Semester: 4th Year / 2nd Semester", // Apni ekhane CGPA add korte paren
      skills: ["Data Structures", "Algorithms", "Software Engineering", "Database Management"]
    }
  ]

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-bold text-white mb-4">Education</h3>
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-green-500/30 transition-all shadow-2xl overflow-hidden"
            >
              {/* Decorative Icon */}
              <div className="absolute -right-8 -top-8 text-white/5 group-hover:text-green-500/10 transition-colors">
                <GraduationCap size={200} />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="p-3 bg-green-500/10 rounded-2xl text-green-500">
                    <GraduationCap size={32} />
                  </div>
                  <span className="px-4 py-1 bg-green-500 text-black text-xs font-bold rounded-full uppercase tracking-tighter">
                    {edu.period}
                  </span>
                </div>

                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {edu.degree}
                </h4>
                <p className="text-lg text-gray-300 font-medium flex items-center gap-2 mb-4">
                  <BookOpen size={18} className="text-green-500" /> {edu.institution}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5"><MapPin size={16} /> {edu.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={16} /> Enrolled 2021</span>
                </div>

                <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl">
                  {edu.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {edu.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white/60 group-hover:border-green-500/20 group-hover:text-green-400 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education