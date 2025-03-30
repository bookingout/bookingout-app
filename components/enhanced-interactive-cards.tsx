"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Music, TreePalmIcon as PalmTree, Heart, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
// --- ADDED: Import useLanguage ---
import { useLanguage } from "@/lib/contexts/language-context";

// Interface remains the same, but title/description will be fetched
interface ExperienceCardData {
  id: string
  icon: React.ReactNode
  image: string
  alt: string
  gradientFrom: string
  gradientTo: string
}

export default function EnhancedInteractiveCards() {
  // --- ADDED: Get translation function ---
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Define only the non-translatable data here
  const experiencesData: ExperienceCardData[] = [
    {
      id: "nightlife", // Used as part of the translation key
      icon: <Music className="h-6 w-6" />,
      image: "/images/nightlife-bg.png",
      alt: "Nightclub with colorful lights and people dancing", // Alt text could also be translated if needed
      gradientFrom: "#FF4D8F",
      gradientTo: "#FF8A8A",
    },
    {
      id: "resorts", // Used as part of the translation key
      icon: <PalmTree className="h-6 w-6" />,
      image: "/images/resort-pool.png",
      alt: "Luxury resort with pool and palm trees", // Alt text could also be translated if needed
      gradientFrom: "#36D1DC",
      gradientTo: "#5B86E5",
    },
    {
      id: "spaces", // Used as part of the translation key
      icon: <Heart className="h-6 w-6" />,
      image: "/images/friendly-lounge.png",
      alt: "Cozy lounge area with people socializing", // Alt text could also be translated if needed
      gradientFrom: "#8A2387",
      gradientTo: "#E94057",
    },
  ]

  // Scroll function remains the same
  const handleScrollToNewsletter = () => {
    if (typeof window !== 'undefined') {
      const newsletterSection = document.getElementById('newsletter');
      if (newsletterSection) {
        newsletterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn('Newsletter section with id "newsletter" not found.');
      }
    }
  };

  return (
    <section id="offer-section" className="w-full py-16 md:py-24 bg-gray-950 text-white">
     <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          {/* Use translation for main title */}
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('experiences.mainTitle')}
          </h2>
          {/* Use translation for main subtitle */}
          <p className="max-w-[700px] text-gray-400 md:text-xl">
            {t('experiences.mainSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Map over the data array */}
          {experiencesData.map((experience) => (
            <div
              key={experience.id}
              className={cn(/* ... existing classes ... */
                "relative group rounded-xl overflow-hidden transition-all duration-500 ease-out",
                "h-[380px] md:h-[420px]",
                "transform-gpu",
                hoveredCard === experience.id ? "scale-105 shadow-2xl z-10" : "scale-100 shadow-lg z-0",
              )}
              onMouseEnter={() => setHoveredCard(experience.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onFocus={() => setHoveredCard(experience.id)}
              onBlur={() => setHoveredCard(null)}
              tabIndex={0}
              role="button"
              aria-pressed={hoveredCard === experience.id}
            >
              {/* Gradient top border - remains the same */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 z-20"
                style={{
                  background: `linear-gradient(to right, ${experience.gradientFrom}, ${experience.gradientTo})`,
                }}
              />

              {/* Background image - remains the same */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.alt} // Consider translating alt text too if needed: t(`experiences.${experience.id}.alt`)
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    "object-cover transition-all duration-700 ease-in-out",
                    hoveredCard === experience.id ? "opacity-100 scale-110" : "opacity-0 scale-100",
                  )}
                  priority={true}
                />
              </div>

              {/* Solid background - remains the same */}
              <div
                className={cn(
                  "absolute inset-0 bg-gray-900 transition-all duration-700 ease-in-out",
                  hoveredCard === experience.id ? "opacity-0" : "opacity-100",
                )}
              />

              {/* Overlay gradient - remains the same */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40 transition-opacity duration-500",
                  hoveredCard === experience.id ? "opacity-95" : "opacity-0",
                )}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col p-6 z-10">
                 {/* Icon container - remains the same */}
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-all duration-500",
                    hoveredCard === experience.id
                      ? "bg-white text-gray-900 transform scale-110 shadow-glow"
                      : "bg-gray-800 text-pink-400",
                  )}
                  style={{
                    boxShadow: hoveredCard === experience.id ? `0 0 20px ${experience.gradientFrom}80` : "none",
                  }}
                >
                  {experience.icon}
                </div>

                 {/* Use translation for card title */}
                <h3
                  className={cn(
                    "text-xl font-bold mb-3 transition-all duration-500",
                    hoveredCard === experience.id ? "text-white" : "text-white",
                  )}
                >
                  {t(`experiences.${experience.id}.title`)} {/* Dynamic key based on ID */}
                </h3>

                 {/* Use translation for card description */}
                <p
                  className={cn(
                    "text-sm transition-all duration-500",
                    hoveredCard === experience.id ? "text-white/90" : "text-gray-400",
                  )}
                >
                  {t(`experiences.${experience.id}.description`)} {/* Dynamic key based on ID */}
                </p>

                <div className="mt-auto pt-4">
                  {/* Modified Button */}
                  <button
                    type="button"
                    onClick={handleScrollToNewsletter}
                    className={cn(
                      "group/button inline-flex items-center text-sm font-medium rounded-full transition-all duration-500",
                      "px-4 py-2",
                      hoveredCard === experience.id
                        ? "bg-white/10 backdrop-blur-sm text-white opacity-100 transform translate-y-0"
                        : "bg-transparent text-pink-400 opacity-0 transform translate-y-4",
                    )}
                    style={{
                      background:
                        hoveredCard === experience.id
                          ? `linear-gradient(90deg, ${experience.gradientFrom}40, ${experience.gradientTo}40)`
                          : "transparent",
                    }}
                    aria-hidden={hoveredCard !== experience.id}
                  >
                     {/* Use translation for button text */}
                    {t('experiences.buttonText')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </button>
                  {/* End Of Modified Button */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}