'use client'

import React, { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 text-center px-4">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        {error.message || 'An unexpected error occurred while loading the application.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try again
      </button>
    </div>
  )
} 