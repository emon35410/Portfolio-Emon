import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const projects = [
    {
      title: "Red Avengers",
      category: "Full-Stack MERN",
      description:
        "A Smart AI-Integrated Blood Donation and Management System. Features an AI Eligibility Bot (Red Bot), real-time emergency alerts via Socket.io, and secure financial donations for blood camps.",
      image: "https://i.ibb.co.com/5hNKW2WT/Screenshot-2026-04-23-191241.png",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "Groq AI",
        "Firebase",
      ],
      liveUrl: "https://red-avengers.vercel.app",
      githubUrl: "https://github.com/emon35410/red-avengers",
    },
    {
      title: "Personal Portfolio",
      category: "Frontend Excellence",
      description:
        "A high-performance personal brand space engineered for seamless user experience. It features Lenis smooth scrolling, intricate Framer Motion animations, and a fully responsive design. Integrated with Formspree for robust lead generation and optimized with Tailwind CSS for industry-leading load speeds.",
      image: "https://i.ibb.co.com/xtgxNLy8/Screenshot-2026-04-23-192327.png",
      technologies: [
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Lenis Scroll",
        "Formspree",
        "Lucide React",
      ],
      liveUrl: "https://portfolio-emon-10.netlify.app/",
      githubUrl: "https://github.com/emon35410/Portfolio-Emon",
    },
    {
      title: "Blood Heroes",
      category: "MERN Stack",
      description:
        "Connects blood donors and recipients with real-time requests. Features a complex dashboard for management with user role-based access control.",
      image: "https://i.ibb.co.com/n8PVP4TK/bloodherosemon-netlify-app-1.png",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      liveUrl: "https://bloodherosemon.netlify.app/",
      githubUrl: "https://github.com/emon35410/BloodHeros-Client",
    },
    {
      title: "Home Nest",
      category: "Real Estate",
      description:
        "A premium property listing platform with secure authentication, property management for agents, and advanced search filters.",
      image: "https://i.ibb.co.com/S4By23j6/localhost-5173-3.png",
      technologies: ["React", "Node.js", "Firebase", "Tailwind"],
      liveUrl: "https://home-nest-mhe.netlify.app/",
      githubUrl: "https://github.com/emon35410/HomeNest-Client.git",
    },
    {
      title: "Hero UI",
      category: "Creative Design",
      description:
        "A sleek, tool-based web app focused on providing users with a smooth, dark-themed responsive interface and AOS animations.",
      image:
        "https://i.ibb.co.com/QFJMBMVk/luminous-tanuki-c653df-netlify-app.png",
      technologies: ["JavaScript", "Tailwind", "AOS"],
      liveUrl: "https://luminous-tanuki-c653df.netlify.app/",
      githubUrl: "https://github.com/emon35410/Assignment-8.git",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 italic tracking-tight">
            Featured{" "}
            <span className="text-green-500 underline decoration-2 underline-offset-8">
              Work
            </span>
          </h3>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            A selection of my recent full-stack and frontend developments,
            focusing on clean code and user experience.
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col bg-[#111827]/40 border border-white/5 rounded-3xl overflow-hidden hover:border-green-500/30 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay for Links on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 z-20">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 transition-all"
                  >
                    <Github size={22} />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-green-500 hover:bg-green-400 rounded-full text-black transition-all"
                  >
                    <ExternalLink size={22} />
                  </a>
                </div>

                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-green-400 border border-white/10 font-bold uppercase tracking-[0.1em]">
                  {project.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-transparent to-[#0f172a]/80">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h4>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 ">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-medium text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 transition-all group-hover:border-green-500/20 group-hover:text-green-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-transparent border border-white/10 hover:border-green-500 hover:bg-green-500/5 text-white hover:text-green-400 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Live Preview <ExternalLink size={14} strokeWidth={2.5} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
