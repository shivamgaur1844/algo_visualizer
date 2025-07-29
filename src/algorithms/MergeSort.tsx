import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ArrayVisualizer, { ArrayElement } from '../components/ArrayVisualizer'
import Controls from '../components/Controls'

const MergeSort = () => {
  const [array, setArray] = useState<ArrayElement[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const generateArray = useCallback(() => {
    const newArray: ArrayElement[] = Array.from({ length: 8 }, (_, i) => ({
      value: Math.floor(Math.random() * 50) + 1,
      state: 'default' as const,
      index: i
    }))
    setArray(newArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    generateArray()
  }, [generateArray])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="algorithm-card"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Merge Sort</h2>
        <p className="text-blue-100 mb-4">
          Merge Sort is a stable, divide-and-conquer sorting algorithm that produces a sorted array.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">Time Complexity:</span>
            <span className="text-sm text-yellow-300">O(n log n)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">Space Complexity:</span>
            <span className="text-sm text-green-300">O(n)</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateArray}
          className="btn-primary"
        >
          Generate New Array
        </motion.button>
      </motion.div>

      <ArrayVisualizer 
        array={array} 
        title="Array Visualization"
      />

      <Controls
        isPlaying={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onReset={() => setCurrentStep(0)}
        onStepForward={() => setCurrentStep(prev => prev + 1)}
        onStepBackward={() => setCurrentStep(prev => Math.max(0, prev - 1))}
        speed={speed}
        onSpeedChange={setSpeed}
        canStepBackward={currentStep > 0}
        canStepForward={true}
      />
    </div>
  )
}

export default MergeSort 