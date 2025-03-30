"use client"

// Necessary imports for this specific component
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button" // Assuming you have this ShadCN component
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"


// Define the carousel item type (copied from original v0 code)
interface CarouselItem {
  id: number
  title: { en: string; pl: string }
  content: { en: string; pl: string }
  highlightedText: { en: string; pl: string }
  videoSrc: string
  posterSrc: string
}

// Define props - this component now receives language from its parent (page.tsx)
interface BookingOutAboutProps {
  language: "en" | "pl";
}

// Renamed component, accepts language prop
export default function BookingOutAboutSection({ language }: BookingOutAboutProps) {
  // State for the carousel is kept internal to this component
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true) // Assuming videos should play initially
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

   // ---> PASTE THE NEW useEffect HOOK HERE <---
   useEffect(() => {
    const initialTimeoutId = setTimeout(() => {
      const firstVideo = videoRefs.current[0];
      if (firstVideo && isPlaying) {
        if (firstVideo.readyState >= 3) {
            firstVideo.play().catch(err => console.error("Delayed initial autoplay failed:", err));
        } else {
            const handleInitialCanPlay = () => {
                if (isPlaying) {
                   firstVideo.play().catch(err => console.error("Delayed initial autoplay failed on canplay:", err));
                }
                firstVideo.removeEventListener('canplaythrough', handleInitialCanPlay);
            };
            firstVideo.addEventListener('canplaythrough', handleInitialCanPlay);
        }
      }
    }, 500);
    return () => clearTimeout(initialTimeoutId);
  }, []); // Empty dependency array means ONLY ONCE after initial mount
  // ---> END OF PASTED HOOK <---

  // Carousel data (copied from original v0 code)
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
      videoSrc: "/videos/Welcoming Atmosphere.mp4", // Ensure these videos are in your public folder
      posterSrc: "/placeholder.svg?height=720&width=1280&text=Exclusive+Events", // Placeholder image path
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
      videoSrc: "/videos/Avant-Garde.mp4", // Ensure these videos are in your public folder
      posterSrc: "/placeholder.svg?height=720&width=1280&text=Avant-Garde+Experiences", // Placeholder image path
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
      videoSrc: "/videos/Exclusive Events.mp4", // Ensure these videos are in your public folder
      posterSrc: "/placeholder.svg?height=720&width=1280&text=Welcoming+Atmosphere", // Placeholder image path
    },
  ]

  // Carousel logic functions (copied from original v0 code)
  const goToSlide = (index: number) => {
    videoRefs.current.forEach((video) => {
      if (video) { if (video.played.length > 0) { video.pause(); } }
    });
    setActiveIndex(index);
    setTimeout(() => {
      const activeVideo = videoRefs.current[index];
      if (activeVideo && isPlaying) {
        if (activeVideo.readyState >= 2) {
          activeVideo.play().catch((err) => { console.log("Video play error handled:", err); setIsPlaying(false); });
        } else {
          const handleCanPlay = () => {
            activeVideo.play().catch((err) => { console.log("Video play error handled:", err); setIsPlaying(false); });
            activeVideo.removeEventListener("canplay", handleCanPlay);
          };
          activeVideo.addEventListener("canplay", handleCanPlay);
        }
      }
    }, 300);
  }
  const nextSlide = () => { goToSlide((activeIndex + 1) % carouselItems.length); }
  const prevSlide = () => { goToSlide((activeIndex - 1 + carouselItems.length) % carouselItems.length); }
  const togglePlay = () => {
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      if (isPlaying) { activeVideo.pause(); setIsPlaying(false); }
      else {
        if (activeVideo.readyState >= 2) {
          activeVideo.play().catch((err) => console.log("Video play error handled:", err)); setIsPlaying(true);
        } else {
          const handleCanPlay = () => {
            activeVideo.play().catch((err) => console.log("Video play error handled:", err)); setIsPlaying(true);
            activeVideo.removeEventListener("canplay", handleCanPlay);
          };
          activeVideo.addEventListener("canplay", handleCanPlay);
        }
      }
    }
  }

  // useEffect hooks for carousel logic (copied from original v0 code)
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        const activeVideo = videoRefs.current[activeIndex];
        if (activeVideo && activeVideo.currentTime > 5) { nextSlide(); } // Reduced auto-advance check time for testing
      }, 5000); // Reduced interval time for testing
    }
    return () => { if (interval) clearInterval(interval); };
  }, [activeIndex, isPlaying]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, carouselItems.length);
  }, [carouselItems.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const handleLoadStart = () => {};
        const handleLoadedData = () => {
          if (index === activeIndex && isPlaying) { video.play().catch((err) => console.log("Video play error handled:", err)); }
        };
        video.addEventListener("loadstart", handleLoadStart);
        video.addEventListener("loadeddata", handleLoadedData);
        return () => {
          video.removeEventListener("loadstart", handleLoadStart);
          video.removeEventListener("loadeddata", handleLoadedData);
        };
      }
    });
  }, [videoRefs.current, activeIndex, isPlaying]); // Simplified dependency array if possible


  // Return ONLY the JSX for the About Us section/carousel
  // Removed the outer div, header, footer, and language buttons from original v0 code
  return (
    <section className="w-full max-w-6xl mx-auto">
        {/* These titles/paragraphs are from the v0 code */}
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
        {language === "en" ? "About Us" : "O nas"}
      </h2>
      <p className="text-xl text-center text-white/80 mb-12 max-w-3xl mx-auto">
        {language === "en"
          ? "Express yourself / Don't repress yourself!"
          : "Express yourself / Don't repress yourself!"}
      </p>

      {/* Carousel Container (copied from original v0 code) */}
      <div className="relative mb-16">
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-pink-500/20 border border-gray-700/50">
          <div className="relative">
            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`transition-opacity duration-500 ${activeIndex === index ? "opacity-100 z-10" : "opacity-0 absolute inset-0 -z-10"}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                  <div className="relative aspect-video lg:aspect-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-pink-500/10 z-10"></div>
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="w-full h-full object-cover"
                      muted loop playsInline 
                      //poster={item.posterSrc}
                      preload="auto"
                    >
                      <source src={item.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-4 right-4 z-20">
                      <Button
                        variant="outline" size="sm"
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
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all"
            onClick={prevSlide} aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all"
            onClick={nextSlide} aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? "bg-pink-500 w-8" : "bg-gray-600 hover:bg-gray-400"}`}
              onClick={() => goToSlide(index)} aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full z-20">
          {activeIndex + 1} / {carouselItems.length}
        </div>
      </div>

      {/* Removed the final CTA button from the original v0 code, assuming you have one elsewhere */}

    </section>
  )
}