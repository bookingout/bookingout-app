"use client"

import { useEffect, useRef } from "react"

interface AnimatedTitleProps {
  text: string
  className?: string
}

export default function AnimatedTitle({ text, className = "" }: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // This ensures the animation starts after component mount
    if (titleRef.current) {
      titleRef.current.style.opacity = "1"
    }
  }, [])

  return (
    <h1
      ref={titleRef}
      className={`text-5xl md:text-7xl font-bold font-poppins pb-3 mb-5 opacity-0 transition-opacity duration-500 ${className}`}
      style={{
        background: "linear-gradient(-45deg, #ec4899, #0891b2, #ec4899, #0891b2)",
        backgroundSize: "300% 300%",
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        animation: "gradient 8s ease infinite",
      }}
    >
      {text}
    </h1>
  )
}

