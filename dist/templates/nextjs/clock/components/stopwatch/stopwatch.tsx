"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, RefreshCw, Timer } from "lucide-react"

type Lap = {
  id: number
  time: number
}

export function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [laps, setLaps] = useState<Lap[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef(0)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setLaps([])
  }

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, { id: laps.length + 1, time: elapsedTime }])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Timer className="mr-2 h-5 w-5" />
          Stopwatch
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-mono text-center mb-6">
          {formatTime(elapsedTime)}
        </div>
        
        <div className="flex space-x-2 justify-center mb-6">
          <Button 
            variant={isRunning ? "destructive" : "default"}
            size="lg"
            onClick={handleStartStop}
            className="w-1/3"
          >
            {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isRunning ? "Stop" : "Start"}
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleLap}
            disabled={!isRunning}
            className="w-1/3"
          >
            Lap
          </Button>
          
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleReset}
            className="w-1/3"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        
        {laps.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Laps</h3>
            <ScrollArea className="h-[150px]">
              <div className="space-y-1">
                {laps.map((lap, index) => (
                  <div 
                    key={lap.id} 
                    className="flex justify-between py-2 px-4 rounded-md odd:bg-muted/50"
                  >
                    <span>Lap {lap.id}</span>
                    <span className="font-mono">{formatTime(lap.time)}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}