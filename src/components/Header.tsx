import { motion } from 'framer-motion'
import { Code, Zap, BarChart3, Sparkles, Cpu, Brain } from 'lucide-react'

const Header = () => {
  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center space-x-3 sm:space-x-4"
          >
            <motion.div
              whileHover="hover"
              variants={iconVariants}
              className="relative"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 animate-pulse" />
            </motion.div>
            
            <div className="text-center sm:text-left">
              <motion.h1 
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="responsive-title text-white font-bold"
              >
                Algorithm Visualizer
              </motion.h1>
              <motion.p 
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="responsive-caption text-blue-100 flex items-center justify-center sm:justify-start space-x-1"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Interactive Learning Platform</span>
              </motion.p>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="responsive-caption text-white/90 font-medium hidden sm:inline">Real-time</span>
              <span className="responsive-caption text-white/90 font-medium sm:hidden">Live</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20"
            >
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span className="responsive-caption text-white/90 font-medium hidden sm:inline">Visual</span>
              <span className="responsive-caption text-white/90 font-medium sm:hidden">Viz</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20"
            >
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="responsive-caption text-white/90 font-medium hidden sm:inline">AI Powered</span>
              <span className="responsive-caption text-white/90 font-medium sm:hidden">AI</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20"
            >
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="responsive-caption text-white/90 font-medium hidden sm:inline">Educational</span>
              <span className="responsive-caption text-white/90 font-medium sm:hidden">Edu</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile-only subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-3 text-center sm:hidden"
        >
          <p className="responsive-caption text-white/70">
            Learn algorithms through beautiful, interactive visualizations
          </p>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header 