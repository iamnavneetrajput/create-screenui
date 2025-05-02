import { Timer } from "@/components/timer/timer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlarmClock } from "lucide-react";

export default function TimerPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 space-y-8">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlarmClock className="mr-2 h-5 w-5" />
            Timer
          </CardTitle>
          <CardDescription>
            Set countdown timers with preset durations or customize your own timing.
          </CardDescription>
        </CardHeader>
        <div className="p-4">
          <Timer />
        </div>
      </Card>
    </div>
  );
}