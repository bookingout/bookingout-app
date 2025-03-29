// components/NewsletterSignup.tsx
"use client"; // Keep this

import type React from "react"; // Import React type if needed by your setup
import { useState } from "react"; // Keep state for the input
import { Button } from "@/components/ui/button"; // Keep Button component
import { Input } from "@/components/ui/input"; // Keep Input component
// Removed useToast and related state/functions as Netlify handles feedback/submission

// Define the props the component expects
interface NewsletterSignupProps {
  title: string;
  description: string;
  buttonText: string;
  successMessage: string; // Keep if page.tsx sends it, though not used here
  placeholderText: string;
}

// Receive and destructure the props correctly
export default function NewsletterSignup({
  title,
  description,
  buttonText,
  // successMessage, // Prop received but not actively used in this Netlify version
  placeholderText, // Make sure this is received
}: NewsletterSignupProps) {
  // State only needed to control the input field's value
  const [email, setEmail] = useState("");

  // The handleSubmit function is removed - Netlify handles the form submission

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        {/* Use the destructured props */}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>

      {/* --- FORM CONFIGURED FOR NETLIFY --- */}
      <form
        name="newsletter" // Name for Netlify Forms
        method="POST"
        data-netlify="true" // Enable Netlify processing
        data-netlify-honeypot="bot-field" // Spam prevention
        className="flex flex-col sm:flex-row gap-3"
        // Optional: Add action="/thank-you" for a custom success page
        // action="/thank-you"
      >
        {/* Hidden fields required by Netlify */}
        <input type="hidden" name="form-name" value="newsletter" />
        <p className="hidden">
          {" "}
          {/* visually hide the honeypot */}
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>

        <Input
          type="email"
          name="email" // Essential: Netlify uses this 'name' attribute
          placeholder={placeholderText} // Use the destructured prop
          value={email} // Controlled input
          onChange={(e) => setEmail(e.target.value)} // Update state on change
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          required // Basic HTML validation
        />
        <Button
          type="submit" // Standard submit button triggers Netlify
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          {buttonText} {/* Use the destructured prop */}
        </Button>
      </form>
      {/* --- END FORM --- */}
    </div>
  );
}