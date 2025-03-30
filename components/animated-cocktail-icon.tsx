"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCocktailIconProps {
  className?: string
  hoverColor?: string
  initialColor?: string
}

export default function AnimatedCocktailIcon({
  className,
  hoverColor = "#ec4899", // Default pink
  initialColor = "currentColor",
}: AnimatedCocktailIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isHovered ? hoverColor : initialColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-all duration-300", isHovered ? "scale-125" : "scale-100", className)}
      width="24"
      height="24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Cocktail icon"
    >
      <path d="M8 21h8m-4-4v4m-5-12l7-7m-7 7h8a4 4 0 0 0 2-7.5A4 4 0 0 0 12 2h-1a4 4 0 0 0-2 7.5" />
      <path d="M12 12a4 4 0 0 0 0-8" />
    </svg>
  )
}

