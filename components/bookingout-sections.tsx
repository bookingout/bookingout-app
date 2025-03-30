"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Define the carousel item type
interface CarouselItem {
  id: number
  title: {
    en: string
    pl: string
  }
  content: {
    en: string
    pl: string
  }
  highlightedText: {
    en: string
    pl: string
  }
  videoSrc: string
  posterSrc: string
}

export default function BookingOutSections() {
  const [language, setLanguage] = useState<"en" | "pl">("en")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Carousel data
  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: {
        en: "Exclusive Events",
        pl: "Ekskluzywne Wydarzenia",
      },
      content: {
        en: "Welcome to BookingOut.fun – a space created for men who value openness, avant-garde, and unforgettable experiences. With us, you'll find access to the most exclusive gay parties, clubs, and events in Poland.",
        pl: "Witamy w BookingOut.fun – przestrzeni stworzonej mężczyzn, którzy cenią sobie otwartość, awangardę i niezapomniane wrażenia. U nas znajdziesz dostęp do najbardziej ekskluzywnych gay imprez, klubów i wydarzeń w Polsce.",
      },
      highlightedText: {
        en: "Discover the most vibrant and exclusive events in Poland's nightlife scene.",
        pl: "Odkryj najbardziej tętniące życiem i ekskluzywne wydarzenia na polskiej scenie nocnej.",
      },
      videoSrc: "/video-placeholder-1.mp4",
      posterSrc: "/placeholder.svg?height=720&width=1280&text=Exclusive+Events",
    },
    {
      id: 2,
      title: {
        en: "Avant-Garde Experiences",
        pl: "Awangardowe Doświadczenia",
      },
      content: {
        en: "We care about your safety and comfort, which is why we ensure that every activity takes place in an atmosphere of mutual respect and acceptance. BookingOut.fun is a place where you can be yourself and discover your desires.",
        pl: "Zależy nam na Twoim bezpieczeństwie i komforcie, dlatego dbamy o to, aby każda aktywność odbywała się w atmosferze wzajemnego szacunku i akceptacji. BookingOut.fun to miejsce, gdzie możesz być sobą i odkrywać swoje pragnienia.",
      },
      highlightedText: {
        en: "Experience cutting-edge entertainment that pushes boundaries and ignites your senses.",
        pl: "Doświadcz rozrywki na najwyższym poziomie, która przesuwa granice i rozbudza zmysły.",
      },
      videoSrc: "/video-placeholder-2.mp4",
      posterSrc: "/placeholder.svg?height=720&width=1280&text=Avant-Garde+Experiences",
    },
    {
      id: 3,
      title: {
        en: "Welcoming Atmosphere",
        pl: "Przyjazna Atmosfera",
      },
      content: {
        en: "BookingOut.fun is a place where you can be yourself and discover your desires. Be yourself! Our community values authenticity, respect, and the freedom to express who you truly are.",
        pl: "BookingOut.fun to miejsce, gdzie możesz być sobą i odkrywać swoje pragnienia. Bądź sobą! Nasza społeczność ceni autentyczność, szacunek i wolność wyrażania tego, kim naprawdę jesteś.",
      },
      highlightedText: {
        en: "Join a community that celebrates diversity and creates spaces where everyone feels welcome.",
        pl: "Dołącz do społeczności, która celebruje różnorodność i tworzy przestrzenie, w których każdy czuje się mile widziany.",
      },
      videoSrc: "/video-placeholder-3.mp4",
      posterSrc: "/placeholder.svg?height=720&width=1280&text=Welcoming+Atmosphere",
    },
  ]

  // Handle carousel navigation
  const goToSlide = (index: number) => {
    // First, pause all videos and handle any pending play promises
    videoRefs.current.forEach((video) => {
      if (video) {
        // Safely pause the video
        if (video.played.length > 0) {
          video.pause()
        }
      }
    })

    // Update the active index
    setActiveIndex(index)

    // Play the active video after a short delay to ensure DOM updates
    setTimeout(() => {
      const activeVideo = videoRefs.current[index]
      if (activeVideo && isPlaying) {
        // Check if video is ready to play
        if (activeVideo.readyState >= 2) {
          activeVideo.play().catch((err) => {
            console.log("Video play error handled:", err)
            // If play fails, update the UI state
            setIsPlaying(false)
          })
        } else {
          // If video is not ready, set up an event listener
          const handleCanPlay = () => {
            activeVideo.play().catch((err) => {
              console.log("Video play error handled:", err)
              setIsPlaying(false)
            })
            activeVideo.removeEventListener("canplay", handleCanPlay)
          }
          activeVideo.addEventListener("canplay", handleCanPlay)
        }
      }
    }, 300) // Increased delay to ensure DOM updates complete
  }

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % carouselItems.length
    goToSlide(newIndex)
  }

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length
    goToSlide(newIndex)
  }

  // Toggle video play/pause
  const togglePlay = () => {
    const activeVideo = videoRefs.current[activeIndex]
    if (activeVideo) {
      if (isPlaying) {
        activeVideo.pause()
        setIsPlaying(false)
      } else {
        // Only attempt to play if the video is ready
        if (activeVideo.readyState >= 2) {
          activeVideo.play().catch((err) => {
            console.log("Video play error handled:", err)
          })
          setIsPlaying(true)
        } else {
          // If video is not ready, set up an event listener
          const handleCanPlay = () => {
            activeVideo.play().catch((err) => {
              console.log("Video play error handled:", err)
            })
            setIsPlaying(true)
            activeVideo.removeEventListener("canplay", handleCanPlay)
          }
          activeVideo.addEventListener("canplay", handleCanPlay)
        }
      }
    }
  }

  // Auto-advance carousel (optional)
  useEffect(() => {
    let interval: NodeJS.Timeout

    // Only set up auto-advance if playing is enabled
    if (isPlaying) {
      interval = setInterval(() => {
        // Check if the current video has played for at least 5 seconds
        const activeVideo = videoRefs.current[activeIndex]
        if (activeVideo && activeVideo.currentTime > 5) {
          nextSlide()
        }
      }, 15000) // Change slide every 15 seconds if playing
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [activeIndex, isPlaying])

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, carouselItems.length)
  }, [carouselItems.length])

  useEffect(() => {
    // Set up event listeners for all videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        // Add loading state handling
        const handleLoadStart = () => {
          // You could add loading indicators here if needed
        }

        const handleLoadedData = () => {
          // If this is the active video and should be playing, play it
          if (index === activeIndex && isPlaying) {
            video.play().catch((err) => {
              console.log("Video play error handled:", err)
            })
          }
        }

        video.addEventListener("loadstart", handleLoadStart)
        video.addEventListener("loadeddata", handleLoadedData)

        // Clean up
        return () => {
          video.removeEventListener("loadstart", handleLoadStart)
          video.removeEventListener("loadeddata", handleLoadedData)
        }
      }
    })
  }, [videoRefs.current, activeIndex, isPlaying])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900">
      {/* Header with Language Toggle */}
      <header className="w-full py-6 px-4 flex justify-between items-center z-20">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          BookingOut.fun
        </h1>

        <div className="flex gap-2">
          <Button
            onClick={() => setLanguage("en")}
            className={`rounded-full px-4 py-1 text-sm ${language === "en" ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            English
          </Button>
          <Button
            onClick={() => setLanguage("pl")}
            className={`rounded-full px-4 py-1 text-sm ${language === "pl" ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            Polski
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* O nas (About Us) Section with Interactive Carousel */}
        <section className="w-full max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
            {language === "en" ? "About Us" : "O nas"}
          </h2>

          <p className="text-xl text-center text-white/80 mb-12 max-w-3xl mx-auto">
            {language === "en"
              ? "Express yourself / Don't repress yourself!"
              : "Express yourself / Don't repress yourself!"}
          </p>

          {/* Carousel Container */}
          <div className="relative mb-16">
            {/* Carousel Content */}
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-pink-500/20 border border-gray-700/50">
              {/* Carousel Items */}
              <div className="relative">
                {carouselItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`transition-opacity duration-500 ${activeIndex === index ? "opacity-100 z-10" : "opacity-0 absolute inset-0 -z-10"}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                      {/* Video Side */}
                      <div className="relative aspect-video lg:aspect-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-pink-500/10 z-10"></div>

                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          poster={item.posterSrc}
                          preload="auto"
                        >
                          <source src={item.videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>

                        <div className="absolute bottom-4 right-4 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-black/30 backdrop-blur-sm border-white/20 hover:bg-black/50 hover:border-white/40 text-white"
                            onClick={togglePlay}
                          >
                            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                            {isPlaying ? "⏸️" : "▶️"}
                          </Button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-white text-lg font-medium">
                            {language === "en" ? item.title.en : item.title.pl}
                          </p>
                        </div>
                      </div>

                      {/* Text Content Side */}
                      <div className="bg-gray-800/50 backdrop-blur-sm p-8 lg:p-10 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-6 text-white">
                          {language === "en" ? item.title.en : item.title.pl}
                        </h3>

                        <p className="text-white/80 leading-relaxed text-lg mb-6">
                          {language === "en" ? item.content.en : item.content.pl}
                        </p>

                        <div className="my-6 border-l-4 border-pink-500 pl-4">
                          <p className="text-white/90 italic">
                            {language === "en" ? item.highlightedText.en : item.highlightedText.pl}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index ? "bg-pink-500 w-8" : "bg-gray-600 hover:bg-gray-400"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full z-20">
              {activeIndex + 1} / {carouselItems.length}
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="text-center">
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 rounded-full px-10 py-7 text-xl font-semibold shadow-lg shadow-pink-500/20 transform hover:scale-105 transition-transform duration-300">
                {language === "en" ? "Get Ready to Explore!" : "Przygotuj się do odkrywania!"}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 text-center text-white/50 text-sm">
        <p>© {new Date().getFullYear()} BookingOut.fun</p>
      </footer>
    </div>
  )
}

