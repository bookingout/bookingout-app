"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/contexts/language-context" // Corrected path if needed
import AnimatedCocktailIcon from "../animated-cocktail-icon" // Ensure this path is correct

interface ElegantCTAButtonProps {
  className?: string
  onClick?: () => void
  testId?: string
}

export default function ElegantCTAButton({ className, onClick, testId = "elegant-cta" }: ElegantCTAButtonProps) {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Animation on mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Button text based on language - Use CORRECTED KEY
  const buttonText = t("hero.cta") // <-- CORRECTED KEY

  return (
    <button
      className={cn(
        // Base styles (relative, group, overflow, rounded)
        "relative group overflow-hidden rounded-full",
        // Transitions and transforms
        "transition-all duration-300 ease-out transform",
        // Focus states
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-500",
        // Mount animation
        isMounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        // Prop className for overrides
        className,
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-test-id={testId}
      aria-label={buttonText}
    >
      {/* Optional: Internal glow effect on hover (can be removed if conflicting with external glow) */}
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 opacity-0 blur-md transition-opacity duration-300",
          isHovered ? "opacity-70" : "opacity-0",
        )}
        aria-hidden="true"
      ></span>

      {/* Button inner content container */}
      <span
        className={cn(
          // Relative positioning for content, block display, rounded, background, padding, text style
          "relative block rounded-full bg-black px-8 py-4 text-lg font-bold text-white",
           // Transition for background change on hover
          "transition-colors duration-300", // Changed from transition-all
          "group-hover:bg-black/80", // Slightly transparent background on hover
        )}
      >
        <span className="flex items-center justify-center">
          {buttonText}
          {/* Icon container with hover effect */}
          <span
            className={cn(
              "ml-2 transition-transform duration-300 inline-flex items-center", // Use transform transition
              isHovered ? "translate-x-1" : "translate-x-0",
            )}
          >
            <AnimatedCocktailIcon className="w-5 h-5 mr-1" />
            <ArrowRight size={18} />
          </span>
        </span>
      </span>

      {/* Optional: Liquid animation effect (can be removed if conflicting) */}
      <span
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400",
          "transition-all duration-500 ease-in-out",
          isHovered ? "h-[45%] opacity-20" : "h-1 opacity-0", // Expand height and fade in slightly on hover
        )}
         aria-hidden="true"
      ></span>
    </button>
  )
}