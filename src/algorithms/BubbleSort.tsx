import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrayElement } from '../components/ArrayVisualizer'
import Controls from '../components/Controls'

interface Step {
  array: ArrayElement[]
  description: string
  comparing?: [number, number]
  swapping?: [number, number]
  swapPositions?: { from: number; to: number }
}

const BubbleSort = () => {
  const [array, setArray] = useState<ArrayElement[]>([])
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  // This function has been replaced by generateRandomArrayWithState
  
  // Function to generate a new random array with state
  const generateRandomArrayWithState = () => {
    const newArray = Array.from({ length: 8 }, (_, i) => ({
      value: Math.floor(Math.random() * 50) + 1,
      state: 'default' as const,
      index: i
    }))
    return newArray
  }
  
  // Generate steps for bubble sort with simple swap animation
  const generateSteps = useCallback((inputArray: ArrayElement[]) => {
    const newSteps: Step[] = []
    const arrayCopy = inputArray.map(el => ({ ...el }))
    
    newSteps.push({
      array: arrayCopy.map(el => ({ ...el })),
      description: '🚀 Starting bubble sort algorithm...'
    })

    for (let i = 0; i < arrayCopy.length - 1; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        // Mark elements being compared - create a new copy to avoid reference issues
        const compareStep = arrayCopy.map((el, idx) => ({
          ...el,
          state: (idx === j || idx === j + 1) ? 'comparing' as const : el.state
        }))
        
        newSteps.push({
          array: compareStep,
          description: `👀 Comparing elements at positions ${j} and ${j + 1} (${arrayCopy[j].value} vs ${arrayCopy[j + 1].value})`,
          comparing: [j, j + 1]
        })

        if (arrayCopy[j].value > arrayCopy[j + 1].value) {
          // Step 1: Mark elements for swapping - create a new deep copy
          const prepareSwapStep = arrayCopy.map((el, idx) => ({
            ...el,
            state: (idx === j || idx === j + 1) ? 'swapping' as const : el.state
          }))
          
          newSteps.push({
            array: prepareSwapStep,
            description: `🔄 Preparing to swap ${arrayCopy[j].value} and ${arrayCopy[j + 1].value} (${arrayCopy[j].value} > ${arrayCopy[j + 1].value})`,
            swapping: [j, j + 1],
            swapPositions: { from: j, to: j + 1 }
          })

          // Step 2: Perform swap in array
          const temp = arrayCopy[j]
          arrayCopy[j] = arrayCopy[j + 1]
          arrayCopy[j + 1] = temp

          // Step 3: Show swapped elements - create a new deep copy
          const swapStep = arrayCopy.map((el, idx) => ({
            ...el,
            state: (idx === j || idx === j + 1) ? 'swapping' as const : el.state
          }))
          
          newSteps.push({
            array: swapStep,
            description: `✅ Swap completed! ${arrayCopy[j].value} and ${arrayCopy[j + 1].value} have been exchanged`,
            swapping: [j, j + 1],
            swapPositions: { from: j, to: j + 1 }
          })

          // Step 4: Settle elements - create a new deep copy
          const settleStep = arrayCopy.map((el, idx) => ({
            ...el,
            state: (idx === j || idx === j + 1) ? 'default' as const : el.state
          }))
          
          newSteps.push({
            array: settleStep,
            description: `🎉 Elements settled in their new positions`,
            swapPositions: { from: j, to: j + 1 }
          })
        } else {
          // No swap needed - reset to default state with a new deep copy
          const noSwapStep = arrayCopy.map((el, idx) => ({
            ...el,
            state: (idx === j || idx === j + 1) ? 'default' as const : el.state
          }))
          
          newSteps.push({
            array: noSwapStep,
            description: `✅ No swap needed (${arrayCopy[j].value} ≤ ${arrayCopy[j + 1].value})`,
            comparing: [j, j + 1]
          })
        }
      }
      
      // Mark the last element as sorted
      arrayCopy[arrayCopy.length - 1 - i].state = 'sorted' as const
      
      // Create a new deep copy for the sorted step
      newSteps.push({
        array: arrayCopy.map(el => ({ ...el })),
        description: `🎊 Element ${arrayCopy[arrayCopy.length - 1 - i].value} is now in its final position!`
      })
    }

    // Mark all remaining elements as sorted - create a final deep copy
    const finalStep = arrayCopy.map(el => ({
      ...el,
      state: 'sorted' as const
    }))
    
    newSteps.push({
      array: finalStep,
      description: '🎊 Array is now completely sorted! Bubble sort completed successfully!'
    })

    setSteps(newSteps)
    return newSteps
  }, [])

  // Generate random array
  const generateArray = useCallback(() => {
    // Create array with 8 elements, values between 1-50
    const newArray = generateRandomArrayWithState()
    
    // Reset state
    setArray(newArray)
    setCurrentStep(0)
    setIsPlaying(false)
    
    // Generate steps for the new array with a longer delay to ensure state is updated
    setTimeout(() => {
      generateSteps(newArray)
    }, 100)
  }, [generateSteps])

  // Initialize array on mount
  useEffect(() => {
    // Create initial array directly
    const initialArray = generateRandomArrayWithState()
    setArray(initialArray)
    
    // Generate steps for the initial array with a longer delay
    setTimeout(() => {
      generateSteps(initialArray)
    }, 100)
  }, [generateSteps])

  // Second generateSteps definition removed to fix duplicate function error

  // Generate steps when array changes
  useEffect(() => {
    if (array.length > 0) {
      generateSteps(array)
    }
  }, [array, generateSteps])

  // Auto-play functionality with simple swap animations
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const currentDescription = steps[currentStep]?.description || ''
      const isSwapStep = currentDescription.includes('swap') || currentDescription.includes('Swap')
      
      // Timing for swap steps to show the animation
      const stepDelay = isSwapStep ? 1000 / speed : 800 / speed
      
      const timer = setTimeout(() => {
        // Ensure smooth transition during auto-play
        setCurrentStep(prev => {
          const nextStep = prev + 1
          // Stop playback if we reach the end
          if (nextStep >= steps.length) {
            setTimeout(() => setIsPlaying(false), 50)
          }
          return Math.min(nextStep, steps.length - 1)
        })
      }, Math.max(stepDelay, 300)) // Ensure minimum delay for smooth transitions
      
      return () => clearTimeout(timer)
    } else if (isPlaying && currentStep >= steps.length - 1) {
      // Explicitly stop playback when we reach the end
      setTimeout(() => setIsPlaying(false), 50)
    }
  }, [isPlaying, currentStep, steps.length, speed, steps])

  // Debounced handlers to prevent rapid clicks
  const handlePlay = useCallback(() => {
    if (currentStep < steps.length) {
      setIsPlaying(true)
    }
  }, [currentStep, steps.length])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const handleReset = useCallback(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [])

  const handleStepForward = useCallback(() => {
    if (currentStep < steps.length) {
      // Ensure we don't exceed the steps length and use a small timeout
      // to ensure smooth transitions and prevent array from disappearing
      setTimeout(() => {
        setCurrentStep(prev => Math.min(prev + 1, steps.length))
      }, 50)
    }
  }, [currentStep, steps.length])

  const handleStepBackward = useCallback(() => {
    if (currentStep > 0) {
      // Ensure we don't go below 0 and use a small timeout
      // to ensure smooth transitions
      setTimeout(() => {
        setCurrentStep(prev => Math.max(0, prev - 1))
      }, 50)
    }
  }, [currentStep])



  const currentArray = steps[currentStep]?.array || array
  const currentDescription = steps[currentStep]?.description || ''
  const currentSwapPositions = steps[currentStep]?.swapPositions

  return (
    <div className="responsive-section">

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
          className="responsive-title text-white mb-4 sm:mb-6 flex items-center space-x-2 sm:space-x-3"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm sm:text-lg">🫧</span>
          </motion.div>
          <span>Bubble Sort</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="responsive-text text-blue-100 mb-4 sm:mb-6 leading-relaxed"
        >
          Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, 
          compares adjacent elements and swaps them if they are in the wrong order. 
          It's like bubbles rising to the surface! 🫧
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20"
          >
            <span className="responsive-caption font-medium text-white">⏱️ Time:</span>
            <span className="responsive-caption text-yellow-300 font-bold">O(n²)</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20"
          >
            <span className="responsive-caption font-medium text-white">💾 Space:</span>
            <span className="responsive-caption text-green-300 font-bold">O(1)</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20"
          >
            <span className="responsive-caption font-medium text-white">🎯 Stability:</span>
            <span className="responsive-caption text-blue-300 font-bold">Stable</span>
          </motion.div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateArray}
          className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 mobile-button"
        >
          🎲 Generate New Array
        </motion.button>
      </motion.div>

      {/* Enhanced Array Visualizer with Custom Swapping */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="algorithm-card"
      >
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="responsive-subtitle text-white mb-4 sm:mb-6 flex items-center space-x-2"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
          </motion.div>
          <span>Array Visualization</span>
        </motion.h3>
        
        <motion.div
          layout
          className="array-container"
        >
          <AnimatePresence mode="sync">
            {currentArray && currentArray.length > 0 ? (
              // Map over array elements when array exists
              currentArray.map((element, index) => (
                <motion.div
                  key={`element-${element.value}`}
                  layout
                  layoutId={`element-${element.value}`}
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    zIndex: element.state === 'swapping' ? 10 : 1
                  }}
                  exit={{ opacity: 0, scale: 0.5, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.6
                  }}
                  whileHover={{
                    scale: 1.15,
                    y: -10,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                  className={`array-element ${
                    element.state === 'comparing' ? 'array-element-comparing' :
                    element.state === 'swapping' ? 'array-element-swapping' :
                    element.state === 'sorted' ? 'array-element-sorted' :
                    element.state === 'pivot' ? 'array-element-pivot' :
                    element.state === 'partition' ? 'array-element-partition' :
                    'array-element-default'
                  }`}
                  style={{
                    position: 'relative',
                    zIndex: element.state === 'swapping' ? 10 : 1
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="font-bold text-sm sm:text-base md:text-lg"
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

                  {/* Swap animation indicator */}
                  {currentSwapPositions && element.state === 'swapping' && (
                    <motion.div
                      className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-red-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {index === currentSwapPositions.from ? '→' : index === currentSwapPositions.to ? '←' : ''}
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              // Fallback message when array is empty
              <motion.div 
                className="flex items-center justify-center w-full p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-white text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  No array elements to display. Generate a new array to begin.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg"
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full animate-pulse" />
            <span className="text-white">Default</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg"
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce" />
            <span className="text-white">Comparing</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg"
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse" />
            <span className="text-white">Swapping</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg"
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse" />
            <span className="text-white">Sorted</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="algorithm-card"
      >
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="responsive-subtitle text-white mb-4 flex items-center space-x-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📝
          </motion.div>
          <span>Current Step</span>
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="responsive-text text-blue-100 mb-4"
        >
          {currentDescription}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4"
        >
          <div className="responsive-caption text-gray-300">
            Step {currentStep + 1} of {steps.length}
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="responsive-caption text-green-300 font-medium"
          >
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </motion.div>
        </motion.div>
      </motion.div>

      <Controls
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onStepForward={handleStepForward}
        onStepBackward={handleStepBackward}
        speed={speed}
        onSpeedChange={setSpeed}
        canStepBackward={currentStep > 0}
        canStepForward={currentStep < steps.length - 1}
      />
    </div>
  )
}

export default BubbleSort