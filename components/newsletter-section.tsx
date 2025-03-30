"use client"

import type React from "react"
import { useState } from "react"
import { Mail, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/contexts/language-context"; // Ensure this path is correct

export default function NewsletterSection() {
  const { t } = useLanguage(); // Ensure useLanguage context provides a 't' function

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  // Get benefits text from translations
  // Make sure these keys exist in your translations file under 'newsletter_v2'
  const benefits = [
    t('newsletter_v2.benefit1'),
    t('newsletter_v2.benefit2'),
    t('newsletter_v2.benefit3')
  ];

  return (
    <section id="newsletter" className="relative w-full py-20 overflow-hidden" aria-labelledby="newsletter-heading">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 animate-gradient-x"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-2/3 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay blur-3xl animate-float animation-delay-4000"></div>
      </div>

      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-10">
          <h2
            id="newsletter-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            {t("newsletter_v2.mainTitle")}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
             {t("newsletter_v2.mainDescription")}
          </p>
        </div>

        {/* Dark subscription form box */}
        <div className="max-w-xl mx-auto">
          <div
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl transform transition-all duration-500 hover:shadow-glow"
            style={{ boxShadow: "0 0 30px rgba(139, 92, 246, 0.15)" }}
          >
            {!isSubmitted ? (
              <>
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white text-center mb-2">
                  {t("newsletter_v2.formTitle")}
                </h3>
                <p className="text-gray-400 text-center mb-6">
                  {t("newsletter_v2.formSubtitle")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder={t("newsletter_v2.placeholder")}
                        className="pl-10 w-full bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500 transition-all"
                        aria-describedby="email-description"
                      />
                    </div>
                    <p id="email-description" className="text-xs text-gray-500">
                      {t("newsletter_v2.privacy")}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
                        {t("newsletter_v2.buttonSubmitting")}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {t("newsletter_v2.button")}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mb-1">
                        <CheckCircle className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-xs text-gray-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-4 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {t("newsletter_v2.successTitle")}
                </h3>
                <p className="text-gray-400">
                   {t("newsletter_v2.successMessage").replace('{email}', email)}
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="mt-2 bg-gray-800 hover:bg-gray-700 text-white">
                  {t("newsletter_v2.tryAgainButton")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}