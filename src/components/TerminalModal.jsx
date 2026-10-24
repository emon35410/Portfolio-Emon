import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react'

const COMMANDS = {
  help: `Available commands:
  • about       - Quick overview about Emon
  • skills      - Technical stack & capabilities
  • projects    - Top featured engineering works
  • paper       - Research publication (EFAST 2026 / SSRN)
  • experience  - Professional journey & background
  • contact     - Contact details & social links
  • thor        - ⚡ Activate Thor God of Thunder FX
  • spiderman   - 🕷️ Activate Spider-Man Web Slinger FX
  • matrix      - 🟢 Restore Default Cyber Aesthetic
  • clear       - Clear the terminal console
  • exit        - Close the interactive terminal`,

  about: `Mahmudul Hasan Emon
Role: MERN Stack Developer & CSE Student (Metropolitan University, Batch 58)
Location: Sylhet, Bangladesh
Focus: High-performance web applications, clean architecture, and reactive UI/UX.`,

  skills: `FRONTEND:
  React.js, Next.js, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3, Framer Motion

BACKEND & DATABASE:
  Node.js, Express.js, MongoDB, RESTful APIs, Socket.io, Firebase

ENGINEERING & TOOLS:
  C, Flex, Bison, Git, GitHub, VS Code, Postman, Docker, Netlify, Vercel`,

  projects: `FEATURED PROJECTS:
  1. Red Avengers   - Smart AI Blood Donation System (Socket.io + Groq AI + MERN)
     URL: https://red-avengers.vercel.app
  2. Vortix Lang    - Custom Programming Language & Interpreter (C, Flex, Bison, Docker)
     URL: https://vortix-lang.onrender.com
  3. MockFlow API   - Developer SaaS for Mock REST Endpoints
     URL: https://emon-api-mocker-mvp.vercel.app
  4. Blood Heroes   - Donor & Recipient Matching Platform with RBAC
     URL: https://bloodherosemon.netlify.app`,

  paper: `RESEARCH PUBLICATION:
  Title: "Seeing Without Understanding: Large Language Model Evaluation of Mobile User Interface Quality, Failure Taxonomy, and Architectural Explanation"
  Venue: EFAST 2026 / SSRN Electronic Journal
  Impact: Evaluated 3 open-weight LLMs across 270,000 ratings on 15,000 RICO screens.
  Read paper: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6771787`,

  experience: `PROFESSIONAL EXPERIENCE:
  • Medical Billing Agent @ IntelliGency Solutions (Oct 2024 — Dec 2024)
    - High-precision data auditing and systematic resolution of billing discrepancies.
    - 100% integrity medical record management.`,

  contact: `GET IN TOUCH:
  • Email:    mhhsan341@gmail.com
  • Phone:    +880 1886927118
  • WhatsApp: https://wa.me/8801886927118
  • GitHub:   https://github.com/emon35410
  • LinkedIn: https://www.linkedin.com/in/mahmudul-hasan-emon-mhe/`,

  thor: `⚡ [ASGARDIAN OVERCHARGE]
  Thor: God of Thunder Mode ACTIVATED!
  Mjolnir's power surges through your screen.
  Click anywhere on the screen to strike with procedural lightning!`,

  spiderman: `🕷️ [SPIDER-VERSE PROTOCOL]
  Friendly Neighborhood Spider-Man Mode ACTIVATED!
  "With great power comes great responsibility."
  Click or drag anywhere to shoot web strands!`,

  spidey: `🕷️ [SPIDER-VERSE PROTOCOL]
  Friendly Neighborhood Spider-Man Mode ACTIVATED!
  "With great power comes great responsibility."
  Click or drag anywhere to shoot web strands!`,

  matrix: `🟢 [CYBER PROTOCOL]
  Default Cyber Matrix aesthetic restored.`,

  cyber: `🟢 [CYBER PROTOCOL]
  Default Cyber Matrix aesthetic restored.`
}

