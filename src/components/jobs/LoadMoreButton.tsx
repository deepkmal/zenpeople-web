import { Loader2 } from 'lucide-react'

interface LoadMoreButtonProps {
  onClick: () => void
  loading: boolean
  remaining: number
  total: number
}

export function LoadMoreButton({ onClick, loading, remaining, total }: LoadMoreButtonProps) {
  if (remaining <= 0) {
    return null
  }

  return (
    <div className="text-center pt-6">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            Load more ({remaining} of {total} remaining)
          </>
        )}
      </button>
    </div>
  )
}
