import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Send, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram,
  Phone
} from 'lucide-react'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const mailtoLink = `mailto:mhhsan341@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
    
    window.location.href = mailtoLink

    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mhhsan341@gmail.com',
      color: 'text-primary'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sylhet, Bangladesh',
      color: 'text-primary'
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/emon35410',
      color: 'hover:border-primary'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/mahmudul-hasan-emon-mhe/',
      color: 'hover:border-blue-500'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/mahmudulhasanemon354',
      color: 'hover:border-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/ertugrul_emon_10/',
      color: 'hover:border-pink-500'
    }
  ]

  return (
    <section id="contact" className="py-24 bg-surface/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Fixing Let's work together error */}
          <h3 className="text-3xl md:text-4xl font-bold">
            Let&apos;s Work Together
          </h3>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-white/60 mt-6 max-w-lg mx-auto">
            Currently available for freelance work and full-time positions. Have a project in mind? Let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface/50 p-8 rounded-2xl border border-white/10"
          >
            <h4 className="text-xl font-semibold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                <MessageSquare size={16} />
              </span>
              Send Me a Message
            </h4>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-white/50 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-surface/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white placeholder-white/20"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-white/50 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-surface/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white placeholder-white/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-white/50 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-surface/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white placeholder-white/20"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-white/50 ml-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-surface/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white placeholder-white/20 resize-none"
                  placeholder="Briefly describe your project goals..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-black py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                    />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-semibold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                <Mail size={16} />
              </span>
              Get In Touch
            </h4>

            <div className="space-y-4 mb-10">
              {contactInfo.map((info, idx) => {
                const IconComponent = info.icon
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                    className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors"
                  >
                    <div className={`w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center ${info.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/40">{info.label}</p>
                      <p className="text-white/90 font-medium">{info.value}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8"
            >
              <motion.a
                whileHover={{ borderColor: 'rgba(34, 197, 94, 0.5)', backgroundColor: 'rgba(34, 197, 94, 0.05)' }}
                href="https://wa.me/8801886927118"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-green-500/50 hover:bg-green-500/5 transition-all group"
              >
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">WhatsApp</p>
                  <p className="text-white/90 font-medium">+880 1886927118</p>
                </div>
              </motion.a>
            </motion.div>

            <div>
              <h5 className="font-semibold text-white/90 mb-5 ml-1">Connect with social media</h5>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, idx) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 ${social.color} transition-all group`}
                    >
                      <IconComponent size={20} />
                      <span className="text-sm font-medium">{social.name}</span>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact