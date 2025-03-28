"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface TimeSpentAlertProps {
  thresholdSeconds: number
  message: string
  ctaText: string
  onCtaClick: () => void
  labels: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
}

export default function TimeSpentAlert({
  thresholdSeconds = 30,
  message,
  ctaText,
  onCtaClick,
  labels,
}: TimeSpentAlertProps) {
  const [timeSpent, setTimeSpent] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertDismissed, setAlertDismissed] = useState(false)

  useEffect(() => {
    const startTime = new Date().getTime()

    const calculateTimeSpent = () => {
      const currentTime = new Date().getTime()
      const difference = currentTime - startTime
      const totalSeconds = Math.floor(difference / 1000)

      setTimeSpent({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        totalSeconds,
      })

      // Show alert when threshold is reached and alert hasn't been dismissed
      if (totalSeconds >= thresholdSeconds && !alertDismissed && !showAlert) {
        setShowAlert(true)
      }
    }

    calculateTimeSpent()
    const timer = setInterval(calculateTimeSpent, 1000)

    return () => clearInterval(timer)
  }, [thresholdSeconds, alertDismissed, showAlert])

  const dismissAlert = () => {
    setShowAlert(false)
    setAlertDismissed(true)
  }

  return (
    <div className="relative">
      {/* Timer Display */}
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="flex flex-col">
          <div className="text-4xl md:text-5xl font-bold bg-gray-800 rounded-lg p-4 text-pink-500">
            {timeSpent.days}
          </div>
          <span className="text-sm mt-2 text-gray-300">{labels.days}</span>
        </div>

        <div className="flex flex-col">
          <div className="text-4xl md:text-5xl font-bold bg-gray-800 rounded-lg p-4 text-pink-500">
            {timeSpent.hours}
          </div>
          <span className="text-sm mt-2 text-gray-300">{labels.hours}</span>
        </div>

        <div className="flex flex-col">
          <div className="text-4xl md:text-5xl font-bold bg-gray-800 rounded-lg p-4 text-pink-500">
            {timeSpent.minutes}
          </div>
          <span className="text-sm mt-2 text-gray-300">{labels.minutes}</span>
        </div>

        <div className="flex flex-col">
          <div className="text-4xl md:text-5xl font-bold bg-gray-800 rounded-lg p-4 text-pink-500">
            {timeSpent.seconds}
          </div>
          <span className="text-sm mt-2 text-gray-300">{labels.seconds}</span>
        </div>
      </div>

      {/* Alert Message */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-3xl mx-auto bg-gray-800 border-2 border-pink-500 rounded-lg shadow-lg overflow-hidden">
              <div className="relative p-6">
                <button
                  onClick={dismissAlert}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  aria-label="Close alert"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-8 h-8 text-pink-500" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Time Check!</h3>
                    <p className="text-gray-300 mb-4">{message}</p>

                    <Button
                      onClick={() => {
                        onCtaClick()
                        dismissAlert()
                      }}
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      {ctaText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

