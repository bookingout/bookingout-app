"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
// --- Use Language Context ---
import { useLanguage } from "@/lib/contexts/language-context";
// --- Import the main translations object directly ---
import { translations } from "@/lib/translations"; // Adjust path if needed

// Keep only the image URLs here
const imageSources = [
  { url: "/club-image.png" },
  { url: "/resort-image.png" },
  { url: "/social-image.png" },
  { url: "/romantic-image.png" },
]

// Define the structure of a translated item
interface TranslatedItem {
    title: string;
    description: string;
    alt: string;
}

export default function DynamicImageSection() {
  // Get the current language object and the 't' function (though we might not use 't' directly for the array)
  const { currentLanguage } = useLanguage();
  const currentLangCode = currentLanguage.code as keyof typeof translations; // Get 'en' or 'pl'

  const [activeIndex, setActiveIndex] = useState(0)

  // --- Get translated items array DIRECTLY from the translations object ---
  const translatedItems: TranslatedItem[] =
      translations[currentLangCode]?.dynamicImageSection?.items || [];
  // --- End direct access ---

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      // Use the length of imageSources as it's fixed and known
      const numberOfItems = imageSources.length;
      if (numberOfItems > 0) {
           setActiveIndex((prevIndex) => (prevIndex + 1) % numberOfItems);
      }
    }, 3000);
    return () => clearInterval(timer);
    // Run only once on mount
  }, []);


  // Get the current item based on activeIndex
  // Use optional chaining and provide default values if translatedItems is empty initially
  const currentItem = translatedItems[activeIndex] || { title: "Loading...", description: "", alt: "Loading image description" };
  const currentImageSource = imageSources[activeIndex] || { url: "/placeholder.svg" };

  return (
    <section className="py-20 px-4 bg-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Container */}
          <div className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex} // Key change triggers animation
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <img
                    src={currentImageSource.url}
                    alt={currentItem.alt} // Use alt from currentItem (with fallback)
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-xl"></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            {/* No conditional rendering needed now, currentItem has fallbacks */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex} // Key change triggers animation
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
                    {/* Use translated title from currentItem */}
                    {currentItem.title}
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  {/* Use translated description from currentItem */}
                  {currentItem.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Image Indicators */}
            <div className="flex space-x-2 mt-8">
              {imageSources.map((_, index) => (
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