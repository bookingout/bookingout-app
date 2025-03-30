"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubtitleCarouselProps {
  subtitles: string[]
  interval?: number
  className?: string
}

export default function SubtitleCarousel({ subtitles, interval = 3000, className }: SubtitleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance the carousel
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        setDirection("right")
        setCurrentIndex((prevIndex) => (prevIndex + 1) % subtitles.length)
      }, interval)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentIndex, isPaused, interval, subtitles.length])

  const goToPrevious = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDirection("left")
    setCurrentIndex((prevIndex) => (prevIndex - 1 + subtitles.length) % subtitles.length)
  }

  const goToNext = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDirection("right")
    setCurrentIndex((prevIndex) => (prevIndex + 1) % subtitles.length)
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-live="polite"
    >
      <div className="flex items-center justify-center h-12 md:h-16">
        {subtitles.map((subtitle, index) => (
          <div
            key={index}
            className={cn(
              "absolute w-full text-center transition-all duration-500 transform",
              index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0",
              direction === "right"
                ? index === currentIndex
                  ? "animate-slide-down-in"
                  : index === (currentIndex - 1 + subtitles.length) % subtitles.length
                    ? "animate-slide-up-out"
                    : ""
                : index === currentIndex
                  ? "animate-slide-up-in"
                  : index === (currentIndex + 1) % subtitles.length
                    ? "animate-slide-down-out"
                    : "",
            )}
            aria-hidden={index !== currentIndex}
          >
            <span className="text-xl md:text-2xl font-medium">
              <span className="text-purple-500">{subtitle.split(" ")[0]} </span>
              <span className="text-cyan-400">{subtitle.split(" ").slice(1).join(" ")}</span>
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm transition-all"
        aria-label="Previous subtitle"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm transition-all"
        aria-label="Next subtitle"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center mt-4 space-x-1">
        {subtitles.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (timerRef.current) clearTimeout(timerRef.current)
              setDirection(index > currentIndex ? "right" : "left")
              setCurrentIndex(index)
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-gradient-to-r from-pink-500 to-purple-500 w-4"
                : "bg-white/40 hover:bg-white/60",
            )}
            aria-label={`Go to subtitle ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </div>
  )
}

