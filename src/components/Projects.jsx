import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const ref = useRef(null)
  // threshold set kora hoyeche jate mobile-e smoothly trigger hoy
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    // bg-surface ke change kore bg-slate-900/20 dewa hoyeche
    <section id="projects" className="py-14 bg-slate-900/20 relative overflow-hidden" ref={ref}>
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-bold tracking-tight text-white mb-4">Featured Work</h3>
          {/* bg-primary ke green-500 kora hoyeche safety-r jonno */}
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg leading-relaxed">
            From concept to code, here are some of my favorite projects that showcase my frontend skills.
          </p>
        </motion.div>

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
              whileHover={{ y: -10 }}
              className="group relative flex flex-col bg-slate-800/40 border border-white/10 rounded-[2rem] overflow-hidden hover:border-green-500/40 transition-all duration-500 shadow-xl"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="flex gap-4">
                     <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-3 bg-green-500 rounded-full text-black hover:scale-110 transition-transform"><ExternalLink size={20}/></a>
                     <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:scale-110 transition-transform border border-white/20"><Github size={20}/></a>
                   </div>
                </div>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-green-400 border border-green-500/20 font-bold uppercase tracking-widest">
                  {project.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors italic">
                  {project.title}
                </h4>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-[11px] font-medium text-white/50 bg-white/5 px-3 py-1 rounded-lg border border-white/5 group-hover:border-green-500/20 group-hover:text-green-400 transition-all">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-black rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
                  >
                    View Project <ExternalLink size={14} />
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