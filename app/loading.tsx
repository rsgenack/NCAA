import { RefreshCcw } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
      <RefreshCcw className="w-12 h-12 text-primary animate-spin mb-4" />
      <div className="text-xl font-semibold">Loading...</div>
    </div>
  )
} 