import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

// navItems ke baire rakha best practice jate re-render issue na hoy
const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' }
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
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
  }, []) // Empty array ekhon safe, karon navItems baire

  const handleNavClick = (href) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-bgDark/80 backdrop-blur border-b border-white/10"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="https://i.ibb.co.com/p6qj5mHp/Gemini-Generated-Image-klz7b7klz7b7klz7.png"
            alt="Emon Logo"
            className="w-10 h-10 object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
          />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-sm">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`nav-link hover:text-primary transition-colors ${
                activeSection === item.href.substring(1) ? 'active text-primary' : 'text-white/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-16 right-0 w-64 h-screen bg-bgDark border-l border-white/10 md:hidden"
      >
        <div className="flex flex-col gap-6 p-6 text-sm">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`hover:text-primary transition-colors text-left ${
                activeSection === item.href.substring(1) ? 'text-primary font-bold' : 'text-white/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Navbar