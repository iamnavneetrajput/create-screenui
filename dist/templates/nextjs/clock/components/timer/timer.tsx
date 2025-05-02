"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlarmClock, Play, Pause, RefreshCw } from "lucide-react"
import { Slider } from "@/components/ui/slider"

const PRESETS = [
  { name: "Quick", seconds: 60 },
  { name: "Short", seconds: 300 },
  { name: "Medium", seconds: 600 },
  { name: "Long", seconds: 1800 },
]

export function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(300)
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setRemainingSeconds(totalSeconds)
    setIsComplete(false)
  }, [totalSeconds])

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            setIsRunning(false)
            setIsComplete(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, remainingSeconds])

  const handleStartStop = () => {
    if (isComplete) {
      setRemainingSeconds(totalSeconds)
      setIsComplete(false)
    }
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setRemainingSeconds(totalSeconds)
    setIsComplete(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (remainingSeconds / totalSeconds) * 100

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlarmClock className="mr-2 h-5 w-5" />
          Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets" className="mb-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          
          <TabsContent value="presets" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map(preset => (
                <Button
                  key={preset.name}
                  variant={totalSeconds === preset.seconds ? "default" : "outline"}
                  onClick={() => {
                    setTotalSeconds(preset.seconds)
                    setIsRunning(false)
                    setIsComplete(false)
                  }}
                  className="h-12"
                >
                  {preset.name} - {formatTime(preset.seconds)}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-medium text-center">
                  {formatTime(totalSeconds)}
                </h3>
                <Slider
                  value={[totalSeconds]}
                  min={30}
                  max={3600}
                  step={30}
                  onValueChange={value => {
                    setTotalSeconds(value[0])
                    setIsRunning(false)
                    setIsComplete(false)
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="relative h-48 w-48 mx-auto mb-6">
          <div 
            className="absolute inset-0 rounded-full border-4 border-muted"
          ></div>
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary transition-all duration-300"
            style={{ transform: `rotate(${360 - (progressPercentage * 3.6)}deg)` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-4xl font-semibold ${isComplete ? "text-destructive" : ""}`}>
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2 justify-center">
          <Button 
            variant={isRunning ? "destructive" : "default"}
            size="lg"
            onClick={handleStartStop}
            className="w-1/2"
          >
            {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isRunning ? "Pause" : isComplete ? "Restart" : "Start"}
          </Button>
          
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleReset}
            className="w-1/2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}