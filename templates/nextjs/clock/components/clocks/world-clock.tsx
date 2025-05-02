"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TimeZone = {
  name: string
  offset: number
  label: string
}

const TIME_ZONES: TimeZone[] = [
  { name: "UTC", offset: 0, label: "Coordinated Universal Time (UTC)" },
  { name: "New York", offset: -4, label: "New York (EDT, UTC-4)" },
  { name: "Los Angeles", offset: -7, label: "Los Angeles (PDT, UTC-7)" },
  { name: "London", offset: 1, label: "London (BST, UTC+1)" },
  { name: "Paris", offset: 2, label: "Paris (CEST, UTC+2)" },
  { name: "Tokyo", offset: 9, label: "Tokyo (JST, UTC+9)" },
  { name: "Sydney", offset: 10, label: "Sydney (AEST, UTC+10)" },
]

export function WorldClock() {
  const [selectedZone, setSelectedZone] = useState<string>("UTC")
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getTimeInZone = (date: Date, zoneOffset: number): Date => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
    return new Date(utc + (3600000 * zoneOffset))
  }

  const selectedTimeZone = TIME_ZONES.find(tz => tz.name === selectedZone) || TIME_ZONES[0]
  const zoneTime = getTimeInZone(time, selectedTimeZone.offset)

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>World Clock</span>
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Time Zone" />
            </SelectTrigger>
            <SelectContent>
              {TIME_ZONES.map((zone) => (
                <SelectItem key={zone.name} value={zone.name}>
                  {zone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-semibold text-center tracking-wider font-mono">
          {formatTime(zoneTime)}
        </div>
        <div className="text-muted-foreground text-center mt-2">
          {selectedTimeZone.label}
        </div>
      </CardContent>
    </Card>
  )
}