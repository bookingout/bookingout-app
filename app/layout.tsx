import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Font from v0 layout
import "./globals.css"; // Keep your global styles import
import { Toaster } from "@/components/ui/toaster"; // Keep Toaster
import ScrollToTopButton from '@/components/scroll-to-top-button'; // Adjust path if needed

// Imports from v0 layout
import { LanguageProvider } from "@/lib/contexts/language-context";
import EnhancedNavigation from "@/components/enhanced-navigation";
import { ThemeProvider } from "@/components/theme-provider"; // Add ThemeProvider

const inter = Inter({ subsets: ["latin"] }); // Setup Inter font

// Keep your metadata
export const metadata: Metadata = {
  title: "BookingOut.fun", // Maybe update title back from "Coming Soon"
  description: "Discover the best clubs, resorts, and friendly spaces in Poland",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Keep lang="pl" if Polish is still the default target
    <html lang="pl" suppressHydrationWarning={true}>{/* Added suppressHydrationWarning often needed with ThemeProvider */}
      <head>{/* Keep your existing font links */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>{/* Apply font class (choose inter or setup your Open Sans/Poppins in Tailwind config) */}
      <body className={inter.className}>{/* Using Inter font class from v0 for now */}{/* Wrap content with Providers and Navigation */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange // Added from v0 layout
        >
          <LanguageProvider>
            <EnhancedNavigation /> {/* Add the new navigation */}
            {children} {/* Your page content renders here */}
            <Toaster /> {/* Keep the Toaster */}
          </LanguageProvider>
          <ScrollToTopButton /> {/* <-- Add the button here */}
        </ThemeProvider>
      </body>
    </html>
  );
}