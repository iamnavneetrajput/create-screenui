import { useEffect, useState, useMemo } from 'react'
import {
  X,
  Maximize2,
  Minimize2,
  Layout,
  Settings,
  ChevronDown,
  ChevronRight,
  MoveVertical,
  Text,
} from 'lucide-react'
import ThemeSection from './ThemeSection'
import PlacementSection from './PlacementSection'
import FontSizeSection from './FontSizeSection'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function SectionItem({ title, icon, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-[hsl(0,0%,80%)] rounded-md bg-[hsl(0,0%,98%)] dark:bg-[hsl(210,40%,10%)] dark:border-[hsl(210,40%,25%)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[hsl(0,0%,92%)] dark:hover:bg-[hsl(210,40%,20%)] rounded-md transition"
      >
        <div className="flex items-center gap-2 text-[hsl(210,40%,10%)] dark:text-[hsl(0,0%,98%)]">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      {open && <div className="p-3 pt-1">{children}</div>}
    </div>
  )
}

export default function DevPanel() {
  const [theme, setTheme] = useState('system')
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const [placement, setPlacement] = useState('bottom-right')
  const [fps, setFps] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setFontSize(Number(localStorage.getItem('dev-fontSize')) || 14)
    setPlacement(localStorage.getItem('dev-placement') || 'bottom-right')
    const savedTheme = localStorage.getItem('theme') || 'system'
    setTheme(savedTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`
  }, [fontSize])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('dev-fontSize', fontSize.toString())
    localStorage.setItem('dev-placement', placement)
    localStorage.setItem('theme', theme)
  }, [fontSize, placement, theme, mounted])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement

    const applyTheme = (t) => {
      if (t === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      applyTheme(mq.matches ? 'dark' : 'light')

      const handler = (e) => applyTheme(e.matches ? 'dark' : 'light')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    } else {
      applyTheme(theme)
    }
  }, [theme, mounted])

  useEffect(() => {
    let frame = 0
    let last = performance.now()
    let id

    const loop = () => {
      const now = performance.now()
      frame++
      if (now - last >= 1000) {
        setFps(frame)
        frame = 0
        last = now
      }
      id = requestAnimationFrame(loop)
    }

    if (isOpen && !isMinimized) loop()
    return () => cancelAnimationFrame(id)
  }, [isOpen, isMinimized])

  const styles = useMemo(() => {
    const horizontal = { right: 20 }
    const vertical = placement === 'top-right' ? { top: 60 } : { bottom: 20 }
    return { ...horizontal, ...vertical }
  }, [placement])

  if (!mounted) return null

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed z-50 transition-all duration-300',
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        style={{
          right: 20,
          top: placement === 'top-right' ? 60 : undefined,
          bottom: placement === 'bottom-right' ? 20 : undefined,
        }}
        aria-label="Open Dev Panel"
      >
        <img
          src="/favicon.svg"
          alt="Dev Panel"
          className="rounded-full border-2 border-[hsl(0,0%,80%)] dark:border-[hsl(210,40%,25%)] cursor-pointer"
          width={34}
          height={34}
        />
      </button>

      {/* Panel */}
      <div
        className={cn(
          'fixed w-72 rounded-2xl z-50 transition-all duration-300 text-sm shadow-lg',
          'bg-[hsl(0,0%,98%)] dark:bg-[hsl(210,40%,10%)] border border-[hsl(0,0%,80%)] dark:border-[hsl(210,40%,25%)]',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none',
          isMinimized ? 'h-10 w-48' : ''
        )}
        style={styles}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 rounded-t-2xl text-[hsl(210,40%,10%)] dark:text-[hsl(0,0%,98%)]">
          <span className="text-xs font-medium flex gap-1 items-center">
            <Layout className="w-4 h-4" /> Screen/ui
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setIsMinimized((p) => !p)}
              className="hover:bg-[hsl(0,0%,92%)] dark:hover:bg-[hsl(210,40%,20%)] rounded p-1"
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-[hsl(0,0%,92%)] dark:hover:bg-[hsl(210,40%,20%)] rounded p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        {!isMinimized && (
          <div className="p-2 space-y-2 text-[hsl(210,40%,10%)] dark:text-[hsl(0,0%,98%)]">
            <SectionItem title="Theme" icon={<Settings className="w-4 h-4" />}>
              <ThemeSection theme={theme} setTheme={setTheme} />
            </SectionItem>

            <SectionItem title="Placement" icon={<MoveVertical className="w-4 h-4" />}>
              <PlacementSection placement={placement} setPlacement={setPlacement} />
            </SectionItem>

            <SectionItem title="Font Size" icon={<Text className="w-4 h-4" />}>
              <FontSizeSection fontSize={fontSize} setFontSize={setFontSize} />
            </SectionItem>

            <div className="text-xs text-[hsl(215,16%,47%)] dark:text-[hsl(215,16%,65%)]">
              FPS: <span className="font-mono">{fps}</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
