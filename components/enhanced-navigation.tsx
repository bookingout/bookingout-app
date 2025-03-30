"use client"

import { useState, useEffect } from "react" // Need useState, useEffect
import Link from "next/link"
import { Menu, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useLanguage } from "@/lib/contexts/language-context" // Use the context
import { cn } from "@/lib/utils"

// --- Language and Link Data ---
const languages = [
  { code: "en", name: "English" },
  { code: "pl", name: "Polski" },
 // { code: "de", name: "Deutsch" },
  //{ code: "fr", name: "Français" },
  //{ code: "es", name: "Español" },
]

const navigationLinks = [
  { href: "#about-us", key: "about.us" },
  { href: "#offer-section", key: "our.offer" },
  { href: "#newsletter-section", key: "newsletter" },
  { href: "#faq-section", key: "faq" },
  { href: "#contact-section", key: "contact" },
]
// --- End Language and Link Data ---

// Rename component to match filename if needed, but keep export default
export default function EnhancedNavigation() {
  const { currentLanguage, setLanguage, t } = useLanguage()
  // --- Reintroduce state for scroll effects ---
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Add this function inside the EnhancedNavigation component
const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  // Prevent the default link behavior if href is just "/" or "#"
  event.preventDefault();

  // Ensure window object is available (client-side)
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};
  // Handle scroll effect for navigation background and collapse state
  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      // Set background when scrolled at all
      setIsScrolled(window.scrollY > 10)
      // Collapse navigation after scrolling a bit further
      setIsCollapsed(window.scrollY > 100) // Adjust 100px threshold if needed
    }

    // Initial check in case the page loads scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true }) // Added passive: true
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) // Empty dependency array ensures this runs once on mount

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent",
        isCollapsed ? "py-2" : "py-4", // Adjust padding when collapsed
      )}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* Logo Wrapper for Positioning */}
                   <Link
            href="/"
            onClick={handleLogoClick} // Assuming you have this function from previous step
            className="transition-transform duration-200 ease-out cursor-pointer" // Base link styles
            style={{ transform: isCollapsed ? 'scale(0.95)' : 'scale(1)' }}
            aria-label="Scroll to top"
          >
            <div className="relative inline-block"> {/* Added relative container */}
              {/* Logo Text */}
              <span className="
                text-2xl font-bold {/* Font styles for the logo text */}
                bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent
              ">
                BookingOut.fun
              </span>

              {/* Coming Soon Badge */}
              <span className="
                absolute -top-1 -right-2 translate-x-full /* Positioning */
                inline-block whitespace-nowrap /* Prevent wrapping */
                rounded-full bg-pink-500/20 backdrop-blur-sm /* Subtle background */
                px-2 py-0.5 /* Padding */
                text-[10px] font-semibold text-pink-300 /* Text style */
                border border-pink-500/30 /* Subtle border */
                transform-gpu /* Hint for rendering */
                transition-opacity duration-300 /* Optional: fade with scroll */
                {/* {isCollapsed ? 'opacity-0' : 'opacity-100'} */ } {/* Uncomment to hide when collapsed */}
              ">
                {t('header.comingSoon')} {/* Use your translation key */}
              </span>
            </div>
          </Link>
          {/* End of Logo Wrapper */}

          {/* Desktop Navigation - Hides when collapsed */}
          <div
            className={cn(
              "items-center space-x-8 transition-opacity duration-300", // Use opacity for smoother transition
              //isCollapsed ? "hidden" : "hidden md:flex opacity-100", // Hide completely when collapsed
              isCollapsed ? "hidden" : "hidden lg:flex opacity-100", // <-- Changed md to lg
              !isCollapsed && "opacity-100" // Explicitly set opacity when not collapsed
            )}
            style={{ opacity: isCollapsed ? 0 : 1 }} // Control opacity with style for transition
            aria-hidden={isCollapsed} // Hide from accessibility tree when collapsed
          >
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white hover:text-cyan-400 transition-colors">
                {t(link.key)}
              </Link>
            ))}
             {/* Language Selector (moved inside desktop nav container) - Hides when collapsed */}
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-white" // Ensure hover color
                  aria-label="Select language"
                  tabIndex={isCollapsed ? -1 : 0} // Make non-interactive when hidden
                >
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{currentLanguage.name}</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setLanguage(language.code)}
                    className={currentLanguage.code === language.code ? "bg-accent" : ""}
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Hamburger Menu Trigger - Appears on mobile OR when collapsed on desktop */}
          <div className="flex items-center"> {/* Wrapper div */}
             <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "text-white hover:bg-white/10 hover:text-white transition-opacity duration-300",
                     // Logic: show if collapsed OR screen is smaller than md
                    //isCollapsed ? "opacity-100" : "md:opacity-0 md:pointer-events-none" // Show when collapsed, hide on md+ if not collapsed
                    isCollapsed ? "opacity-100" : "lg:opacity-0 lg:pointer-events-none" // <-- Changed md to lg
                  )}
                  //style={{ opacity: isCollapsed ? 1 : undefined }} // Ensure opacity is set for transition when collapsed
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              {/* --- Mobile Sheet Content Remains the Same --- */}
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                      BookingOut.fun
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <nav className="flex flex-col space-y-4">
                    {navigationLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="text-lg font-medium hover:text-primary transition-colors py-2"
                        >
                          {t(link.key)}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-8 pt-6 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Select Language</p>
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map((language) => (
                        <Button
                          key={language.code}
                          variant={currentLanguage.code === language.code ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setLanguage(language.code);
                          }}
                          className="justify-start"
                        >
                          {language.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
               {/* --- End Mobile Sheet Content --- */}
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  )
}