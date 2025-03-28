"use client"

import { Heart, Music, Palmtree } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { translations } from "@/lib/translations"
import LanguageSelector from "@/components/language-selector"
import NewsletterSignup from "@/components/newsletter-signup"
import SubtitleCarousel from "@/components/subtitle-carousel"
import AnimatedTitle from "@/components/animated-title"
import FAQSection from "@/components/faq-section"
import SocialLinks from "@/components/social-links"
import DynamicImageSection from "@/components/dynamic-image-section"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [language, setLanguage] = useState("en")
  const t = translations[language]
  const newsletterRef = useRef<HTMLDivElement>(null)

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("preferredLanguage", lang)
  }

  // Scroll to newsletter section
  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Load preferred language from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage")
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pl")) {
      setLanguage(savedLanguage)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/club-lights.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          {/* Animated Title */}
          <AnimatedTitle text="BookingOut.fun" />

          <p className="text-xl md:text-2xl font-opensans text-gray-300 mb-10">{t.hero.subtitle}</p>

          {/* Subtitle Carousel */}
          <div className="mb-12">
            <SubtitleCarousel subtitles={t.hero.carouselSubtitles} interval={2500} />
          </div>

          <Link
            href="#features"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-full transition-colors"
          >
            {t.hero.cta}
          </Link>
        </div>
      </section>

      {/* Dynamic Image Section */}
      <DynamicImageSection />

      {/* Features Grid Section */}
      <section id="features" className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.features.title}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-800 rounded-xl p-8 group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-full h-1 bg-pink-500 rounded-t-xl absolute top-0 left-0 right-0 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-500 transition-all duration-500"></div>
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-gray-600 transition-colors">
                <Music className="w-8 h-8 text-pink-500 group-hover:text-pink-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{t.features.card1.title}</h3>
              <p className="text-gray-300 text-center">{t.features.card1.description}</p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800 rounded-xl p-8 group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-full h-1 bg-cyan-500 rounded-t-xl absolute top-0 left-0 right-0 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-pink-500 transition-all duration-500"></div>
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-gray-600 transition-colors">
                <Palmtree className="w-8 h-8 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{t.features.card2.title}</h3>
              <p className="text-gray-300 text-center">{t.features.card2.description}</p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800 rounded-xl p-8 group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-full h-1 bg-pink-500 rounded-t-xl absolute top-0 left-0 right-0 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-500 transition-all duration-500"></div>
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-gray-600 transition-colors">
                <Heart className="w-8 h-8 text-pink-500 group-hover:text-pink-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{t.features.card3.title}</h3>
              <p className="text-gray-300 text-center">{t.features.card3.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section ref={newsletterRef} className="py-20 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup
            title={t.newsletter.title}
            description={t.newsletter.description}
            buttonText={t.newsletter.buttonText}
            successMessage={t.newsletter.successMessage}
            placeholderText={t.newsletter.placeholder}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-900">
        <FAQSection title={t.faq.title} faqs={t.faq.items} />
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <SocialLinks
            title={t.social.title}
            links={[
              { platform: "facebook", url: "https://facebook.com" },
              { platform: "instagram", url: "https://instagram.com" },
              { platform: "twitter", url: "https://twitter.com" },
            ]}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400">
        <p>© 2025 BookingOut.fun | {t.footer.rights}</p>
      </footer>

      {/* Toast notifications */}
      <Toaster />
    </main>
  )
}

