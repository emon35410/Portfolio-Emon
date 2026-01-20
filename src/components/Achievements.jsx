import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, HeartPulse, Users, X, Award } from 'lucide-react'

import medicalCert from '../assets/certificates/medical-cert.jpg'
import volunteerCert from '../assets/certificates/volunteer-cert.jpg'
import photoCert from '../assets/certificates/photography-cert.jpg'

const Achievements = () => {
  const [selectedImg, setSelectedImg] = useState(null)

  const data = [
    {
      title: "Diagnosis Coding: ICD-10-CM",
      provider: "Centers for Medicare & Medicaid Services",
      icon: <HeartPulse className="text-blue-400" size={20} />,
      image: medicalCert,
      desc: "Comprehensive certification in ICD-10-CM diagnosis coding systems and medical data management."
    },
    {
      title: "Volunteer of the Year",
      provider: "Metropolitan University CSE Society",
      icon: <Users className="text-green-400" size={20} />,
      image: volunteerCert,
      desc: "Awarded for outstanding dedication and proactive leadership within the computer science community."
    },
    {
      title: "Stories in Frames",
      provider: "MU Photographic Society",
      icon: <Camera className="text-pink-400" size={20} />,
      image: photoCert,
      desc: "Advanced seminar on visual storytelling conducted by renowned photojournalists."
    }
  ]

  return (
    <section id="achievements" className="py-14 relative bg-[#030014] overflow-hidden">
      {/* Background Subtle Glows for Eye Comfort */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header with Fade Up */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <Award className="text-green-500 mb-4" size={28} />
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
            Verified <span className="text-green-500">Excellence</span>
          </h2>
          <div className="w-12 h-1 bg-green-500/30 mt-4 rounded-full" />
        </motion.div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <motion.div
              key={index}
              // Fade Up Animation for Cards
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-4 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            >
              {/* Image Preview Area */}
              <div 
                className="relative h-56 rounded-[1.8rem] overflow-hidden cursor-pointer mb-6"
                onClick={() => setSelectedImg(item.image)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Text Content */}
              <div className="px-2 pb-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                    {item.provider}
                  </p>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium opacity-80">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            {/* Exit Button */}
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors bg-white/5 p-3 rounded-full"
            >
              <X size={32} />
            </motion.button>
            
            {/* Image Zoom Animation */}
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImg} 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/10 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Achievements