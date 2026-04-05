import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiHtml5, SiCss3, SiTailwindcss, SiJavascript,
  SiReact, SiNextdotjs, SiExpress, SiMongodb, SiNodedotjs,
  SiFigma, SiPostman, SiZap
} from 'react-icons/si'
import { FaGitAlt, FaGithub } from 'react-icons/fa'
import { BiLogoNetlify, BiLogoVisualStudio } from 'react-icons/bi'
import { IoLogoVercel } from 'react-icons/io5'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const frontendSkills = [
    { name: 'HTML5', icon: SiHtml5, color: 'text-[#E34F26]' },
    { name: 'CSS3', icon: SiCss3, color: 'text-[#1572B6]' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
    { name: 'JavaScript', icon: SiJavascript, color: 'text-[#F7DF1E]' },
    { name: 'React', icon: SiReact, color: 'text-[#61DAFB]' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
  ]

  const backendSkills = [
    { name: 'Node.js', icon: SiNodedotjs, color: 'text-[#339933]' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-[#47A248]' },
    { name: 'Express.js', icon: SiExpress, color: 'text-gray-400' }
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

  const allSkills = [...frontendSkills, ...backendSkills, ...tools];

  // Modified SkillCard: Only Icon and Name
  const SkillCard = ({ skill, index }) => {
    const Icon = skill.icon
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.05,
          ease: "easeOut"
        }}
        whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
        className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-all flex items-center gap-4 group"
      >
        <div className={`text-3xl ${skill.color} transition-transform group-hover:scale-110 duration-300`}>
          <Icon />
        </div>
        <span className="font-medium text-white/80 text-sm tracking-wide">{skill.name}</span>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold italic text-white uppercase tracking-tighter">Technical Expertise</h3>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
        </motion.div>

        {/* Frontend Grid */}
        <div className="mb-10">
          <h4 className="text-sm font-semibold mb-6 text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">
            Frontend
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {frontendSkills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}
          </div>
        </div>

        {/* Backend Grid */}
        <div className="mb-16">
          <h4 className="text-sm font-semibold mb-6 text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">
            Backend & DB
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {backendSkills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}
          </div>
        </div>

        {/* Infinite Marquee */}
        <div className="relative py-12 border-y border-white/5 bg-white/[0.005] overflow-hidden mb-16">
          <div className="flex">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
              className="flex whitespace-nowrap gap-20 items-center"
            >
              {[...allSkills, ...allSkills].map((skill, index) => (
                <div key={index} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
                  <skill.icon className={`text-4xl ${skill.color}`} />
                  <span className="text-white text-xs font-bold tracking-widest uppercase italic">{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="text-center">
          <h4 className="text-[10px] font-bold mb-10 text-white/30 tracking-[0.4em] uppercase">Tools & Environment</h4>
          <div className="flex flex-wrap justify-center gap-8">
            {tools.map((tool, index) => {
              const ToolIcon = tool.icon
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.05 + 0.5 }}
                  className="group flex flex-col items-center gap-2"
                >
                  <ToolIcon className={`text-3xl ${tool.color} opacity-50 group-hover:opacity-100 transition-all`} />
                  <span className="text-[9px] text-white/20 group-hover:text-white/60 tracking-widest uppercase">{tool.name}</span>
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