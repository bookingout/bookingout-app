"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  message: string
  labels: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
}

export default function CountdownTimer({ message, labels }: CountdownTimerProps) {
  const [timeSpent, setTimeSpent] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const startTime = new Date().getTime()

    const calculateTimeSpent = () => {
      const currentTime = new Date().getTime()
      const difference = currentTime - startTime

      setTimeSpent({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    calculateTimeSpent()
    const timer = setInterval(calculateTimeSpent, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-6">
      <p className="text-xl text-pink-500 font-medium text-center">{message}</p>

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
    </div>
  )
}

