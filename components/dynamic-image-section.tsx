"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  {
    url: "/club-image.png",
    alt: "Vibrant nightclub scene with colorful lights",
    title: "Nightlife Vibes",
    description: "Experience the energy of Poland's most exclusive clubs",
  },
  {
    url: "/resort-image.png",
    alt: "Luxurious resort pool with palm trees",
    title: "Relaxation Retreats",
    description: "Unwind in stunning resorts with world-class amenities",
  },
  {
    url: "/social-image.png",
    alt: "Social gathering in a modern lounge",
    title: "Social Spaces",
    description: "Connect with like-minded people in stylish venues",
  },
  {
    url: "/romantic-image.png",
    alt: "Romantic dinner setting with city views",
    title: "Unforgettable Moments",
    description: "Create memories that last a lifetime",
  },
]

export default function DynamicImageSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Change image based on scroll position
  // useEffect(() => {
  //   // Get viewport height to calculate relative scroll position
  //   const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  //   // Change image every 50vh of scrolling (adjust as needed)
  //   const newIndex = Math.min(Math.floor(scrollY / (vh * 0.5)) % images.length, images.length - 1)

  //   if (newIndex !== activeIndex && newIndex >= 0) {
  //     setActiveIndex(newIndex)
  //   }
  // }, [scrollY, activeIndex])

  // Add this useEffect hook inside your DynamicImageSection component function

useEffect(() => {
  // Set up the interval timer
  const timer = setInterval(() => {
    // Calculate the next index
    // Use the modulo operator (%) to loop back to 0 after the last image
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 3000); // Change image every 3000ms (3 seconds) - adjust as needed

  // Clean up the interval timer when the component unmounts
  // or when activeIndex changes manually (important!)
  return () => clearInterval(timer);

}, []); // Empty dependency array means this effect runs only once on mount

  return (
    <section className="py-20 px-4 bg-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Container */}
          <div className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <img
                    src={images[activeIndex].url || "/placeholder.svg"}
                    alt={images[activeIndex].alt}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-xl"></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
                    {images[activeIndex].title}
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">{images[activeIndex].description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Image Indicators */}
            <div className="flex space-x-2 mt-8">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-pink-500 w-8" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`View image ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

