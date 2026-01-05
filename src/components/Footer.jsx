import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12 border-t border-white/10 text-center text-white/40 text-sm"
    >
      <p>&copy; 2026 Emon. All Rights Reserved.</p>
    </motion.footer>
  )
}

export default Footer