"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function AnalogClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const secondsStyle = {
    transform: `rotate(${time.getSeconds() * 6}deg)`,
    transition: 'transform 1s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
  }
  
  const minutesStyle = {
    transform: `rotate(${time.getMinutes() * 6 + time.getSeconds() * 0.1}deg)`
  }
  
  const hoursStyle = {
    transform: `rotate(${time.getHours() * 30 + time.getMinutes() * 0.5}deg)`
  }

  return (
    <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full border-4 border-primary shadow-lg mx-auto">
      {/* Clock face */}
      <div className="absolute inset-0 rounded-full bg-background flex items-center justify-center">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-full"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 h-3 w-1.5 rounded-full bg-primary",
              i % 3 === 0 ? "h-4 w-2" : ""
            )} />
          </div>
        ))}

        {/* Clock center dot */}
        <div className="absolute w-3 h-3 bg-primary rounded-full z-10"></div>

        {/* Hour hand */}
        <div className="absolute h-1/2 w-full" style={hoursStyle}>
          <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 h-1/2 w-2 bg-primary rounded-full origin-bottom" />
        </div>

        {/* Minute hand */}
        <div className="absolute h-1/2 w-full" style={minutesStyle}>
          <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 h-3/4 w-1.5 bg-primary rounded-full origin-bottom" />
        </div>

        {/* Second hand */}
        <div className="absolute h-1/2 w-full" style={secondsStyle}>
          <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 h-[85%] w-1 bg-destructive rounded-full origin-bottom" />
        </div>
      </div>
    </div>
  )
}