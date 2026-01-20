import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const ref = useRef(null)
  // amount: 0.1 ensure trigger happens as soon as the section starts appearing
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const projects = [
    {
      title: 'Blood Heroes',
      category: 'MERN Stack',
      description: 'Connects blood donors and recipients with real-time requests. Features a complex dashboard for management.',
      image: 'https://i.ibb.co.com/n8PVP4TK/bloodherosemon-netlify-app-1.png',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      liveUrl: 'https://bloodherosemon.netlify.app/',
      githubUrl: 'https://github.com/emon35410/BloodHeros-Client',
    },
    {
      title: 'Home Nest',
      category: 'Real Estate',
      description: 'A premium property listing platform with secure authentication and advanced search filters.',
      image: 'https://i.ibb.co.com/S4By23j6/localhost-5173-3.png',
      technologies: ['React', 'Node.js', 'Firebase', 'Tailwind'],
      liveUrl: 'https://home-nest-mhe.netlify.app/',
      githubUrl: 'https://github.com/emon35410/HomeNest-Client.git',
    },
    {
      title: 'Hero UI',
      category: 'Creative Design',
      description: 'A sleek, tool-based web app focused on providing users with a smooth and responsive interface.',
      image: 'https://i.ibb.co.com/QFJMBMVk/luminous-tanuki-c653df-netlify-app.png',
      technologies: ['JavaScript', 'Tailwind', 'AOS'],
      liveUrl: 'https://luminous-tanuki-c653df.netlify.app/',
      githubUrl: 'https://github.com/emon35410/Assignment-8.git',
    }
  ]

  // Parent container animation logic
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.3 
      }
    }
  }

  // Individual card animation logic
  const cardVariants = {
    hidden: { opacity: 0, y: 40 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1] // Custom cubic-bezier for a "premium" feel
      } 
    }
  }

  return (
    <section id="projects" className="py-10 bg-slate-900/20 relative overflow-hidden" ref={ref}>
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Fades up independently */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Featured Work</h3>
          <div className="w-16 h-1.5 bg-green-500 mx-auto rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg leading-relaxed">
            From concept to code, here are some of my favorite projects that showcase my frontend skills.
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12 }} // Moves up slightly on hover
              className="group relative flex flex-col bg-[#0f172a]/60 backdrop-blur-sm border border-white/5 rounded-[2rem] overflow-hidden hover:border-green-500/30 transition-all duration-500 shadow-2xl"
            >
              {/* Image Section */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20">
                   <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-4 bg-green-500 rounded-full text-black hover:scale-110 transition-transform shadow-xl"><ExternalLink size={22}/></a>
                     <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-4 bg-white/10 backdrop-blur-xl rounded-full text-white hover:scale-110 transition-transform border border-white/20 shadow-xl"><Github size={22}/></a>
                   </div>
                </div>

                <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] text-green-400 border border-green-500/20 font-black uppercase tracking-[0.2em] z-10">
                  {project.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {project.title}
                </h4>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-[10px] font-bold text-white/40 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-green-500/10 group-hover:text-green-400 transition-all uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-500 text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-[0_10px_25px_-5px_rgba(34,197,94,0.4)] transition-all active:scale-95"
                  >
                    Live Preview <ExternalLink size={14} strokeWidth={3} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects