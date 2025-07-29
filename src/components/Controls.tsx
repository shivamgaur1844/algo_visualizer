import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Zap } from 'lucide-react'

interface ControlsProps {
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onStepForward: () => void
  onStepBackward: () => void
  speed: number
  onSpeedChange: (speed: number) => void
  canStepBackward: boolean
  canStepForward: boolean
}

const Controls = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  speed,
  onSpeedChange,
  canStepBackward,
  canStepForward
}: ControlsProps) => {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      y: -2,
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

  const iconVariants = {
    hover: {
      rotate: 360,
      transition: {
        duration: 0.6
      }
    }
  }

  const speeds = [0.5, 1, 1.5, 2, 3]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="algorithm-card"
    >
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="responsive-subtitle text-white mb-6 flex items-center space-x-2"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </motion.div>
        <span>Playback Controls</span>
      </motion.h3>

      <div className="controls-container">
        {/* Main playback controls */}
        <div className="controls-row">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onReset}
            className="control-button bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 mobile-button"
          >
            <motion.div variants={iconVariants} whileHover="hover">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onStepBackward}
            disabled={!canStepBackward}
            className={`control-button mobile-button ${
              canStepBackward 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                : 'bg-gray-500/50 cursor-not-allowed'
            }`}
          >
            <motion.div variants={iconVariants} whileHover="hover">
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={isPlaying ? onPause : onPlay}
            className="control-button bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 mobile-button"
          >
            <motion.div variants={iconVariants} whileHover="hover">
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.div>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onStepForward}
            disabled={!canStepForward}
            className={`control-button mobile-button ${
              canStepForward 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                : 'bg-gray-500/50 cursor-not-allowed'
            }`}
          >
            <motion.div variants={iconVariants} whileHover="hover">
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.button>
        </div>

        {/* Speed controls */}
        <div className="speed-controls">
          <span className="responsive-caption text-white/80 font-medium">Speed:</span>
          <div className="flex gap-1 sm:gap-2">
            {speeds.map((speedOption) => (
              <motion.button
                key={speedOption}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSpeedChange(speedOption)}
                className={`speed-button ${
                  speed === speedOption
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
              >
                {speedOption}x
              </motion.button>
            ))}
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center sm:justify-end"
        >
          <motion.div
            animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
              isPlaying 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }`}
          >
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-green-400' : 'bg-blue-400'
              }`}
            />
            <span className="responsive-caption font-medium">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile-friendly touch hints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 text-center sm:hidden"
      >
        <p className="responsive-caption text-white/60">
          💡 Tap and hold for continuous playback
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Controls 