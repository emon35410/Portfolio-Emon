import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' }
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

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
    setIsOpen(false) // Menu bondho hobe
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
      // Z-index ke maximum (9999) kora hoyeche
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${
        scrolled 
          ? 'bg-[#030014]/90 backdrop-blur-xl border-b border-white/10 py-3' 
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="https://i.ibb.co.com/p6qj5mHp/Gemini-Generated-Image-klz7b7klz7b7klz7.png"
            alt="Emon Logo"
            className="w-10 h-10 object-contain rounded-lg"
          />
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            EMON<span className="text-green-500">.</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeSection === item.href.substring(1) 
                  ? 'bg-green-500 text-black' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Button - Relative z-index add kora hoyeche */}
        <button
          className="md:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10 relative z-[10000]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay - pointer-events fix */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#030014]/95 backdrop-blur-3xl border-b border-white/10 md:hidden shadow-2xl z-[9999] pointer-events-auto"
          >
            <div className="flex flex-col p-8 gap-6 items-center">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-xl font-bold tracking-widest uppercase transition-all w-full py-4 rounded-xl ${
                    activeSection === item.href.substring(1) 
                      ? 'text-green-500 bg-white/5 shadow-inner' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar