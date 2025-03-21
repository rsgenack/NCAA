import BracketTracker from "@/components/bracket-tracker"

export default function Home() {
  return (
    <div className="min-h-screen bracket-bg">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-5xl font-bold text-center mb-2 text-primary">2025 NCAA TOURNAMENT</h1>
        <h2 className="text-2xl text-center mb-8 text-gray-700">BRACKET TRACKER</h2>
        <BracketTracker />
      </div>
    </div>
  )
}

