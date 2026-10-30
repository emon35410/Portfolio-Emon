import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import {
  Send, Mail, MapPin, MessageCircle,
  Github, Linkedin, Facebook, Instagram, Phone, CheckCircle2, AlertCircle, Copy, Check
} from 'lucide-react'
import { HackerText } from './HackerText'

const EMAIL = 'mhhsan341@gmail.com'
const PHONE_DISPLAY = '+880 1886927118'
const PHONE_TEL = '+8801886927118'
const FORMSPREE_KEY = import.meta.env.VITE_FORMSPREE_KEY || ''

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Client-side validation with friendly, specific messages
const validate = (data) => {
  const errors = {}
  if (!data.name.trim()) errors.name = 'Please enter your name.'
  else if (data.name.trim().length < 2) errors.name = 'Name should be at least 2 characters.'

  if (!data.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = 'That email doesn\u2019t look right \u2014 e.g. you@example.com'

  if (!data.subject.trim()) errors.subject = 'Please add a short subject.'

  if (!data.message.trim()) errors.message = 'Please write a message.'
  else if (data.message.trim().length < 10) errors.message = 'Your message is a bit short \u2014 at least 10 characters, please.'
  return errors
}

const FieldError = ({ id, message }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        id={id}
        role="alert"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-1.5 text-red-400 text-xs mt-1 ml-1"
      >
        <AlertCircle size={12} className="shrink-0" /> {message}
      </motion.p>
    )}
  </AnimatePresence>
)

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  //  Formspree hook
  const [state, formspreeSubmit, resetFormspree] = useForm(FORMSPREE_KEY);
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [copied, setCopied] = useState(false)

  // Surface Formspree / network errors as a readable banner
  useEffect(() => {
    if (!state.errors) return
    const formErrors = state.errors.getFormErrors?.() || []
    if (formErrors.length) {
      setSubmitError(formErrors.map(e => e.message).join(' '))
    } else if (!(state.errors.getAllFieldErrors?.() || []).length) {
      setSubmitError('Something went wrong while sending your message.')
    }
  }, [state.errors])

  // Clear the form once the message is delivered
  useEffect(() => {
    if (state.succeeded) {
      setFormData(EMPTY_FORM)
      setTouched({})
      setErrors({})
      setSubmitError('')
    }
  }, [state.succeeded])

  const handleInputChange = (e) => {
    const next = { ...formData, [e.target.name]: e.target.value }
    setFormData(next)
    if (touched[e.target.name]) setErrors(validate(next))
    if (submitError) setSubmitError('')
  }

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }))
    setErrors(validate(formData))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(formData)
    setErrors(found)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(first)?.focus()
      return
    }

    if (!FORMSPREE_KEY) {
      setSubmitError('The contact form is temporarily unavailable.')
      return
    }

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setSubmitError('You appear to be offline. Check your connection and try again.')
      return
    }

    setSubmitError('')
    try {
      await formspreeSubmit(e)
    } catch {
      setSubmitError('Network error \u2014 your message could not be sent.')
    }
  }

  const handleSendAnother = () => {
    resetFormspree()
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, ariaLabel: `Send an email to ${EMAIL}` },
    { icon: Phone, label: 'Phone', value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}`, ariaLabel: `Call ${PHONE_DISPLAY}` },
    { icon: MapPin, label: 'Location', value: 'Sylhet, Bangladesh', href: null }
  ]

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/emon35410', color: 'hover:border-green-500' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/mahmudul-hasan-emon-mhe/', color: 'hover:border-blue-500' },
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/mahmudulhasanemon354', color: 'hover:border-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/ertugrul_emon_10/', color: 'hover:border-pink-500' },
    { name: 'Terminal IG', icon: Instagram, url: 'https://www.instagram.com/terminal_emon_06/', color: 'hover:border-emerald-500' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const inputClass = (field) =>
    `w-full px-4 sm:px-5 py-4 bg-slate-900/50 border rounded-xl outline-none transition-all text-base text-slate-200 placeholder-slate-600 ${
      touched[field] && errors[field]
        ? 'border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
        : 'border-slate-800 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20'
    }`

  const fieldProps = (field) => ({
    id: field,
    name: field,
    value: formData[field],
    onChange: handleInputChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(touched[field] && errors[field]),
    'aria-describedby': touched[field] && errors[field] ? `${field}-error` : undefined,
    className: inputClass(field),
  })

  return (
    <div className="py-16 md:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-green-500/10 blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto px-0 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 md:mb-20"
        >
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 italic tracking-tight">
            <HackerText text="Let's Work Together" speed={30} />
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
            className="lg:col-span-7 bg-white/[0.02] backdrop-blur-md p-5 sm:p-6 md:p-10 rounded-[2rem] border border-white/5 shadow-xl min-h-[500px] flex flex-col justify-center"
          >
            {/* Success UI */}
            {state.succeeded ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
                role="status"
                aria-live="polite"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                  <CheckCircle2 size={48} />
                </div>
                <h4 className="text-2xl font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Thanks for reaching out. I&apos;ve received your message and will reply to your inbox within 24&ndash;48 hours.
                </p>
                <button
                  type="button"
                  onClick={handleSendAnother}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 text-sm font-bold text-white transition-all"
                >
                  <Send size={16} /> Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Submission / network error banner */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      role="alert"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-300"
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <p>
                        {submitError}{' '}
                        Please try again, or email me directly at{' '}
                        <a href={`mailto:${EMAIL}`} className="underline font-semibold text-red-200 break-all">{EMAIL}</a>.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input type="text" autoComplete="name" placeholder="Your Name" {...fieldProps('name')} />
                    <FieldError id="name-error" message={touched.name && errors.name} />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" {...fieldProps('email')} />
                    <FieldError id="email-error" message={touched.email && errors.email} />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                  <input type="text" placeholder="Project Inquiry" {...fieldProps('subject')} />
                  <FieldError id="subject-error" message={touched.subject && errors.subject} />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                  <textarea rows="5" placeholder="Tell me about your vision..." {...fieldProps('message')} className={`${inputClass('message')} resize-none`} />
                  <FieldError id="message-error" message={touched.message && errors.message} />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" disabled={state.submitting}
                  className="w-full bg-green-500 hover:bg-green-400 text-slate-950 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : <><Send size={18} /> Send Message</>}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 space-y-6 md:space-y-8 min-w-0"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info) => {
                const Wrapper = info.href ? motion.a : motion.div
                return (
                  <Wrapper
                    key={info.label}
                    variants={itemVariants}
                    {...(info.href ? { href: info.href, 'aria-label': info.ariaLabel } : {})}
                    className={`flex items-center gap-4 sm:gap-5 p-3 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-green-500/30 transition-all group min-w-0 ${info.href ? 'cursor-pointer' : ''}`}
                  >
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 shrink-0 group-hover:bg-green-500 group-hover:text-slate-950 transition-colors">
                      <info.icon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{info.label}</p>
                      <p className="text-slate-200 font-medium text-sm md:text-base break-all group-hover:text-green-400 transition-colors">{info.value}</p>
                    </div>
                    {info.label === 'Email' && (
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyEmail() }}
                        aria-label={copied ? 'Email copied' : 'Copy email address'}
                        title={copied ? 'Copied!' : 'Copy email'}
                        className="p-2 rounded-lg text-slate-500 hover:text-green-400 hover:bg-white/5 transition-colors shrink-0"
                      >
                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    )}
                  </Wrapper>
                )
              })}
            </div>

            <motion.a
              variants={itemVariants}
              href={`https://wa.me/${PHONE_TEL.replace('+', '')}`} target="_blank" rel="noopener noreferrer"
              aria-label={`Chat on WhatsApp at ${PHONE_DISPLAY}`}
              className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-green-500/5 rounded-2xl border border-green-500/10 hover:border-green-500/40 hover:bg-green-500/10 transition-all group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-slate-950 shadow-md shrink-0">
                <MessageCircle size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-500/80">WhatsApp Now</p>
                <p className="text-slate-200 font-bold text-base sm:text-lg">{PHONE_DISPLAY}</p>
              </div>
            </motion.a>

            <motion.div variants={itemVariants} className="pt-2">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 ml-1">Connect with me</h5>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                    aria-label={`${social.name} (opens in a new tab)`}
                    whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.04)' }}
                    className={`flex items-center justify-center sm:justify-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl transition-all ${social.color} group min-w-0`}
                  >
                    <social.icon size={15} className="text-slate-400 group-hover:text-inherit transition-colors shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-tighter text-slate-400 group-hover:text-slate-100 transition-colors truncate">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
