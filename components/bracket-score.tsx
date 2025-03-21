"use client"

import type { BracketData } from "@/lib/bracket-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BracketScoreProps {
  brackets: { name: string; data: BracketData }[]
  actualResults: BracketData
}

export default function BracketScore({ brackets, actualResults }: BracketScoreProps) {
  // Skip the actual results bracket when calculating scores
  const bracketScores = brackets
    .filter((bracket) => bracket.name !== "Actual Results")
    .map((bracket) => ({
      name: bracket.name,
      score: calculateBracketScore(bracket.data, actualResults),
    }))
    .sort((a, b) => b.score - a.score)

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Bracket Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {bracketScores.length === 0 ? (
            <p className="text-muted-foreground italic">No AI brackets added yet</p>
          ) : (
            bracketScores.map((bracketScore, index) => (
              <div key={bracketScore.name} className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{index + 1}.</span>
                  <span>{bracketScore.name}</span>
                </div>
                <span className="font-semibold">{bracketScore.score} pts</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function calculateBracketScore(bracket: BracketData, actualResults: BracketData): number {
  let score = 0

  // Score for each region
  const regions = ["East", "West", "South", "Midwest"] as const
  const rounds = ["firstRound", "secondRound", "sweet16", "elite8"] as const
  const roundPoints = [1, 2, 4, 8]

  regions.forEach((region) => {
    rounds.forEach((round, roundIndex) => {
      const actualMatchups = actualResults[region][round] || []
      const predictedMatchups = bracket[region][round] || []

      actualMatchups.forEach((actualMatchup, matchupIndex) => {
        const predictedMatchup = predictedMatchups[matchupIndex]
        if (!predictedMatchup) return

        // Check if either team in the prediction matches the actual winner
        if (
          actualMatchup[0]?.name &&
          (actualMatchup[0].name === predictedMatchup[0]?.name || actualMatchup[0].name === predictedMatchup[1]?.name)
        ) {
          score += roundPoints[roundIndex]
        }

        if (
          actualMatchup[1]?.name &&
          (actualMatchup[1].name === predictedMatchup[0]?.name || actualMatchup[1].name === predictedMatchup[1]?.name)
        ) {
          score += roundPoints[roundIndex]
        }
      })
    })
  })

  // Score for Final Four
  const actualSemifinals = actualResults.finalFour.semifinals || []
  const predictedSemifinals = bracket.finalFour.semifinals || []

  actualSemifinals.forEach((actualMatchup, matchupIndex) => {
    const predictedMatchup = predictedSemifinals[matchupIndex]
    if (!predictedMatchup) return

    if (
      actualMatchup[0]?.name &&
      (actualMatchup[0].name === predictedMatchup[0]?.name || actualMatchup[0].name === predictedMatchup[1]?.name)
    ) {
      score += 16
    }

    if (
      actualMatchup[1]?.name &&
      (actualMatchup[1].name === predictedMatchup[0]?.name || actualMatchup[1].name === predictedMatchup[1]?.name)
    ) {
      score += 16
    }
  })

  // Score for Championship
  const actualChampionship = actualResults.finalFour.championship || []
  const predictedChampionship = bracket.finalFour.championship || []

  if (
    actualChampionship[0]?.name &&
    (actualChampionship[0].name === predictedChampionship[0]?.name ||
      actualChampionship[0].name === predictedChampionship[1]?.name)
  ) {
    score += 32
  }

  if (
    actualChampionship[1]?.name &&
    (actualChampionship[1].name === predictedChampionship[0]?.name ||
      actualChampionship[1].name === predictedChampionship[1]?.name)
  ) {
    score += 32
  }

  // Score for Champion
  if (
    actualResults.finalFour.champion?.name &&
    actualResults.finalFour.champion.name === bracket.finalFour.champion?.name
  ) {
    score += 64
  }

  return score
}

