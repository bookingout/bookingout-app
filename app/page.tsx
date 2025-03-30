"use client"

// --- Core Imports ---
import { useRef } from "react" // Keep useRef if needed later
import { motion } from "framer-motion";

// --- Language & Translation ---
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/translations"; // Import the main translations object directly for FAQ data

// --- UI Components ---
import SubtitleCarousel from "@/components/subtitle-carousel"
import ElegantCTAButton from "@/components/ui/elegant-cta-button";
// import AnimatedTitle from "@/components/animated-title" // Remove if not used
import FAQSection from "@/components/faq-section"
import SocialLinks from "@/components/social-links"
import DynamicImageSection from "@/components/dynamic-image-section" // Keep if used
import { Toaster } from "@/components/ui/toaster"
import BookingOutAboutSection from '@/components/bookingout-about-section';
import NewsletterSection from '@/components/newsletter-section'; // Assume this uses useLanguage internally
import EnhancedInteractiveCards from '@/components/enhanced-interactive-cards'; // Keep if used
import VideoBackground from '@/components/video-background';

// --- Carousel Subtitles (Hardcoded as per previous step) ---
const carouselSubtitles = [
  "Vibrant Clubs",
  "Relaxing Resorts",
  "Friendly Spaces",
  "Unforgettable Fun",
  "Exciting Encounters",
  "Handsome Strangers",
  "Blind Dates",
  "Dark Room",
  "Cruising",
  "Let Your Fantasy Go Wild",
]

// --- Page Component ---
export default function Home() {
  const { currentLanguage, t } = useLanguage();
  // const newsletterRef = useRef<HTMLDivElement>(null);

  // --- Get FAQ data for the current language ---
  // Type assertion needed because the structure is known
  const faqData = (translations[currentLanguage.code as keyof typeof translations] as any)?.faqSection?.items || [];

  return (
    <> {/* Using Fragment */}

      {/* === HERO SECTION === */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden text-center text-white">
        <VideoBackground
          videoUrl="/videos/club-lights.mp4" // Use your actual video path
          fallbackImageUrl="/images/your-hero-fallback.jpg" // Use your actual fallback image path
        />

        {/* Content */}
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          {/* Big Title */}
           <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
             <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
               BookingOut.fun
             </span>
           </h1>
{/* Optional: Polish description text */}
<motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/90 text-sm md:text-base mb-6 font-medium max-w-lg mx-auto"
          >
           
            {/* Or use a translation key if added: {t("polish.description.key")} */}
          </motion.p>
          {/* Subtitle - Use corrected key */}
          <p className="text-lg md:text-xl font-light text-gray-300 mb-8 whitespace-pre-line">
            {t("hero.subtitle")} {/* CORRECTED KEY */}
          </p>

          {/* SubtitleCarousel */}
          <div className="my-12">
            <SubtitleCarousel subtitles={carouselSubtitles} interval={3000} />
          </div>

          {/* CTA Section */}
          

          {/* CTA Button with external glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 blur-lg animate-pulse"></div>
              {/* ElegantCTAButton uses t("hero.cta") internally - ensure that key exists */}
              <ElegantCTAButton />
            </div>
          </motion.div>
          {/* === END CTA Section === */}
        </div>
      </section>
      {/* === END OF HERO SECTION === */}

      {/* Dynamic Image Section */}
      <DynamicImageSection />

      {/* About Us Section */}
      <section id="about-us" className="py-20 px-4 bg-gray-800">
        <BookingOutAboutSection language={currentLanguage.code as "en" | "pl"} />
      </section>

      {/* Enhanced Interactive Cards Section */}
      <EnhancedInteractiveCards />

      {/* Newsletter Section */}
      {/* Assuming NewsletterSection uses useLanguage internally for keys like "newsletterSection.title" etc. */}
      <NewsletterSection /> {/* Render directly, no props needed */}

      {/* FAQ Section - Use corrected key and pass data */}
      <section id="faq-section" className="py-20 px-4 bg-gray-900">
        <FAQSection
            title={t("faqSection.title")} // CORRECTED KEY
            faqs={faqData} // Pass the fetched FAQ data
        />
      </section>

      {/* Social Media Section - Keys should be correct */}
      <section id="contact-section" className="py-16 px-4 bg-gray-800">
         <div className="max-w-4xl mx-auto">
          <SocialLinks
            title={t("social.title") || "Follow Us"} // Correct key + fallback
            links={[
              { platform: "facebook", url: "https://facebook.com" },
              { platform: "instagram", url: "https://instagram.com" },
              { platform: "twitter", url: "https://twitter.com" },
            ]}
          />
        </div>
      </section>

      {/* Footer - Keys should be correct */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400">
        <p>© {new Date().getFullYear()} BookingOut.fun | {t("footer.rights") || "All rights reserved."}</p> {/* Correct key + fallback */}
      </footer>

      {/* Toast notifications */}
      <Toaster />
    </> // Close Fragment
  )
}