export const TerminalModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'EmonOS [Version 2026.1.0-STABLE]\nType "help" to explore available commands or "exit" to close.' }
  ])

  const inputRef = useRef(null)
  const terminalEndRef = useRef(null)

  // Keyboard shortcut listener: tilde (~) or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        // Prevent typing backtick into focused inputs if triggering
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          setIsOpen((prev) => !prev)
        }
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  // Scroll to bottom on history change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e) => {
    e.preventDefault()
    const trimmed = inputVal.trim()
    if (!trimmed) return

    const cmd = trimmed.toLowerCase()
    const newHistory = [...history, { type: 'user', text: `$ ${trimmed}` }]

    if (cmd === 'clear') {
      setHistory([])
      setInputVal('')
      return
    }

    if (cmd === 'exit') {
      setIsOpen(false)
      setInputVal('')
      return
    }

    if (COMMANDS[cmd]) {
      newHistory.push({ type: 'output', text: COMMANDS[cmd] })
      if (cmd === 'thor') {
        window.dispatchEvent(new CustomEvent('set-hero-mode', { detail: 'thor' }))
      } else if (cmd === 'spiderman' || cmd === 'spidey') {
        window.dispatchEvent(new CustomEvent('set-hero-mode', { detail: 'spiderman' }))
      } else if (cmd === 'matrix' || cmd === 'cyber') {
        window.dispatchEvent(new CustomEvent('set-hero-mode', { detail: 'cyber' }))
      }
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not found: "${trimmed}". Type "help" for a list of available commands.`
      })
    }

    setHistory(newHistory)
    setInputVal('')
  }

  return (
    <>
      {/* Floating Trigger Button (Bottom Left) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0a101e]/90 hover:bg-[#0f172a] border border-green-500/30 hover:border-green-500/60 shadow-lg shadow-green-500/10 text-xs font-mono text-green-400 backdrop-blur-md transition-all group"
        aria-label="Open Interactive Terminal"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <TerminalIcon size={14} className="text-green-400 group-hover:rotate-6 transition-transform" />
        <span className="font-bold tracking-wider hidden sm:inline">TERMINAL</span>
        <span className="text-[10px] bg-green-500/10 text-green-300 px-1.5 py-0.5 rounded border border-green-500/20">~</span>
      </motion.button>

      {/* Terminal Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`w-full bg-[#050814]/95 border border-green-500/30 rounded-2xl shadow-2xl flex flex-col font-mono overflow-hidden transition-all duration-300 ${
                isExpanded ? 'h-[90vh] max-w-5xl' : 'h-[520px] max-w-2xl'
              }`}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a101e] border-b border-white/10 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:opacity-100 opacity-80" onClick={() => setIsOpen(false)} />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer hover:opacity-100 opacity-80" onClick={() => setIsExpanded(!isExpanded)} />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer hover:opacity-100 opacity-80" onClick={() => setHistory([])} />
                  <span className="ml-3 text-xs text-white/60 font-semibold tracking-wide flex items-center gap-1.5">
                    <TerminalIcon size={13} className="text-green-500" />
                    emon@portfolio: ~ (bash)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white/50">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 hover:text-white transition-colors"
                    title={isExpanded ? 'Restore' : 'Maximize'}
                  >
                    {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:text-red-400 transition-colors"
                    title="Close (~)"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div
                className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3 text-xs md:text-sm text-gray-300"
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.type === 'user' && (
                      <p className="text-green-400 font-bold">{item.text}</p>
                    )}
                    {item.type === 'system' && (
                      <p className="text-white/40 italic whitespace-pre-line">{item.text}</p>
                    )}
                    {item.type === 'output' && (
                      <pre className="text-gray-300 whitespace-pre-wrap font-mono leading-relaxed pl-2 border-l-2 border-green-500/30">
                        {item.text}
                      </pre>
                    )}
                    {item.type === 'error' && (
                      <p className="text-red-400 font-medium pl-2 border-l-2 border-red-500/40">{item.text}</p>
                    )}
                  </div>
                ))}

                {/* Input Prompt */}
                <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
                  <span className="text-green-500 font-bold">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="type a command (e.g. 'help', 'projects', 'paper')..."
                    className="flex-1 bg-transparent text-green-300 placeholder-white/20 outline-none font-mono text-xs md:text-sm"
                    autoFocus
                  />
                  <button type="submit" className="text-white/30 hover:text-green-400 transition-colors">
                    <CornerDownLeft size={14} />
                  </button>
                </form>

                <div ref={terminalEndRef} />
              </div>

              {/* Bottom Quick Action Pills */}
              <div className="px-4 py-2.5 bg-[#0a101e]/80 border-t border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] text-white/50">
                <span className="text-white/30 shrink-0">Quick run:</span>
                {['help', 'skills', 'projects', 'paper', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setInputVal(cmd)
                      setTimeout(() => inputRef.current?.focus(), 50)
                    }}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-green-500/20 hover:text-green-300 border border-white/5 hover:border-green-500/30 transition-all shrink-0"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TerminalModal
