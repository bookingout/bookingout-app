"use client"

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Assuming you use ShadCN Button
import { cn } from "@/lib/utils"; // Assuming you use ShadCN utils

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    // Ensure window object is available (client-side check)
    if (typeof window !== 'undefined') {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    // Ensure window object is available
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility, { passive: true }); // Use passive listener

      // Initial check in case page loads already scrolled
      toggleVisibility();

      // Cleanup listener on component unmount
      return () => window.removeEventListener('scroll', toggleVisibility);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs once on mount

  // Scroll to top functionality
  const scrollToTop = () => {
    // Ensure window object is available
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Use smooth scrolling
      });
    }
  };

  return (
    <Button
      variant="outline" // Or choose another variant
      size="icon" // Make it a small icon button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-5 right-5 z-50 rounded-full h-10 w-10 transition-opacity duration-300 ease-in-out", // Positioning and base style
        "bg-background/80 backdrop-blur-sm border-border hover:bg-accent", // Appearance
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none' // Visibility control
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}