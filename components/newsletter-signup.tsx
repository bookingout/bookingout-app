"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface NewsletterSignupProps {
  title: string
  description: string
  buttonText: string
  successMessage: string
  placeholderText: string
}

export default function NewsletterSignup({
  title,
  description,
  buttonText,
  successMessage,
  placeholderText,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      // In a real app, you would send this to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success!",
        description: successMessage,
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder={placeholderText}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          required
        />
        <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white" disabled={isLoading}>
          {isLoading ? "..." : buttonText}
        </Button>
      </form>
    </div>
  )
}

