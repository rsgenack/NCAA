"use client"

import { useState } from "react"
import type { BracketData, Team, Region, Round } from "@/lib/bracket-data"
import { getTeamInfo } from "@/lib/team-data"
import { getTeamLogoUrl } from "@/lib/team-logos"
import { hasSvgLogo } from "@/lib/team-svg-logos"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, ChevronRight } from "lucide-react"

interface BracketViewProps {
  bracketData: BracketData
  onUpdate: (updatedData: BracketData) => void
}

export default function BracketView({ bracketData, onUpdate }: BracketViewProps) {
  const [activeRegion, setActiveRegion] = useState<Region>("East")

  const handleTeamUpdate = (region: Region, round: Round, matchupIndex: number, teamIndex: 0 | 1, value: string) => {
    const newData = { ...bracketData }

    if (!newData[region][round]) {
      newData[region][round] = []
    }

    // Ensure the matchup exists
    if (!newData[region][round][matchupIndex]) {
      newData[region][round][matchupIndex] = [
        { name: "", seed: 0 },
        { name: "", seed: 0 },
      ]
    }

    // Update the team name
    newData[region][round][matchupIndex][teamIndex].name = value

    onUpdate(newData)
  }

  const handleWinnerSelection = (region: Region, round: Round, matchupIndex: number, winnerIndex: 0 | 1) => {
    const newData = { ...bracketData }
    const currentRound = newData[region][round]

    if (!currentRound || !currentRound[matchupIndex]) return

    const winner = currentRound[matchupIndex][winnerIndex]
    const nextRound = getNextRound(round)

    if (!nextRound) return // No next round (championship)

    // Calculate the next matchup index and position
    const nextMatchupIndex = Math.floor(matchupIndex / 2)
    const nextTeamIndex = (matchupIndex % 2) as 0 | 1

    // Ensure the next round exists
    if (!newData[region][nextRound]) {
      newData[region][nextRound] = []
    }

    // Ensure the next matchup exists
    if (!newData[region][nextRound][nextMatchupIndex]) {
      newData[region][nextRound][nextMatchupIndex] = [
        { name: "", seed: 0 },
        { name: "", seed: 0 },
      ]
    }

    // Update the winner in the next round
    newData[region][nextRound][nextMatchupIndex][nextTeamIndex] = { ...winner }

    onUpdate(newData)
  }

  // Handle Final Four and Championship separately
  const handleFinalFourWinner = (semifinalIndex: number, winnerIndex: 0 | 1) => {
    const newData = { ...bracketData }
    const currentRound = newData.finalFour.semifinals

    if (!currentRound || !currentRound[semifinalIndex]) return

    const winner = currentRound[semifinalIndex][winnerIndex]

    // Ensure the championship exists
    if (!newData.finalFour.championship) {
      newData.finalFour.championship = [
        { name: "", seed: 0 },
        { name: "", seed: 0 },
      ]
    }

    // Update the winner in the championship
    newData.finalFour.championship[semifinalIndex] = { ...winner }

    onUpdate(newData)
  }

  const handleChampionshipWinner = (winnerIndex: 0 | 1) => {
    const newData = { ...bracketData }
    const championship = newData.finalFour.championship

    if (!championship) return

    const winner = championship[winnerIndex]

    // Update the champion
    newData.finalFour.champion = { ...winner }

    onUpdate(newData)
  }

  return (
    <div className="flex flex-col gap-6">
      <Tabs value={activeRegion} onValueChange={(value) => setActiveRegion(value as Region)}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="East" className="bracket-title text-lg">
            EAST
          </TabsTrigger>
          <TabsTrigger value="West" className="bracket-title text-lg">
            WEST
          </TabsTrigger>
          <TabsTrigger value="South" className="bracket-title text-lg">
            SOUTH
          </TabsTrigger>
          <TabsTrigger value="Midwest" className="bracket-title text-lg">
            MIDWEST
          </TabsTrigger>
        </TabsList>

        {Object.entries(bracketData).map(([regionKey, regionData]) => {
          if (regionKey === "finalFour") return null

          const region = regionKey as Region

          return (
            <TabsContent key={region} value={region}>
              <RegionBracket
                region={region}
                regionData={regionData}
                onTeamUpdate={handleTeamUpdate}
                onWinnerSelection={handleWinnerSelection}
              />
            </TabsContent>
          )
        })}
      </Tabs>

      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-6 text-center text-primary bracket-title">FINAL FOUR & CHAMPIONSHIP</h3>
        <FinalFourBracket
          finalFourData={bracketData.finalFour}
          onSemifinalWinner={handleFinalFourWinner}
          onChampionshipWinner={handleChampionshipWinner}
        />
      </div>
    </div>
  )
}

