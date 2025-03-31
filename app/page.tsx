"use client"

import { useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/translations";
import SubtitleCarousel from "@/components/subtitle-carousel";
import ElegantCTAButton from "@/components/ui/elegant-cta-button";
import FAQSection from "@/components/faq-section";
import SocialLinks from "@/components/social-links";
import DynamicImageSection from "@/components/dynamic-image-section";
import { Toaster } from "@/components/ui/toaster";
import BookingOutAboutSection from '@/components/bookingout-about-section';
import NewsletterSection from '@/components/newsletter-section';
import EnhancedInteractiveCards from '@/components/enhanced-interactive-cards';
import VideoBackground from '@/components/video-background';

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
];

export default function Home() {
const { currentLanguage, t } = useLanguage();
const faqData = (translations?.[currentLanguage.code as keyof typeof translations] as any)?.faqSection?.items || [];
const handleScrollToNewsletter = () => {
  const newsletterSection = document.getElementById('newsletter-section');
  if (newsletterSection) {
    newsletterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.warn('Newsletter section with id "newsletter-section" not found.');
  }
};

return (
  <>
    {/* === HERO SECTION === */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-center text-white">
      <VideoBackground videoUrl="/videos/club-lights.mp4" fallbackImageUrl="/images/your-hero-fallback.jpg" />
      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            BookingOut.fun
          </span>
        </h1>
        <motion.p className="text-white/90 text-sm md:text-base mb-6 font-medium max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
        </motion.p>
        <p className="text-lg md:text-xl font-light text-gray-300 mb-8 whitespace-pre-line">
          {t("hero.subtitle")}
        </p>
        <div className="my-12">
          <SubtitleCarousel subtitles={carouselSubtitles} interval={3000} />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 blur-lg animate-pulse"></div>
            <ElegantCTAButton onClick={handleScrollToNewsletter} /> {/* Added the onClick prop */}
          </div>
        </motion.div>
      </div>
    </section>
    {/* === END OF HERO SECTION === */}

    <DynamicImageSection />
    <section id="about-us" className="py-20 px-4 bg-gray-800">
      <BookingOutAboutSection language={currentLanguage.code as "en" | "pl"} />
    </section>
    <EnhancedInteractiveCards />
    <NewsletterSection />
    <section id="faq-section" className="py-20 px-4 bg-gray-900">
      <FAQSection title={t("faqSection.title")} faqs={faqData} />
    </section>
    <section id="contact-section" className="py-16 px-4 bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <SocialLinks title={t("social.title") || "Follow Us"} links={[
          { platform: "facebook", url: "https://facebook.com" },
          { platform: "instagram", url: "https://instagram.com" },
          { platform: "twitter", url: "https://twitter.com" },
        ]} />
      </div>
    </section>
    <footer className="py-8 bg-gray-900 text-center text-gray-400">
      <p>© {new Date().getFullYear()} BookingOut.fun | {t("footer.rights") || "All rights reserved."}</p>
    </footer>
    <Toaster />
  </>
);
}