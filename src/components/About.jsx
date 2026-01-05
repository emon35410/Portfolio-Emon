import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Smartphone, Zap, Heart, History, Trophy } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Building fast and scalable websites using modern stacks like React and Tailwind.',
      delay: 0
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Ensuring your website looks perfect on every screen size, from mobile to desktop.',
      delay: 0.1
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing code and assets to ensure the fastest loading times for your users.',
      delay: 0.2
    }
  ]

  return (
    <section id="about" className="py-24 bg-surface/30" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">About Me</h3>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Programming Journey & Personality */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-2xl font-semibold text-primary">My Journey & Personality</h4>
            <p className="text-white/70 leading-relaxed text-lg">
              Hi, I&apos;m <span className="text-white font-medium">Mahmudul Hasan Emon</span>. My programming journey started with a simple curiosity about how the web works. What began as an interest in HTML/CSS soon turned into a passion for building complex, interactive interfaces with <span className="text-white">React</span>.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              I truly enjoy the challenge of taking a blank screen and turning it into a functional digital experience. I&apos;m a perfectionist when it comes to <span className="text-white">UI/UX</span>—I believe that every pixel and every animation should serve a purpose to help the user.
            </p>
          </motion.div>

          {/* Hobbies & Interests */}
          {/* Hobbies & Interests */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 p-8 rounded-3xl border border-white/10"
          >
            <h4 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">
              <Heart className="text-primary" /> Outside of Coding
            </h4>
            <div className="space-y-8">

              {/* Football */}
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all">
                  <Trophy className="text-primary" size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-white">Football Enthusiast</h5>
                  <p className="text-white/60 text-sm leading-relaxed">
                    The teamwork and strategy on the field fascinate me. Whether playing or watching, it's my go-to way to stay energetic.
                  </p>
                </div>
              </div>

              {/* Islamic History - Updated */}
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-all">
                  <History className="text-emerald-500" size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-white">Islamic History Buff</h5>
                  <p className="text-white/60 text-sm leading-relaxed">
                    I have a deep fascination with <span className="text-emerald-400">Islamic History</span>. Exploring the Golden Age, the legacy of great leaders, and the rich cultural heritage helps me gain wisdom and a broader perspective on life.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: service.delay + 0.6 }}
                whileHover={{
                  y: -10,
                  borderColor: 'rgba(var(--primary-rgb), 0.5)',
                  transition: { duration: 0.3 }
                }}
                className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all group relative overflow-hidden"
              >
                <div className="text-primary mb-4 block">
                  <IconComponent size={40} />
                </div>
                <h4 className="font-semibold mb-2 text-white">{service.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>

                {/* Subtle Hover Background */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About