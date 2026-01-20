import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
// 1. Import Formspree hooks
import { useForm, ValidationError } from '@formspree/react'
import {
  Send, Mail, MapPin,
  Github, Linkedin, Facebook, Instagram, Phone, CheckCircle2
} from 'lucide-react'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  // 2. Initialize Formspree hook
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_KEY);

  // Keep local state for the inputs so the UI stays responsive
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mhhsan341@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Sylhet, Bangladesh' }
  ]

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/emon35410', color: 'hover:border-green-500' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/mahmudul-hasan-emon-mhe/', color: 'hover:border-blue-500' },
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/mahmudulhasanemon354', color: 'hover:border-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/ertugrul_emon_10/', color: 'hover:border-pink-500' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#0a0f1a] relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-green-500/10 blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 md:mb-20"
        >
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 italic tracking-tight">
            Let&apos;s Work Together
          </h3>
          <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
          <p className="text-slate-400 mt-8 max-w-2xl mx-auto text-base md:text-xl leading-relaxed">
            Currently available for freelance work and full-time positions. Have a project in mind? Let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white/[0.02] backdrop-blur-md p-6 md:p-10 rounded-[2rem] border border-white/5 shadow-xl min-h-[500px] flex flex-col justify-center"
          >
            {/* 3. Handle Success UI */}
            {state.succeeded ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                  <CheckCircle2 size={48} />
                </div>
                <h4 className="text-2xl font-bold text-white">Message Sent!</h4>
                <p className="text-slate-400">Thanks for reaching out, I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input
                      id="name" type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      className="w-full px-5 py-4 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 outline-none transition-all text-slate-200 placeholder-slate-700"
                      placeholder="Your Name"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input
                      id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className="w-full px-5 py-4 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 outline-none transition-all text-slate-200 placeholder-slate-700"
                      placeholder="your@email.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                  <input
                    id="subject" type="text" name="subject" value={formData.subject} onChange={handleInputChange} required
                    className="w-full px-5 py-4 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 outline-none transition-all text-slate-200 placeholder-slate-700"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                  <textarea
                    id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} required
                    className="w-full px-5 py-4 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 outline-none transition-all text-slate-200 placeholder-slate-700 resize-none"
                    placeholder="Tell me about your vision..."
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" disabled={state.submitting}
                  className="w-full bg-green-500 hover:bg-green-400 text-slate-950 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {state.submitting ? "Sending..." : <><Send size={18} /> Send Message</>}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Details side remains the same */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 space-y-6 md:space-y-8"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx} variants={itemVariants}
                  className="flex items-center gap-5 p-3 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-green-500/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                    <info.icon size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{info.label}</p>
                    <p className="text-slate-200 font-medium text-sm md:text-base truncate">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              variants={itemVariants}
              href="https://wa.me/8801886927118" target="_blank" rel="noreferrer"
              className="flex items-center gap-5 p-5 bg-green-500/5 rounded-2xl border border-green-500/10 hover:border-green-500/40 hover:bg-green-500/10 transition-all group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-slate-950 shadow-md shrink-0">
                <Phone size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-500/80">WhatsApp Now</p>
                <p className="text-slate-200 font-bold text-lg">+880 1886927118</p>
              </div>
            </motion.a>

            <motion.div variants={itemVariants} className="pt-2">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 ml-1">Connect with me</h5>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx} href={social.url} target="_blank" rel="noreferrer"
                    whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.04)' }}
                    className={`flex items-center justify-center sm:justify-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl transition-all ${social.color} group`}
                  >
                    <social.icon size={15} className="text-slate-400 group-hover:text-inherit transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-tighter text-slate-400 group-hover:text-slate-100 transition-colors">{social.name}</span>
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