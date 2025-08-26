export default function ThemeSection({ theme, setTheme }) {
  const themes = ['light', 'dark', 'system'] // added "system"

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-1 rounded-md border text-sm capitalize ${
            theme === t
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-transparent border-gray-300 hover:bg-gray-100'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
