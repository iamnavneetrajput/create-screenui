import { AnalogClock } from "@/components/clocks/analog-clock";
import { DigitalClock } from "@/components/clocks/digital-clock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="container max-w-5xl mx-auto px-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Chrono</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A beautiful, modern clock application with multiple features including analog/digital clocks, 
          world clock, stopwatch, and timer functionality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Card className="p-4 flex flex-col items-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Clock className="mr-2 h-5 w-5" />
              Analog Clock
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <AnalogClock />
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Clock className="mr-2 h-5 w-5" />
              Digital Clock
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full">
            <DigitalClock />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Use the navigation menu to explore all features including World Clock, Stopwatch, and Timer.
        </p>
      </div>
    </div>
  );
}