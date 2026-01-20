import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Send, Mail, MapPin,  
  Github, Linkedin, Facebook, Instagram, Phone
} from 'lucide-react'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const mailtoLink = `mailto:mhhsan341@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
    window.location.href = mailtoLink
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mhhsan341@gmail.com', color: 'text-green-500' },
    { icon: MapPin, label: 'Location', value: 'Sylhet, Bangladesh', color: 'text-green-500' }
  ]

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/emon35410', color: 'hover:border-green-500' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/mahmudul-hasan-emon-mhe/', color: 'hover:border-blue-500' },
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/mahmudulhasanemon354', color: 'hover:border-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/ertugrul_emon_10/', color: 'hover:border-pink-500' }
  ]

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section id="contact" className="py-10 bg-[#0f172a]/20 relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/5 blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">
            Let&apos;s Work Together
          </h3>
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
          <p className="text-gray-400 mt-6 max-w-lg mx-auto text-lg">
            Currently available for freelance work and full-time positions. Have a project in mind? Let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Full Name</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-2xl focus:border-green-500/50 focus:bg-green-500/5 outline-none transition-all text-white placeholder-white/10"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Email Address</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className="w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-2xl focus:border-green-500/50 focus:bg-green-500/5 outline-none transition-all text-white placeholder-white/10"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Subject</label>
                <input
                  type="text" name="subject" value={formData.subject} onChange={handleInputChange} required
                  className="w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-2xl focus:border-green-500/50 focus:bg-green-500/5 outline-none transition-all text-white placeholder-white/10"
                  placeholder="Project Inquiry"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Message</label>
                <textarea
                  name="message" rows="4" value={formData.message} onChange={handleInputChange} required
                  className="w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-2xl focus:border-green-500/50 focus:bg-green-500/5 outline-none transition-all text-white placeholder-white/10 resize-none"
                  placeholder="Describe your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit" disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_10px_30px_-10px_rgba(34,197,94,0.5)] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? "Opening Email..." : <><Send size={18} strokeWidth={3} /> Send Message</>}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <div className="grid gap-4">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx} variants={itemVariants}
                  className="flex items-center gap-5 p-6 bg-white/[0.03] rounded-[2rem] border border-white/5 hover:border-green-500/20 transition-all group"
                >
                  <div className="w-10 h-10 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                    <info.icon size={25} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">{info.label}</p>
                    <p className="text-white font-bold text-lg">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              variants={itemVariants}
              href="https://wa.me/8801886927118" target="_blank" rel="noreferrer"
              className="flex items-center gap-5 p-6 bg-green-500/5 rounded-[2rem] border border-green-500/10 hover:border-green-500/40 hover:bg-green-500/10 transition-all group"
            >
              <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center text-black shadow-lg">
                <Phone size={25} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500/60">WhatsApp Now</p>
                <p className="text-white font-bold text-lg">+880 1886927118</p>
              </div>
            </motion.a>

            <motion.div variants={itemVariants} className="pt-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-6 ml-1">Social Connect</h5>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx} href={social.url} target="_blank" rel="noreferrer"
                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    className={`flex items-center gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-2xl transition-all ${social.color} group`}
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact