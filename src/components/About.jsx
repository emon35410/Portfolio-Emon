import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Smartphone, Zap, Heart, History, Trophy, Star } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Building fast and scalable websites using modern stacks like React and Tailwind.',
      delay: 0.1
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Ensuring your website looks perfect on every screen size, from mobile to desktop.',
      delay: 0.2
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing code and assets to ensure the fastest loading times for your users.',
      delay: 0.3
    }
  ]

  return (
    <section id="about" className="py-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">About Me</h3>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
          
          {/* Journey Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide">
              <Star size={14} className="fill-primary" /> 
              <span>MERN STACK DEVELOPER</span>
            </div>

            <h4 className="text-3xl md:text-4xl font-extrabold text-white leading-[1.2]">
              Transforming Ideas into <br />
              <span className="text-primary italic">High-Performance</span> Solutions
            </h4>

            <div className="space-y-5 text-slate-400 text-lg leading-relaxed font-light">
              <p>
                Hi, I&apos;m <span className="text-white font-medium border-b border-primary/40">Mahmudul Hasan Emon</span>. 
                I specialize in developing dynamic and user-centric web applications using the <span className="text-white">MERN stack</span>. 
                My focus is always on delivering seamless digital experiences through clean and efficient code.
              </p>

              <p>
                Driven by a passion for continuous growth, I am currently exploring <span className="text-slate-200 font-semibold italic mr-2">Next.js</span> 
                 to bridge the gap between frontend excellence and robust backend architecture, aiming to evolve into a versatile 
                <span className="text-white"> Full-Stack Developer</span>.
              </p>
            </div>
          </motion.div>

          {/* Outside of Coding - Modern Minimalist Style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] rounded-full" />
            
            <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Heart className="text-primary fill-primary/20" size={24} /> 
              Outside the Workspace
            </h4>

            <div className="space-y-10">
              {/* Football Card */}
              <div className="flex gap-5 group/item">
                <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/10 group-hover/item:bg-primary transition-all duration-500">
                  <Trophy className="text-primary group-hover/item:text-black" size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-white text-lg">Football Enthusiast</h5>
                  <p className="text-slate-500 text-sm leading-relaxed mt-1">
                    I find great inspiration in the teamwork and strategic execution of football, balancing my analytical mind with the energy of the pitch.
                  </p>
                </div>
              </div>

              {/* History Card */}
              <div className="flex gap-5 group/item">
                <div className="w-12 h-12 shrink-0 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/10 group-hover/item:bg-emerald-500 transition-all duration-500">
                  <History className="text-emerald-500 group-hover/item:text-black" size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-white text-lg">Islamic History Buff</h5>
                  <p className="text-slate-500 text-sm leading-relaxed mt-1">
                    Fascinated by the <span className="text-emerald-400/80">Golden Age</span>, I study historical legacies to gain profound insights into leadership and cultural heritage.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: service.delay }}
              whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.04)" }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/40 transition-all duration-300 group"
            >
              <service.icon className="text-primary mb-6 group-hover:scale-110 transition-transform" size={36} />
              <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About