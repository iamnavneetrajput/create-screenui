"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function DigitalClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString(undefined, options)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-primary/20">
      <CardContent className="p-6">
        <div className="text-5xl md:text-6xl font-semibold tracking-wider text-center font-mono">
          {formatTime(time)}
        </div>
        <div className="text-base md:text-lg text-muted-foreground mt-2 text-center">
          {formatDate(time)}
        </div>
      </CardContent>
    </Card>
  )
}