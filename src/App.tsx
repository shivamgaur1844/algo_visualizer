import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import AlgorithmSelector from './components/AlgorithmSelector'
import BubbleSort from './algorithms/BubbleSort'
import QuickSort from './algorithms/QuickSort'
import MergeSort from './algorithms/MergeSort'
import InsertionSort from './algorithms/InsertionSort'
import SelectionSort from './algorithms/SelectionSort'
import BinarySearch from './algorithms/BinarySearch'
import LinearSearch from './algorithms/LinearSearch'
import ParticleBackground from './components/ParticleBackground'

type Algorithm = 'bubble' | 'quick' | 'merge' | 'insertion' | 'selection' | 'binary' | 'linear'

const algorithms = {
  bubble: BubbleSort,
  quick: QuickSort,
  merge: MergeSort,
  insertion: InsertionSort,
  selection: SelectionSort,
  binary: BinarySearch,
  linear: LinearSearch
}

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('bubble')

  const SelectedComponent = algorithms[selectedAlgorithm]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <AnimatePresence mode="wait">
            {!selectedAlgorithm ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.6
                }}
              >
                <AlgorithmSelector onSelect={setSelectedAlgorithm} />
              </motion.div>
            ) : (
              <motion.div
                key="algorithm"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.6
                }}
                className="responsive-section"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-6 sm:mb-8"
                >
                  <button
                    onClick={() => setSelectedAlgorithm(null as any)}
                    className="btn-secondary flex items-center space-x-2 mobile-button"
                  >
                    <span>←</span>
                    <span className="hidden sm:inline">Back to Algorithms</span>
                    <span className="sm:hidden">Back</span>
                  </button>
                </motion.div>
                
                <SelectedComponent />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Floating blur elements for enhanced visuals */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default App 