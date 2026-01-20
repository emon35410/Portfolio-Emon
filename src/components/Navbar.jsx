import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Home, User, Briefcase,
  Code2, GraduationCap, MessageSquare,
  History, 
  Award
} from 'lucide-react'

// navItems list
const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#experience', label: 'Experience', icon: History }, 
  { href: '#skills', label: 'Skills', icon: Code2 },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#education', label: 'Education', icon: GraduationCap },
  { href: '#recognitions', label: 'Recognitions', icon: Award }, 
  { href: '#contact', label: 'Contact', icon: MessageSquare }
]

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
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setIsOpen(false)
    const sectionId = href.replace('#', '')
    const element = document.getElementById(sectionId)

    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${scrolled
          ? 'bg-[#030014]/90 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent border-b border-transparent py-5'
        }`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="https://i.ibb.co.com/p6qj5mHp/Gemini-Generated-Image-klz7b7klz7b7klz7.png"
            alt="Logo"
            className="w-10 h-10 object-contain rounded-lg shadow-lg shadow-green-500/20"
          />
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            EMON<span className="text-green-500">.</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
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
          className="lg:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10 relative z-[10000]"
          onClick={() => setIsOpen(!isOpen)}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-full left-0 w-full bg-[#030014] border-b border-white/10 lg:hidden shadow-2xl z-[9999] pointer-events-auto"
            >
              <div className="flex flex-col p-6 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(item.href);
                      }}
                      className={`flex items-center gap-4 text-lg font-semibold transition-all w-full p-4 rounded-xl active:scale-95 ${activeSection === item.href.substring(1)
                          ? 'text-green-500 bg-white/5'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <Icon size={20} className={activeSection === item.href.substring(1) ? 'text-green-500' : 'text-white/40'} />
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