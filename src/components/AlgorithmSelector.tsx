import { motion } from 'framer-motion'
import { Code, Zap, BarChart3, Search, SortAsc, SortDesc, Binary } from 'lucide-react'

interface AlgorithmSelectorProps {
  onSelect: (algorithm: string) => void
}

const algorithms = [
  { id: 'bubble', name: 'Bubble Sort', icon: SortAsc, description: 'Simple comparison-based sorting', category: 'Sorting' },
  { id: 'quick', name: 'Quick Sort', icon: SortDesc, description: 'Divide and conquer sorting', category: 'Sorting' },
  { id: 'merge', name: 'Merge Sort', icon: BarChart3, description: 'Stable divide and conquer', category: 'Sorting' },
  { id: 'insertion', name: 'Insertion Sort', icon: Code, description: 'Simple insertion-based sorting', category: 'Sorting' },
  { id: 'selection', name: 'Selection Sort', icon: Zap, description: 'Simple selection-based sorting', category: 'Sorting' },
  { id: 'binary', name: 'Binary Search', icon: Binary, description: 'Efficient search in sorted arrays', category: 'Search' },
  { id: 'linear', name: 'Linear Search', icon: Search, description: 'Simple sequential search', category: 'Search' }
]

const AlgorithmSelector = ({ onSelect }: AlgorithmSelectorProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="algorithm-card"
    >
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="responsive-title text-white mb-6 flex items-center space-x-3"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.div>
        <span>Choose an Algorithm</span>
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="responsive-text text-blue-100 mb-8 leading-relaxed"
      >
        Select an algorithm to visualize its step-by-step execution with beautiful animations and detailed explanations.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {algorithms.map((algorithm) => {
          const IconComponent = algorithm.icon
          return (
            <motion.div
              key={algorithm.id}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.button
                variants={buttonVariants}
                onClick={() => onSelect(algorithm.id)}
                className="w-full algorithm-card text-left p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 group mobile-button"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <motion.h3 
                      className="responsive-subtitle text-white font-semibold mb-1 group-hover:text-blue-200 transition-colors"
                    >
                      {algorithm.name}
                    </motion.h3>
                    <motion.p 
                      className="responsive-caption text-blue-100 mb-2 line-clamp-2"
                    >
                      {algorithm.description}
                    </motion.p>
                    <motion.span 
                      className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80"
                    >
                      {algorithm.category}
                    </motion.span>
                  </div>
                </div>
                
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <span className="text-sm text-white/80">🎯</span>
          <span className="responsive-caption text-white/80">
            {algorithms.length} Algorithms Available
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default AlgorithmSelector