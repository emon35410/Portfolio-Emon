import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  SiHtml5, SiCss3, SiTailwindcss, SiJavascript, 
  SiReact, SiNextdotjs, SiExpress, SiMongodb, SiNodedotjs,
  SiFigma, SiPostman, 
  SiZap
} from 'react-icons/si'
import { FaGitAlt, FaGithub } from 'react-icons/fa'
import { BiLogoNetlify, BiLogoVisualStudio } from 'react-icons/bi'
import { IoLogoVercel } from 'react-icons/io5'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const frontendSkills = [
    { name: 'HTML5', level: 90, icon: SiHtml5, color: 'text-[#E34F26]' },
    { name: 'CSS3', level: 85, icon: SiCss3, color: 'text-[#1572B6]' },
    { name: 'Tailwind CSS', level: 80, icon: SiTailwindcss, color: 'text-[#06B6D4]' },
    { name: 'JavaScript', level: 75, icon: SiJavascript, color: 'text-[#F7DF1E]' },
    { name: 'React', level: 70, icon: SiReact, color: 'text-[#61DAFB]' },
    { name: 'Next.js', level: 60, icon: SiNextdotjs, color: 'text-white' },
  ]

  const backendSkills = [
    { name: 'Node.js', level: 55, icon: SiNodedotjs, color: 'text-[#339933]' },
    { name: 'MongoDB', level: 65, icon: SiMongodb, color: 'text-[#47A248]' },
    { name: 'Express.js', level: 55, icon: SiExpress, color: 'text-gray-400' }
  ]

  const tools = [
    { name: 'Git', icon: FaGitAlt, color: 'text-[#F05032]' },
    { name: 'GitHub', icon: FaGithub, color: 'text-white' },
    { name: 'VS Code', icon: BiLogoVisualStudio, color: 'text-[#007ACC]' },
    { name: 'Kiro', icon: SiZap, color: 'text-[#FFD700]' },
    { name: 'Figma', icon: SiFigma, color: 'text-[#F24E1E]' },
    { name: 'Postman', icon: SiPostman, color: 'text-[#FF6C37]' },
    { name: 'Netlify', icon: BiLogoNetlify, color: 'text-[#00C7B7]' },
    { name: 'Vercel', icon: IoLogoVercel, color: 'text-white' }
  ]

  const SkillCard = ({ skill, index }) => {
    const Icon = skill.icon
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }} // FADE UP: Start state
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1, // STAGGER: Items appear one by one
          ease: "easeOut"
        }}
        whileHover={{ y: -5 }}
        className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-primary/50 transition-all shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className={`text-3xl ${skill.color}`}><Icon /></div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-white/90 text-sm">{skill.name}</span>
              <span className="text-primary text-xs">{skill.level}%</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1.5, delay: 0.5 + (index * 0.1), ease: "circOut" }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-14 bg-surface/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading - FADE UP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold italic text-white">Technical Expertise</h3>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
        </motion.div>

        <div className="mb-12">
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg font-medium mb-6 text-white/60 border-l-4 border-primary pl-4"
          >
            Frontend Development
          </motion.h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {frontendSkills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}
          </div>
        </div>

        <div className="mb-20">
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg font-medium mb-6 text-white/60 border-l-4 border-primary pl-4"
          >
            Backend & Database
          </motion.h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {backendSkills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}
          </div>
        </div>

        {/* Tools Section - SCALE & FADE */}
        <div className="text-center pt-10 border-t border-white/5">
          <motion.h4 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-sm font-semibold mb-10 text-white/40 tracking-[0.2em] uppercase"
          >
            Tools & Environment
          </motion.h4>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {tools.map((tool, index) => {
              const ToolIcon = tool.icon
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }} // Added y: 20 for extra fade up
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20, 
                    delay: index * 0.1 + 0.8 
                  }}
                  whileHover={{ scale: 1.2 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className={`text-4xl ${tool.color} opacity-70 group-hover:opacity-100 transition-all`}>
                    <ToolIcon />
                  </div>
                  <span className="text-[10px] text-white/30 group-hover:text-white/80 transition-colors uppercase tracking-widest">
                    {tool.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills