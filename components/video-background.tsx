"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface VideoBackgroundProps {
  videoUrl: string
  fallbackImageUrl: string
  className?: string
}

export default function VideoBackground({ videoUrl, fallbackImageUrl, className }: VideoBackgroundProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    // We'll check if the video has loaded and is playing after a short delay
    const timer = setTimeout(() => {
      setIsVideoLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
      {/* Fallback image (visible until video loads) */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
          isVideoPlaying ? "opacity-0" : "opacity-100",
        )}
        style={{
          backgroundImage: `url('${fallbackImageUrl}')`,
          filter: "brightness(0.4)",
        }}
      />

      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
          isVideoLoaded ? "opacity-70" : "opacity-0",
        )}
        onPlay={() => setIsVideoPlaying(true)}
        style={{ filter: "brightness(0.4)" }}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback text for screen readers */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
    </div>
  )
}

