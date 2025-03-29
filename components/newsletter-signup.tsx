// components/NewsletterSignup.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"; // Need toast for feedback
// Make sure <Toaster /> is in layout.tsx

interface NewsletterSignupProps {
  title: string;
  description: string;
  buttonText: string;
  successMessage: string;
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
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("form-name", "newsletter");
    formData.append("email", email);

    try {
      // Fetch with the CORRECT URL (single hyphen)
      const response = await fetch("/newsletter-form.html", { // <--- CORRECT URL!
        method: "POST",
        headers: { // Add Content-Type header (good practice)
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: successMessage,
        });
        setEmail("");
      } else {
         // Log the error status for debugging if needed
         console.error("Netlify form submission failed with status:", response.status, response.statusText);
         const responseText = await response.text(); // Try to get more info
         console.error("Netlify response text:", responseText);
         toast({
          title: "Submission Error",
          description: `Could not submit the form. Status: ${response.status}. Please try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission fetch error:", error);
      toast({
        title: "Network Error",
        description: "Could not reach the server. Please try again later.",
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

      {/* --- REACT FORM using onSubmit --- */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          name="email"
          placeholder={placeholderText}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          required
          disabled={isLoading}
          autoComplete="email"
        />
        <Button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? "..." : buttonText}
        </Button>
      </form>
      {/* --- END FORM --- */}
    </div>
  );
}