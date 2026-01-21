import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, HeartPulse, Users, X, Award, Microscope, ChevronLeft, ChevronRight } from 'lucide-react'

// Import your new image
import researchCert from '../assets/certificates/626.webp' 
import medicalCert from '../assets/certificates/medical-cert.webp'
import volunteerCert from '../assets/certificates/volunteer-cert.webp'
import photoCert from '../assets/certificates/photography-cert.webp'

const Achievements = () => {
  const [selectedImg, setSelectedImg] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const data = [
    {
      title: "A Path to Academic Excellence",
      provider: "SUST Research Society",
      icon: <Microscope className="text-amber-400" size={20} />,
      image: researchCert,
      desc: "Successfully completed an intensive research workshop covering fundamental ethics, systematic literature review, and the strategic process of academic publishing in high-impact journals."
    },
    {
      title: "Volunteer of the Year",
      provider: "MU CSE Society",
      icon: <Users className="text-green-400" size={20} />,
      image: volunteerCert,
      desc: "Recognized for exceptional leadership and proactive contributions in organizing departmental events, technical seminars, and fostering a collaborative environment within the computer science community."
    },
    {
      title: "Stories in Frames",
      provider: "MU Photographic Society",
      icon: <Camera className="text-pink-400" size={20} />,
      image: photoCert,
      desc: "Participated in an advanced visual storytelling seminar that explored the nuances of photojournalism, composition techniques, and the art of capturing compelling narratives through a lens."
    },
    {
      title: "Diagnosis Coding: ICD-10-CM",
      provider: "Centers for Medicare & Medicaid Services",
      icon: <HeartPulse className="text-blue-400" size={20} />,
      image: medicalCert,
      desc: "Achieved professional certification in the ICD-10-CM coding system, focusing on precise medical data classification, health information management, and international clinical documentation standards."
    }
  ]
  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(data.length / itemsPerPage)
  return (
    <section id="achievements" className="py-14 relative  overflow-hidden">
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-700/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* 2. Grainy Texture Overlay for Depth */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-50 contrast-150 pointer-events-none" />

      {/* 3. Soft Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              y: [-20, -120],
              x: Math.random() * 40 - 20 
            }}
            transition={{ 
              duration: 7 + Math.random() * 5, 
              repeat: Infinity, 
              delay: i * 2 
            }}
            className="absolute w-1 h-1 bg-green-400/40 rounded-full blur-[1px]"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      {/* --- END BACKGROUND ELEMENTS --- */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <Award className="text-green-500 mb-4" size={28} />
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
            Verified <span className="text-green-500">Excellence</span>
          </h2>
          <div className="w-12 h-1 bg-green-500/30 mt-4 rounded-full" />
        </motion.div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-4 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 backdrop-blur-sm"
              >
                <div
                  className="relative h-56 rounded-[1.8rem] overflow-hidden cursor-pointer mb-6"
                  onClick={() => setSelectedImg(item.image)}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">{item.icon}</div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{item.provider}</p>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium opacity-80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {data.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-green-500/20 hover:border-green-500/50 transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentPage === i + 1 ? 'w-8 bg-green-500' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-green-500/20 hover:border-green-500/50 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button className="absolute top-8 right-8 text-white/40 hover:text-white bg-white/5 p-3 rounded-full">
              <X size={32} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={selectedImg} className="max-w-full max-h-[85vh] rounded-2xl border border-white/10 object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Achievements