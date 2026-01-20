import { motion } from 'framer-motion'
import { Briefcase, CheckCircle2,  Database, FileSearch } from 'lucide-react'

const Experience = () => {
  const points = [
    { text: "Resolved actual billing errors.", icon: FileSearch },
    { text: "Managed medical files with 100% integrity.", icon: Database },
    { text: "Optimized record management.", icon: CheckCircle2 }
  ]

  return (
    <section id="experience" className="py-10 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title Section - FADE UP ADDED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} // Start 30px down
          whileInView={{ opacity: 1, y: 0 }} // Rise to 0
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mb-12"
        >
          <span className="text-green-500 text-xs font-bold tracking-[0.3em] uppercase mb-3">Journey So Far</span>
          <h3 className="text-3xl md:text-5xl font-black italic text-white tracking-tight text-center">Professional Experience</h3>
          <div className="w-24 h-1.5 bg-green-500 mt-4 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
        </motion.div>

        {/* Compact & Premium Card - FADE UP ADDED */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }} // Start 40px down
            whileInView={{ opacity: 1, y: 0 }} // Rise to 0
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#0a101e]/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-green-500/30 transition-all duration-500 group shadow-2xl"
          >
            {/* Timeline Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[10px] font-black uppercase tracking-[0.2em] px-5 py-1.5 rounded-lg shadow-lg z-10">
              Oct 2024 — Dec 2024
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-5 group-hover:scale-110 transition-transform duration-500 border border-green-500/20">
                <Briefcase size={28} strokeWidth={1.5} />
              </div>

              <h4 className="text-xl md:text-2xl font-bold text-white mb-1">Medical Billing Agent</h4>
              <p className="text-green-400 font-semibold tracking-widest text-xs uppercase">IntelliGency Solutions</p>

              <p className="mt-5 text-gray-400 text-sm leading-relaxed italic max-w-md">
                &quot;Specialized in high-precision data auditing and systematic resolution of billing discrepancies.&quot;
              </p>
            </div>

            {/* Feature Grid - STAGGERED FADE UP ADDED */}
            <div className="grid gap-4 mt-8 border-t border-white/5 pt-8">
              {points.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + (index * 0.1) // Staggered for eye comfort
                  }}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.05] transition-colors"
                >
                  <item.icon size={16} className="text-green-500 shrink-0" />
                  <p className="text-xs text-gray-300 font-medium leading-tight">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience