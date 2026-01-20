
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-white/5 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-green-500/10 blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          
          {/* Brand Logo Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-green-500/50" />
            <h2 className="text-xl font-black tracking-[0.2em] text-white uppercase italic">
              Emon<span className="text-green-500 not-italic">.</span>
            </h2>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-green-500/50" />
          </motion.div>

          {/* Social Links - Precise & Functional */}
          <nav className="flex items-center gap-10">
             <a 
               href="https://github.com/emon35410" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-gray-500 hover:text-green-500 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
             >
               Github
             </a>
             <a 
               href="https://www.linkedin.com/in/mahmudul-hasan-emon-mhe/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-gray-500 hover:text-green-500 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
             >
               LinkedIn
             </a>
             <a 
               href="mailto:mhhsan341@gmail.com" 
               className="text-gray-500 hover:text-green-500 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
             >
               Email
             </a>
          </nav>

          {/* Metadata Section */}
          <div className="flex flex-col items-center gap-3">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-gray-600 font-bold text-center"
            >
              Metropolitan University &bull; CSE Batch 58
            </motion.p>
            
            <div className="flex items-center gap-2 text-gray-500 text-[11px] font-medium">
              <span>&copy; {currentYear}</span>
              <span className="w-1 h-1 bg-gray-800 rounded-full" />
              <span className="flex items-center gap-1.5">
                Made with <Heart size={12} className="text-green-500 fill-green-500/20" /> by Emon
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer