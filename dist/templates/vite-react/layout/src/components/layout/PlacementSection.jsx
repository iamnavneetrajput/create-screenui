export default function PlacementSection({ placement, setPlacement }) {
  const placements = ['top-right', 'bottom-right']

  return (
    <div className="flex gap-2">
      {placements.map((p) => (
        <button
          key={p}
          onClick={() => setPlacement(p)}
          className={`px-3 py-1 rounded-md border text-sm capitalize ${
            placement === p
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-transparent border-gray-300 hover:bg-gray-100'
          }`}
        >
          {p.replace('-', ' ')}
        </button>
      ))}
    </div>
  )
}
