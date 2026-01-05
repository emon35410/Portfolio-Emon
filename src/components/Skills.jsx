import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
// Real icons import korchi
import { 
  SiHtml5, SiCss3, SiTailwindcss, SiJavascript, 
  SiReact, SiNextdotjs, SiExpress, SiMongodb, SiNodedotjs 
} from 'react-icons/si'
import { 
  FaGitAlt, FaGithub, FaTerminal 
} from 'react-icons/fa'
import { BiLogoNetlify, BiLogoVisualStudio } from 'react-icons/bi'
import { IoLogoVercel } from 'react-icons/io5'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const programmingSkills = [
    { name: 'HTML5', level: 90, icon: SiHtml5, color: 'text-[#E34F26]' },
    { name: 'CSS3', level: 85, icon: SiCss3, color: 'text-[#1572B6]' },
    { name: 'Tailwind CSS', level: 80, icon: SiTailwindcss, color: 'text-[#06B6D4]' },
    { name: 'JavaScript', level: 75, icon: SiJavascript, color: 'text-[#F7DF1E]' },
    { name: 'React', level: 70, icon: SiReact, color: 'text-[#61DAFB]' },
    { name: 'Next.js', level: 60, icon: SiNextdotjs, color: 'text-white' },
    { name: 'Node.js', level: 55, icon: SiNodedotjs, color: 'text-[#339933]' },
    { name: 'MongoDB', level: 65, icon: SiMongodb, color: 'text-[#47A248]' },
    { name: 'Express.js', level: 55, icon: SiExpress, color: 'text-gray-400' }
  ]

  const tools = [
    { name: 'Git', icon: FaGitAlt, color: 'text-[#F05032]' },
    { name: 'GitHub', icon: FaGithub, color: 'text-white' },
    { name: 'VS Code', icon: BiLogoVisualStudio, color: 'text-[#007ACC]' },
    { name: 'Netlify', icon: BiLogoNetlify, color: 'text-[#00C7B7]' },
    { name: 'Vercel', icon: IoLogoVercel, color: 'text-white' }
  ]

  return (
    <section id="skills" className="py-24 bg-surface/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold">Technical Skills</h3>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Programming Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {programmingSkills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className={`text-3xl ${skill.color}`}>
                    <Icon />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-white/90">{skill.name}</span>
                      <span className="text-primary text-sm">{skill.level}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tools Section */}
        <div className="text-center">
          <h4 className="text-xl font-semibold mb-10 text-white/80 tracking-wide uppercase">Tools I Use</h4>
          <div className="flex flex-wrap justify-center gap-8">
            {tools.map((tool, index) => {
              const ToolIcon = tool.icon
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`text-4xl ${tool.color} transition-transform`}>
                    <ToolIcon />
                  </div>
                  <span className="text-xs text-white/40 group-hover:text-white transition-colors">{tool.name}</span>
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