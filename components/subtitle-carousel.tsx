"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SubtitleCarouselProps {
  subtitles: string[]
  interval?: number // Time in ms between auto-rotations
  className?: string
}

export default function SubtitleCarousel({ subtitles, interval = 3000, className = "" }: SubtitleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-rotate through subtitles
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % subtitles.length)
    }, interval)

    return () => clearInterval(timer)
  }, [subtitles.length, interval, isPaused])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? subtitles.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % subtitles.length)
  }

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-center h-20 md:h-24">
        <button
          onClick={goToPrevious}
          className="absolute left-0 z-10 p-2 text-gray-400 hover:text-pink-500 transition-colors"
          aria-label="Previous subtitle"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h2 className="text-xl md:text-3xl font-bold text-center px-12">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
                  {subtitles[currentIndex]}
                </span>
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={goToNext}
          className="absolute right-0 z-10 p-2 text-gray-400 hover:text-pink-500 transition-colors"
          aria-label="Next subtitle"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {subtitles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-pink-500" : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to subtitle ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

