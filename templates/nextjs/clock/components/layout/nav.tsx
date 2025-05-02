"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Timer, Activity, Globe, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "World Clock",
    href: "/world-clock",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    title: "Stopwatch",
    href: "/stopwatch",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: "Timer",
    href: "/timer",
    icon: <Timer className="h-5 w-5" />,
  },
]

export function Nav() {
  const [activeItem, setActiveItem] = useState("Home")

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Clock className="h-6 w-6 mr-2" />
          <span className="text-xl font-semibold">Chrono</span>
        </Link>
        
        <nav className="ml-auto flex items-center space-x-1 sm:space-x-4">
          {navItems.map((item) => (
            <Link key={item.title} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "h-10 w-10 p-0 sm:h-10 sm:w-auto sm:px-4",
                  activeItem === item.title && "bg-secondary"
                )}
                onClick={() => setActiveItem(item.title)}
              >
                {item.icon}
                <span className="sr-only sm:not-sr-only sm:ml-2">{item.title}</span>
              </Button>
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </div>
  )
}