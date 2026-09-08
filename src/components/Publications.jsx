import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, FileText, Sparkles, Users } from 'lucide-react'

const Publications = () => {
  const publications = [
    {
      title: "Seeing Without Understanding: Large Language Model Evaluation of Mobile User Interface Quality, Failure Taxonomy, and Architectural Explanation",
      journal: "EFAST 2026 / SSRN Electronic Journal",
      // year: "2026",
      authors: [
        "Md Rejaul Korim Sadi",
        "Golam Mostofa Naeem",
        "Toufiqur Rahman Tasin",
        "Mahmudul Hasan Emon",
        "Syed Mostofa Moosa",
        "Mahmudur Rashid",
        "Ferdus Ahmed"
      ],
      abstract: "Evaluated 3 open-weight LLMs across 270,000 ratings on 15,000 RICO mobile UI screens. Revealed that inter-rater agreement with the structural baseline is statistically equivalent to chance in 17 of 18 evaluation cells, uncovering structural feature decoupling and architectural failures in LLMs during UI judgment.",
      tags: ["LLM Evaluation", "UI Quality Assessment", "Hallucination Taxonomy", "Heuristic Scoring", "Transformer Architecture"],
      paperUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6771787",
      status: "Published at EFAST 2026"
    }
  ]

  return (
    <section id="publications" className="py-10 relative overflow-hidden ">
      {/* Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mb-14"
        >
          <span className="text-emerald-400/90 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Academic & Research
          </span>
          <h3 className="text-2xl md:text-4xl font-bold text-slate-200 tracking-tight text-center">
            Research Publications
          </h3>
          <div className="w-16 h-1 bg-emerald-500/60 mt-4 rounded-full" />
        </motion.div>

        {/* Cards */}
        <div className="flex justify-center">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-[#0d131f]/80 backdrop-blur-md p-7 md:p-9 rounded-3xl border border-slate-800 hover:border-emerald-500/25 transition-all duration-300 shadow-xl"
            >
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium tracking-wider px-4 py-1 rounded-full shadow-md backdrop-blur-md">
                {pub.status} {pub.year && `• ${pub.year}`}
              </div>

              {/* Main Content */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400/90 mb-5 border border-emerald-500/15">
                  <BookOpen size={22} strokeWidth={1.5} />
                </div>

                <h4 className="text-lg md:text-xl font-semibold text-slate-200 mb-2 leading-relaxed max-w-2xl">
                  {pub.title}
                </h4>
                
                <p className="text-emerald-400/80 font-medium tracking-wider text-xs uppercase mb-5">
                  {pub.journal}
                </p>

                {/* Authors */}
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-5 bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-800/80 flex-wrap justify-center max-w-xl">
                  <Users size={14} className="text-emerald-500/80 shrink-0" />
                  <span>
                    {pub.authors.map((author, aIdx) => (
                      <span 
                        key={aIdx} 
                        className={author.includes("Mahmudul Hasan Emon") ? "text-emerald-300 font-semibold underline underline-offset-2 decoration-emerald-500/40" : "text-slate-400"}
                      >
                        {author}{aIdx < pub.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </span>
                </div>

                {/* Abstract */}
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl text-center mb-6">
                  {pub.abstract}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-1.5 mb-7 pt-4 border-t border-slate-800/60">
                {pub.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-md border border-slate-800 flex items-center gap-1.5"
                  >
                    <Sparkles size={10} className="text-emerald-400/70" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <a
                  href={pub.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 rounded-xl text-xs font-medium tracking-wide transition-colors duration-200"
                >
                  <FileText size={15} />
                  Read Paper
                  <ExternalLink size={13} className="text-emerald-400/70" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Publications