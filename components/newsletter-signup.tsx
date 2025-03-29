// components/NewsletterSignup.tsx
"use client";

import type React from "react";
import { useState } from "react"; // Keep state for input control
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Removed useToast, isLoading, handleSubmit, fetch

interface NewsletterSignupProps {
  title: string;
  description: string;
  buttonText: string;
  successMessage: string; // Prop received but not used here
  placeholderText: string;
}

export default function NewsletterSignup({
  title,
  description,
  buttonText,
  placeholderText,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>

      {/* --- FORM WITH NETLIFY ATTRIBUTES DIRECTLY --- */}
      {/* Let Netlify handle the submission via standard HTML POST */}
      <form
        name="newsletter" // Critical: Name Netlify looks for
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field" // Optional spam prevention
        className="flex flex-col sm:flex-row gap-3"
        // action="/thank-you" // Optional: Add custom success page redirect
      >
        {/* Hidden input REQUIRED by Netlify to identify the form by name */}
        <input type="hidden" name="form-name" value="newsletter" />

        {/* Optional: Honeypot field (must be hidden) */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>

        <Input
          type="email"
          name="email" // Critical: Field name Netlify will capture
          placeholder={placeholderText}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          required
          autoComplete="email" // Good practice
        />
        <Button
          type="submit" // Standard submit triggers the form POST
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          {buttonText}
        </Button>
      </form>
      {/* --- END FORM --- */}
    </div>
  );
}