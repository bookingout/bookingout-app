import type React from "react";
import type { Metadata } from "next";
import "./globals.css"; // Keep your global styles import

// Import the Toaster component (adjust path if necessary)
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "BookingOut.fun - Coming Soon",
  description: "Discover the best clubs, resorts, and friendly spaces in Poland",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Keep your Polish lang attribute
    <html lang="pl">
      <head>
        {/* Keep your existing font links */}
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
      </head>
      <body>
        {children} {/* Your page content will render here */}
        <Toaster /> {/* Add the Toaster component here */}
      </body>
    </html>
  );
}