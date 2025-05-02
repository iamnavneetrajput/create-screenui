import { WorldClock } from "@/components/clocks/world-clock";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe } from "lucide-react";

export default function WorldClockPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 space-y-8">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            World Clock
          </CardTitle>
          <CardDescription>
            Check the time across different time zones around the world.
          </CardDescription>
        </CardHeader>
        <div className="p-4">
          <WorldClock />
        </div>
      </Card>
    </div>
  );
}