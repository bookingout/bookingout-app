// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useToast } from "@/hooks/use-toast"

// interface NewsletterSignupProps {
//   title: string
//   description: string
//   buttonText: string
//   successMessage: string
//   placeholderText: string
// }

// export default function NewsletterSignup({
//   title,
//   description,
//   buttonText,
//   successMessage,
//   placeholderText,
// }: NewsletterSignupProps) {
//   const [email, setEmail] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!email || !email.includes("@")) {
//       toast({
//         title: "Invalid email",
//         description: "Please enter a valid email address",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsLoading(true)

//     // Simulate API call
//     try {
//       // In a real app, you would send this to your API
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       toast({
//         title: "Success!",
//         description: successMessage,
//       })

//       setEmail("")
//     } catch (error) {
//       toast({
//         title: "Something went wrong",
//         description: "Please try again later",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="text-center mb-6">
//         <h3 className="text-2xl font-bold mb-2">{title}</h3>
//         <p className="text-gray-300">{description}</p>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
//         <Input
//           type="email"
//           placeholder={placeholderText}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
//           required
//         />
//         <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white" disabled={isLoading}>
//           {isLoading ? "..." : buttonText}
//         </Button>
//       </form>
//     </div>
//   )
// }

// components/NewsletterSignup.tsx

"use client" // Keep this

import { useState } from "react" // Keep this
import { Button } from "@/components/ui/button" // Keep this
import { Input } from "@/components/ui/input" // Keep this
// You might not need useToast anymore if Netlify handles success/error display
// import { useToast } from "@/hooks/use-toast"

// ... (Keep the interface)

export default function NewsletterSignup({ /* ...props */ }) {
  // Keep state for the email input value
  const [email, setEmail] = useState("")
  // You might remove isLoading and useToast if simplifying
  // const [isLoading, setIsLoading] = useState(false)
  // const { toast } = useToast()

  // The old handleSubmit function is NOT needed for Netlify's standard form handling.
  // You can remove it or comment it out.

  return (
    <div className="w-full max-w-md mx-auto">
      {/* ... title and description ... */}

      {/* --- MODIFIED FORM FOR NETLIFY --- */}
      <form
        name="newsletter" // Choose a name for your form
        method="POST"
        data-netlify="true" // Tells Netlify to process this form
        data-netlify-honeypot="bot-field" // Spam prevention
        className="flex flex-col sm:flex-row gap-3"
        action="/thank-you" // Optional: Create a page at /thank-you to show after submission
                             // If omitted, Netlify shows a default success message.
      >
        {/* Hidden fields required by Netlify */}
        <input type="hidden" name="form-name" value="newsletter" />
        {/* This field should be hidden visually (e.g., with CSS/Tailwind `hidden` class) */}
        {/* If a bot fills this hidden field, Netlify ignores the submission */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>

        <Input
          type="email"
          name="email" // VERY IMPORTANT: Netlify uses this name to identify the field
          placeholder={placeholderText} // Use the prop
          value={email} // Control the input value
          onChange={(e) => setEmail(e.target.value)} // Update the state on change
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          required // HTML5 validation
        />
        <Button
          type="submit" // Standard submit button
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          {buttonText} {/* Use the prop */}
        </Button>
      </form>
      {/* --- END MODIFIED FORM --- */}
    </div>
  )
}