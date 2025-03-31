"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/contexts/language-context"
import AnimatedCocktailIcon from "../animated-cocktail-icon"

interface ElegantCTAButtonProps {
className?: string
onClick?: () => void
testId?: string
}

export default function ElegantCTAButton({ className, onClick, testId = "elegant-cta" }: ElegantCTAButtonProps) {
const { t } = useLanguage()
const [isHovered, setIsHovered] = useState(false)
const [isMounted, setIsMounted] = useState(false)
useEffect(() => {
  setIsMounted(true)
}, [])

const buttonText = t("hero.cta")

return (
  <button
    className={cn(
      "relative group overflow-hidden rounded-full",
      "transition-all duration-300 ease-out transform",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-500",
      isMounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      className,
    )}
    onClick={onClick}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    data-test-id={testId}
    aria-label={buttonText}
  >
    <span
      className={cn(
        "absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 opacity-0 blur-md transition-opacity duration-300",
        isHovered ? "opacity-70" : "opacity-0",
      )}
      aria-hidden="true"
    ></span>

    <span
      className={cn(
        "relative block rounded-full bg-black px-8 py-4 text-lg font-bold text-white",
        "transition-colors duration-300",
        "group-hover:bg-black/80",
      )}
    >
      <span className="flex items-center justify-center">
        {buttonText}
        <span
          className={cn(
            "ml-2 transition-transform duration-300 inline-flex items-center",
            isHovered ? "translate-x-1" : "translate-x-0",
          )}
        >
          <AnimatedCocktailIcon className="w-5 h-5 mr-1" />
          <ArrowRight size={18} />
        </span>
      </span>
    </span>

    <span
      className={cn(
        "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400",
        "transition-all duration-500 ease-in-out",
        isHovered ? "h-[45%] opacity-20" : "h-1 opacity-0",
      )}
      aria-hidden="true"
    ></span>
  </button>
)
}