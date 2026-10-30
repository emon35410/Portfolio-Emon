import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Home, User, Briefcase,
  Code2, GraduationCap, MessageSquare,
  History, 
  Award,
  BookOpen
} from 'lucide-react'
import Emon_logo from '../assets/Emon-logo.webp'


// navItems list
const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#experience', label: 'Experience', icon: History }, 
  { href: '#skills', label: 'Skills', icon: Code2 },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#education', label: 'Education', icon: GraduationCap },
  { href: '#publications', label: 'Publications', icon: BookOpen },
  { href: '#recognitions', label: 'Recognitions', icon: Award }, 
  { href: '#contact', label: 'Contact', icon: MessageSquare }
]

const BASE_TITLE = 'Mahmudul Hasan Emon | MERN Stack Developer Portfolio'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Descriptive page title for the section currently in view
  useEffect(() => {
    const item = navItems.find(i => i.href === `#${activeSection}`)
    document.title = !item || item.label === 'Home'
      ? BASE_TITLE
      : `${item.label} | Mahmudul Hasan Emon`
  }, [activeSection])

  // Mobile menu: lock background scroll, close on Escape / when resized to desktop
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    const onResize = () => { if (window.innerWidth >= 1024) setIsOpen(false) }

    window.lenis?.stop()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      window.lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [isOpen])

  const handleNavClick = (href) => {
    setIsOpen(false)
    const sectionId = href.replace('#', '')
    const element = document.getElementById(sectionId)

    if (element) {
      // Wait a tick so the scroll-lock from the mobile menu is released first
      requestAnimationFrame(() => {
        if (window.lenis) {
          window.lenis.start()
          window.lenis.scrollTo(element, { offset: -80, duration: 1.2 })
        } else {
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${scrolled || isOpen
          ? 'bg-[#030014]/90 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent border-b border-transparent py-5'
        }`}
    >
      <nav aria-label="Main navigation" className="relative z-10 max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6">
        {/* Logo */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
          aria-label="Emon — back to top"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={Emon_logo}
            alt="Emon logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain rounded-lg shadow-lg shadow-green-500/20"
          />
          <span className="font-bold text-xl italic tracking-tighter hidden sm:block">
            EMON<span className="text-green-500">.</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeSection === item.href.substring(1)
                  ? 'bg-green-500 text-black'
                  : 'text-white/70 hover:text-white'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="lg:hidden p-2.5 text-white bg-white/5 rounded-xl border border-white/10 relative z-[10000] active:scale-95 transition-transform"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-0 lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              data-lenis-prevent
              className="absolute top-full left-0 w-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-[#030014] border-b border-white/10 lg:hidden shadow-2xl pointer-events-auto z-20"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 p-4 sm:p-6 gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <button
                      key={item.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(item.href);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center gap-4 text-base font-semibold transition-all w-full px-4 py-3.5 rounded-xl active:scale-95 ${isActive
                          ? 'text-green-500 bg-white/5'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <Icon size={20} className={isActive ? 'text-green-500' : 'text-white/40'} />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
