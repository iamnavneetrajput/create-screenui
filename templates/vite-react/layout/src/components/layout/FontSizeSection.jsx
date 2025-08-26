export default function FontSizeSection({ fontSize, setFontSize }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setFontSize((s) => Math.max(10, s - 1))}
        className="px-2 py-1 border rounded-md text-sm hover:bg-gray-100"
      >
        -
      </button>
      <span className="text-sm font-mono">{fontSize}px</span>
      <button
        onClick={() => setFontSize((s) => Math.min(30, s + 1))}
        className="px-2 py-1 border rounded-md text-sm hover:bg-gray-100"
      >
        +
      </button>
    </div>
  )
}