interface RegionBracketProps {
  region: Region
  regionData: Record<Round, Team[][]>
  onTeamUpdate: (region: Region, round: Round, matchupIndex: number, teamIndex: 0 | 1, value: string) => void
  onWinnerSelection: (region: Region, round: Round, matchupIndex: number, winnerIndex: 0 | 1) => void
}

function RegionBracket({ region, regionData, onTeamUpdate, onWinnerSelection }: RegionBracketProps) {
  const roundTitles = {
    firstRound: "FIRST ROUND",
    secondRound: "SECOND ROUND",
    sweet16: "SWEET 16",
    elite8: "ELITE 8",
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* First Round - 8 matchups */}
      <div className="col-span-1">
        <h4 className="text-xl font-bold mb-4 text-gray-700 bracket-title">{roundTitles.firstRound}</h4>
        <div className="flex flex-col gap-6">
          {Array.from({ length: 8 }).map((_, matchupIndex) => {
            // Ensure matchup is properly initialized with default values
            const matchup = regionData.firstRound?.[matchupIndex] || [
              { name: "", seed: 0 },
              { name: "", seed: 0 },
            ]

            return (
              <div key={`first-${matchupIndex}`} className="flex flex-col relative">
                <TeamMatchup
                  teams={matchup as [Team, Team]}
                  onTeamUpdate={(teamIndex, value) =>
                    onTeamUpdate(region, "firstRound", matchupIndex, teamIndex, value)
                  }
                  onWinnerSelect={(winnerIndex) => onWinnerSelection(region, "firstRound", matchupIndex, winnerIndex)}
                  showConnector={true}
                />
                {matchupIndex % 2 === 0 && <div className="matchup-connector-vertical"></div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Second Round - 4 matchups */}
      <div className="col-span-1">
        <h4 className="text-xl font-bold mb-4 text-gray-700 bracket-title">{roundTitles.secondRound}</h4>
        <div className="flex flex-col gap-24">
          {Array.from({ length: 4 }).map((_, matchupIndex) => {
            // Ensure matchup is properly initialized with default values
            const matchup = regionData.secondRound?.[matchupIndex] || [
              { name: "", seed: 0 },
              { name: "", seed: 0 },
            ]

            return (
              <div key={`second-${matchupIndex}`} className="flex flex-col relative">
                <TeamMatchup
                  teams={matchup as [Team, Team]}
                  onTeamUpdate={(teamIndex, value) =>
                    onTeamUpdate(region, "secondRound", matchupIndex, teamIndex, value)
                  }
                  onWinnerSelect={(winnerIndex) => onWinnerSelection(region, "secondRound", matchupIndex, winnerIndex)}
                  showConnector={true}
                />
                {matchupIndex % 2 === 0 && <div className="matchup-connector-vertical"></div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Sweet 16 - 2 matchups */}
      <div className="col-span-1">
        <h4 className="text-xl font-bold mb-4 text-gray-700 bracket-title">{roundTitles.sweet16}</h4>
        <div className="flex flex-col gap-64">
          {Array.from({ length: 2 }).map((_, matchupIndex) => {
            // Ensure matchup is properly initialized with default values
            const matchup = regionData.sweet16?.[matchupIndex] || [
              { name: "", seed: 0 },
              { name: "", seed: 0 },
            ]

            return (
              <div key={`sweet16-${matchupIndex}`} className="flex flex-col relative">
                <TeamMatchup
                  teams={matchup as [Team, Team]}
                  onTeamUpdate={(teamIndex, value) => onTeamUpdate(region, "sweet16", matchupIndex, teamIndex, value)}
                  onWinnerSelect={(winnerIndex) => onWinnerSelection(region, "sweet16", matchupIndex, winnerIndex)}
                  showConnector={true}
                />
                {matchupIndex % 2 === 0 && <div className="matchup-connector-vertical"></div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Elite 8 - 1 matchup */}
      <div className="col-span-1">
        <h4 className="text-xl font-bold mb-4 text-gray-700 bracket-title">{roundTitles.elite8}</h4>
        <div className="flex flex-col mt-32">
          {Array.from({ length: 1 }).map((_, matchupIndex) => {
            // Ensure matchup is properly initialized with default values
            const matchup = regionData.elite8?.[matchupIndex] || [
              { name: "", seed: 0 },
              { name: "", seed: 0 },
            ]

            return (
              <div key={`elite8-${matchupIndex}`} className="flex flex-col">
                <TeamMatchup
                  teams={matchup as [Team, Team]}
                  onTeamUpdate={(teamIndex, value) => onTeamUpdate(region, "elite8", matchupIndex, teamIndex, value)}
                  onWinnerSelect={(winnerIndex) => onWinnerSelection(region, "elite8", matchupIndex, winnerIndex)}
                />
                <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <h5 className="text-lg font-bold text-center text-primary bracket-title mb-2">
                    FINAL FOUR REPRESENTATIVE
                  </h5>
                  {regionData.elite8?.[0]?.[0]?.name || regionData.elite8?.[0]?.[1]?.name ? (
                    <div className="flex items-center justify-center">
                      <div className="flex items-center">
                        {(regionData.elite8[0][0]?.name || regionData.elite8[0][1]?.name) && (
                          <img
                            src={getTeamLogoUrl(regionData.elite8[0][0]?.name || regionData.elite8[0][1]?.name || "")}
                            alt="Team Logo"
                            className={`w-10 h-10 mr-2 ${hasSvgLogo(regionData.elite8[0][0]?.name || regionData.elite8[0][1]?.name || "") ? "object-contain" : "object-scale-down"}`}
                            onError={(e) => {
                              // Fallback if favicon fails to load
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                            }}
                          />
                        )}
                        <div className="font-bold text-xl">
                          {regionData.elite8?.[0]?.[0]?.name || regionData.elite8?.[0]?.[1]?.name}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic text-center">Winner advances to Final Four</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface FinalFourBracketProps {
  finalFourData: {
    semifinals: Team[][]
    championship: Team[]
    champion: Team | null
  }
  onSemifinalWinner: (semifinalIndex: number, winnerIndex: 0 | 1) => void
  onChampionshipWinner: (winnerIndex: 0 | 1) => void
}

function FinalFourBracket({ finalFourData, onSemifinalWinner, onChampionshipWinner }: FinalFourBracketProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Semifinals - 2 matchups */}
      <div className="col-span-1">
        <h4 className="text-xl font-bold mb-4 text-center text-gray-700 bracket-title">SEMIFINALS</h4>
        <div className="flex flex-col gap-32">
          {Array.from({ length: 2 }).map((_, matchupIndex) => {
            // Ensure matchup is properly initialized with default values
            const matchup = finalFourData.semifinals?.[matchupIndex] || [
              { name: "", seed: 0 },
              { name: "", seed: 0 },
            ]

            return (
              <div key={`semifinal-${matchupIndex}`} className="flex flex-col relative">
                <TeamMatchup
                  teams={matchup as [Team, Team]}
                  onWinnerSelect={(winnerIndex) => onSemifinalWinner(matchupIndex, winnerIndex)}
                  readOnly
                  showConnector={true}
                />
                {matchupIndex % 2 === 0 && <div className="matchup-connector-vertical"></div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Championship */}
      <div className="col-span-1">
        <h4 className="text-xl font-bold mb-4 text-center text-gray-700 bracket-title">CHAMPIONSHIP</h4>
        <div className="mt-16">
          <TeamMatchup
            teams={
              (finalFourData.championship || [
                { name: "", seed: 0 },
                { name: "", seed: 0 },
              ]) as [Team, Team]
            }
            onWinnerSelect={(winnerIndex) => onChampionshipWinner(winnerIndex)}
            readOnly
            showConnector={true}
          />
        </div>
      </div>

      {/* Champion */}
      <div className="col-span-1">
        <h4 className="text-xl font-bold mb-4 text-center text-gray-700 bracket-title">CHAMPION</h4>
        <div className="champion-card p-6 flex flex-col items-center justify-center min-h-[200px] mt-16">
          {finalFourData.champion?.name ? (
            <>
              <img
                src={getTeamLogoUrl(finalFourData.champion.name) || "/placeholder.svg"}
                alt={`${finalFourData.champion.name} Logo`}
                className={`w-20 h-20 mb-3 ${hasSvgLogo(finalFourData.champion.name) ? "object-contain" : "object-scale-down"}`}
                style={{ maxHeight: "80px" }}
                onError={(e) => {
                  // Fallback if favicon fails to load
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                }}
              />
              <Trophy className="h-10 w-10 text-primary mb-2" />
              <div className="text-2xl font-bold text-center text-primary bracket-title">
                {finalFourData.champion.name}
              </div>
              {finalFourData.champion.seed > 0 && (
                <div className="text-sm text-gray-500 mt-1 flex items-center justify-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-800 text-xs font-bold mr-1">
                    {finalFourData.champion.seed}
                  </span>
                  Seed
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-500 italic text-center">Tournament Champion</div>
          )}
        </div>
      </div>
    </div>
  )
}

interface TeamMatchupProps {
  teams: [Team, Team] | [Team | undefined, Team | undefined]
  onTeamUpdate?: (teamIndex: 0 | 1, value: string) => void
  onWinnerSelect: (winnerIndex: 0 | 1) => void
  readOnly?: boolean
  showConnector?: boolean
}

function TeamMatchup({
  teams,
  onTeamUpdate,
  onWinnerSelect,
  readOnly = false,
  showConnector = false,
}: TeamMatchupProps) {
  // Ensure teams are properly initialized with default values
  const team1 = teams[0] || { name: "", seed: 0 }
  const team2 = teams[1] || { name: "", seed: 0 }

  return (
    <div className={`flex flex-col gap-1 ${showConnector ? "bracket-connector" : ""}`}>
      <TeamCard
        team={team1}
        onTeamUpdate={(value) => onTeamUpdate?.(0, value)}
        onSelect={() => team1.name && onWinnerSelect(0)}
        readOnly={readOnly}
        isWinner={team1.name && team2.name && team1.name === (teams[0]?.name || "")}
      />
      <TeamCard
        team={team2}
        onTeamUpdate={(value) => onTeamUpdate?.(1, value)}
        onSelect={() => team2.name && onWinnerSelect(1)}
        readOnly={readOnly}
        isWinner={team1.name && team2.name && team2.name === (teams[1]?.name || "")}
      />
    </div>
  )
}

interface TeamCardProps {
  team: Team
  onTeamUpdate?: (value: string) => void
  onSelect: () => void
  readOnly?: boolean
  isWinner?: boolean
}

function TeamCard({ team, onTeamUpdate, onSelect, readOnly = false, isWinner = false }: TeamCardProps) {
  const teamInfo = getTeamInfo(team.name)
  const logoUrl = getTeamLogoUrl(team.name)
  const isSvgLogo = team.name && hasSvgLogo(team.name)

  const cardClasses = `
    team-card flex items-center p-2 
    ${team.name ? "cursor-pointer hover:border-primary" : ""}
    ${isWinner ? "border-primary bg-blue-50" : ""}
  `

  return (
    <div className={cardClasses} onClick={onSelect}>
      <div className="flex items-center w-full">
        {team.seed > 0 && <div className="seed-badge mr-2">{team.seed}</div>}

        {team.name ? (
          <img
            src={logoUrl || "/placeholder.svg"}
            alt={`${team.name} Logo`}
            className={`w-8 h-8 ${isSvgLogo ? "object-contain" : "object-scale-down"} mr-2`}
            style={{ maxHeight: "32px" }}
            onError={(e) => {
              // Fallback if favicon fails to load
              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=32&width=32"
            }}
          />
        ) : (
          <div className="w-8 h-8 bg-gray-100 rounded-sm flex items-center justify-center text-gray-400 mr-2">-</div>
        )}

        <div className="flex-grow">
          {readOnly ? (
            <div className="font-medium truncate text-sm">{team.name || "TBD"}</div>
          ) : (
            <Input
              type="text" // Explicitly set type to text
              value={team.name || ""}
              onChange={(e) => onTeamUpdate?.(e.target.value)}
              placeholder="Team Name"
              className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent text-sm font-medium"
              autoComplete="off" // Disable autocomplete
              aria-autocomplete="none" // Additional hint for password managers
              data-form-type="other" // Signal this is not a login form
            />
          )}
        </div>

        {isWinner && <ChevronRight className="h-4 w-4 text-primary ml-1" />}
      </div>
    </div>
  )
}

function getNextRound(round: Round): Round | null {
  const rounds: Round[] = ["firstRound", "secondRound", "sweet16", "elite8"]
  const currentIndex = rounds.indexOf(round)

  if (currentIndex === -1 || currentIndex === rounds.length - 1) {
    return null
  }

  return rounds[currentIndex + 1]
}

