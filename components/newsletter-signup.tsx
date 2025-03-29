// components/NewsletterSignup.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"; // Bring back useToast
import { Toaster } from "@/components/ui/toaster"; // Ensure Toaster is also used in layout.tsx

interface NewsletterSignupProps {
  title: string;
  description: string;
  buttonText: string;
  successMessage: string; // We'll use this again for the toast
  placeholderText: string;
}

export default function NewsletterSignup({
  title,
  description,
  buttonText,
  successMessage,
  placeholderText,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default page reload

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Prepare data for Netlify form submission
    const formData = new FormData();
    formData.append("form-name", "newsletter"); // Must match the name in newsletter-form.html
    formData.append("email", email);
    // Add honeypot field if you want to mimic it, though Netlify might handle it
    // formData.append("bot-field", "");

    try {
      // Submit to the PATH of the static HTML form file
      const response = await fetch("/newsletter-form.html", { // Submit to the path
        method: "POST",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Not needed for FormData
        body: new URLSearchParams(formData as any).toString(), // Encode FormData for submission
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: successMessage, // Use the success message prop
        });
        setEmail(""); // Clear the input field
      } else {
        // Handle potential errors from Netlify submission if needed
        toast({
          title: "Submission Error",
          description: "Could not submit the form. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>

      {/* --- REACT FORM (NO Netlify attributes here) --- */}
      {/* Uses onSubmit to trigger our JS fetch */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* No hidden Netlify fields needed IN THIS VISIBLE form */}
        <Input
          type="email"
          name="email" // Keep name, useful for accessibility/state, though not for Netlify directly here
          placeholder={placeholderText}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          required
          disabled={isLoading} // Disable input while loading
          autoComplete="email"
        />
        <Button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "..." : buttonText}
        </Button>
      </form>
      {/* --- END FORM --- */}
      {/* Make sure <Toaster /> is in your layout.tsx to see toasts */}
    </div>
  );
}