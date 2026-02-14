import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, HeartPulse, Users, Award, Microscope, ChevronLeft, ChevronRight, Layout } from 'lucide-react'

// Asset imports
import researchCert from '../assets/certificates/626.webp'
import medicalCert from '../assets/certificates/medical-cert.webp'
import volunteerCert from '../assets/certificates/volunteer-cert.webp'
import photoCert from '../assets/certificates/photography-cert.webp'
import innovationCert from '../assets/certificates/149.webp'
import webDevCert from '../assets/certificates/PH-12-certificate_page-0001.webp'
import research360Cert from '../assets/certificates/Research_360_Degree.webp'

const Achievements = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  const data = [
    {
      title: "Complete Web Development (Level 1)",
      provider: "Programming Hero",
      icon: <Layout className="text-violet-400" size={20} />,
      image: webDevCert,
      desc: "Specialized in modern frontend development, mastering HTML5, CSS3, and JavaScript. Built multiple responsive projects using React, focusing on component-based architecture and interactive interfaces."
    },
    {
      title: "Research 360°: A Complete Guide",
      provider: "Metropolitan University (MURS)",
      icon: <Microscope className="text-cyan-400" size={20} />,
      image: research360Cert,
      desc: "Completed an intensive 5-day research workshop covering the end-to-end academic research process, from methodology selection to ethical considerations and scholarly writing."
    },
    {
      title: "A Path to Academic Excellence",
      provider: "SUST Research Society",
      icon: <Microscope className="text-amber-400" size={20} />,
      image: researchCert,
      desc: "Successfully completed an intensive research workshop covering fundamental ethics, systematic literature review, and the strategic process of academic publishing in high-impact journals."
    },
    {
      title: "Innovation Through Research",
      provider: "Metropolitan University (MURS)",
      icon: <Award className="text-yellow-500" size={20} />,
      image: innovationCert,
      desc: "Participated in a live online workshop focused on higher education pathways and scholarships through research innovation, conducted on 14 January 2026."
    },
    {
      title: "Stories in Frames",
      provider: "MU Photographic Society",
      icon: <Camera className="text-pink-400" size={20} />,
      image: photoCert,
      desc: "Participated in an advanced visual storytelling seminar that explored the nuances of photojournalism, composition techniques, and the art of capturing compelling narratives."
    },
    {
      title: "Volunteer of the Year",
      provider: "MU CSE Society",
      icon: <Users className="text-green-400" size={20} />,
      image: volunteerCert,
      desc: "Recognized for exceptional leadership and proactive contributions in organizing departmental events, technical seminars, and fostering a collaborative computer science community."
    },
    {
      title: "Diagnosis Coding: ICD-10-CM",
      provider: "Centers for Medicare & Medicaid Services",
      icon: <HeartPulse className="text-blue-400" size={20} />,
      image: medicalCert,
      desc: "Achieved professional certification in the ICD-10-CM coding system, focusing on precise medical data classification and international clinical documentation standards."
    }
  ]

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  return (
    <section id="achievements" className="py-14 relative overflow-hidden bg-[#050505]">
      {/* Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-green-500/10 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 text-center"
        >
          <Award className="text-green-500 mb-4" size={28} />
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
            Verified <span className="text-green-500">Excellence</span>
          </h2>
        </motion.div>

        {/* Grid Layout - Optimized for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {currentItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-white/[0.02] border border-white/10 rounded-[2rem] p-3 md:p-4 hover:bg-white/[0.05] hover:border-green-500/30 transition-all duration-500 backdrop-blur-xl shadow-xl flex flex-col h-full"
              >
                {/* Image Containers */}
                <div className="relative aspect-[4/3] md:h-52 rounded-2xl overflow-hidden cursor-pointer mb-5 border border-white/5 shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top md:object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Soft Vignette for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-60" />
                </div>

                <div className="px-2 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                      {item.icon}
                    </div>
                    <p className="text-[10px] font-bold text-green-400/70 uppercase tracking-widest leading-none">
                      {item.provider}
                    </p>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed opacity-80 line-clamp-4 md:line-clamp-3 mb-4">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination - Mobile Friendly Tap Areas */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 md:gap-8 mt-12 pb-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-green-500/20 active:scale-90 transition-all"
              aria-label="Previous Page"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2.5">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${currentPage === i + 1 ? 'w-10 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-green-500/20 active:scale-90 transition-all"
              aria-label="Next Page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Achievements