import { Stopwatch } from "@/components/stopwatch/stopwatch";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function StopwatchPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 space-y-8">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Stopwatch
          </CardTitle>
          <CardDescription>
            Track elapsed time with precision, record lap times, and reset as needed.
          </CardDescription>
        </CardHeader>
        <div className="p-4">
          <Stopwatch />
        </div>
      </Card>
    </div>
  );
}