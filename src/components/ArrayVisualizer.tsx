import { motion, AnimatePresence } from 'framer-motion'

export interface ArrayElement {
  value: number
  state: 'default' | 'comparing' | 'swapping' | 'swapping-left' | 'swapping-right' | 'sorted' | 'pivot' | 'partition'
  index: number
}

interface ArrayVisualizerProps {
  array: ArrayElement[]
  title?: string
  className?: string
}

const ArrayVisualizer = ({ array, title, className = '' }: ArrayVisualizerProps) => {
  const getElementStyle = (element: ArrayElement) => {
    switch (element.state) {
      case 'comparing':
        return 'array-element-comparing'
      case 'swapping':
        return 'array-element-swapping'
      case 'swapping-left':
        return 'array-element-swapping-left'
      case 'swapping-right':
        return 'array-element-swapping-right'
      case 'sorted':
        return 'array-element-sorted'
      case 'pivot':
        return 'array-element-pivot'
      case 'partition':
        return 'array-element-partition'
      default:
        return 'array-element-default'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const elementVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0, 
      y: 50,
      rotate: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.15,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`algorithm-card ${className}`}
    >
      {title && (
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl font-semibold text-white mb-6 flex items-center space-x-2"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </motion.div>
          <span>{title}</span>
        </motion.h3>
      )}
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="array-container"
      >
        <AnimatePresence mode="wait">
          {array.map((element, index) => (
            <motion.div
              key={`${element.value}-${index}-${element.state}`}
              variants={elementVariants}
              whileHover="hover"
              layout
              className={getElementStyle(element)}
              style={{
                zIndex: element.state.includes('swapping') ? 10 : 1
              }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="font-bold text-lg"
              >
                {element.value}
              </motion.span>
              
              {/* Shimmer effect for active elements */}
              {element.state !== 'default' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-6 flex flex-wrap gap-4 text-sm"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
        >
          <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full animate-pulse" />
          <span className="text-white">Default</span>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
        >
          <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce" />
          <span className="text-white">Comparing</span>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
        >
          <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse" />
          <span className="text-white">Swapping</span>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
        >
          <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse" />
          <span className="text-white">Sorted</span>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
        >
          <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full animate-pulse" />
          <span className="text-white">Pivot</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ArrayVisualizer 