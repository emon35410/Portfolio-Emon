import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, Mail, Terminal } from 'lucide-react'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 — Page Not Found | Mahmudul Hasan Emon'
    // Tell crawlers not to index the 404 view
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  const path = typeof window !== 'undefined' ? window.location.pathname : ''

  return (
    <main className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        <div className="mx-auto mb-8 w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 p-4 text-left font-mono text-xs sm:text-sm shadow-2xl">
          <div className="flex gap-1.5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <p className="text-green-400 break-all">
            <span className="text-white/40">emon@portfolio:~$</span> cd {path || '/unknown'}
          </p>
          <p className="text-red-400 mt-1">bash: cd: No such file or directory</p>
        </div>

        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-green-500 drop-shadow-[0_0_25px_rgba(34,197,94,0.35)]">
          404
        </h1>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold">Page not found</h2>
        <p className="mt-4 text-slate-400 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
          >
            <Home size={16} /> Back to Home
          </a>
          <a
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
          >
            <Terminal size={16} /> View Projects
          </a>
          <a
            href="mailto:mhhsan341@gmail.com"
            className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
          >
            <Mail size={16} /> Email Me
          </a>
        </div>
      </motion.div>
    </main>
  )
}

export default NotFound

