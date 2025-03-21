"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GameSchedule from './game-schedule'
import BettingOddsView from './betting-odds'
import { BracketData, Region } from "@/lib/bracket-data"
import { getTeamLogoUrl } from "@/lib/team-logos"
import useTournamentData from './match-table'
import { Trophy, ChevronRight, RefreshCcw, AlertCircle } from "lucide-react"

export default function BracketView() {
  console.log('BracketView component rendering');
  
  // Use our custom hook to get tournament data
  const { bracketData, loading, games, error } = useTournamentData();
  const [activeRegion, setActiveRegion] = useState<Region>("east");
  
  console.log('Current bracketData state:', bracketData);

  // Handle loading state
  if (loading) {
    console.log('BracketData is loading, showing loading state');
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <RefreshCcw className="w-12 h-12 text-primary animate-spin mb-4" />
        <div className="text-xl font-semibold">Loading tournament data...</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <div className="text-xl font-semibold mb-2">Unable to load tournament data</div>
        <div className="text-gray-600 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Check if we have any bracket data
  const hasRegionalData = Object.values(bracketData).some(
    region => region.rounds.some(round => round && round.length > 0)
  );
  
  if (!hasRegionalData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
        <div className="text-xl font-semibold mb-2">No tournament data available</div>
        <div className="text-gray-600 mb-4">
          We couldn't find any bracket data at this time. Please check back later.
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Refresh
        </button>
      </div>
    );
  }

  // Helper function to check if game data is valid (both teams have names)
  const isValidGame = (game: any) => {
    return game && game.homeTeam && game.homeTeam.trim() !== '' && 
           game.awayTeam && game.awayTeam.trim() !== '';
  };

  // Get the proper region display name
  const getRegionDisplayName = (regionKey: string): string => {
    if (regionKey === "east") return "North";
    if (regionKey === "midwest") return "Southwest";
    return regionKey.charAt(0).toUpperCase() + regionKey.slice(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs value={activeRegion} onValueChange={(value) => setActiveRegion(value as Region)} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="east" className="bracket-title text-lg">
            NORTH
          </TabsTrigger>
          <TabsTrigger value="west" className="bracket-title text-lg">
            WEST
          </TabsTrigger>
          <TabsTrigger value="south" className="bracket-title text-lg">
            SOUTH
          </TabsTrigger>
          <TabsTrigger value="midwest" className="bracket-title text-lg">
            SOUTHWEST
          </TabsTrigger>
        </TabsList>

        {Object.entries(bracketData).map(([regionKey, regionData]) => {
          console.log('Processing region:', regionKey, regionData);
          if (regionKey === "finalFour") return null;

          const region = regionKey as Region;
          return (
            <TabsContent key={region} value={region}>
              <div className="grid grid-cols-4 gap-4">
                {/* First Round */}
                <div className="col-span-1">
                  <h4 className="text-xl font-bold mb-4 text-gray-700 bracket-title">FIRST ROUND</h4>
                  <div className="flex flex-col gap-6">
                    {regionData.rounds[0]?.map((game, gameIndex) => (
                      isValidGame(game) && (
                        <div key={`first-${gameIndex}`} className="flex flex-col relative">
                          <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={getTeamLogoUrl(game.homeTeam)}
                                  alt={`${game.homeTeam} logo`}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                                  }}
                                />
                                <span>{game.homeTeam}</span>
                              </div>
                              <div className="text-lg font-bold">
                                {game.homeScore !== undefined ? game.homeScore : '-'}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={getTeamLogoUrl(game.awayTeam)}
                                  alt={`${game.awayTeam} logo`}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                                  }}
                                />
                                <span>{game.awayTeam}</span>
                              </div>
                              <div className="text-lg font-bold">
                                {game.awayScore !== undefined ? game.awayScore : '-'}
                              </div>
                            </div>
                          </div>
                          {gameIndex % 2 === 0 && <div className="matchup-connector-vertical"></div>}
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Second Round */}
                <div className="col-span-1">
                  <h4 className="text-xl font-bold mb-4 text-gray-700 bracket-title">SECOND ROUND</h4>
                  <div className="flex flex-col gap-24">
                    {regionData.rounds[1]?.map((game, gameIndex) => (
                      isValidGame(game) && (
                        <div key={`second-${gameIndex}`} className="flex flex-col relative">
                          <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={getTeamLogoUrl(game.homeTeam)}
                                  alt={`${game.homeTeam} logo`}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                                  }}
                                />
                                <span>{game.homeTeam}</span>
                              </div>
                              <div className="text-lg font-bold">
                                {game.homeScore !== undefined ? game.homeScore : '-'}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={getTeamLogoUrl(game.awayTeam)}
                                  alt={`${game.awayTeam} logo`}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                                  }}
                                />
                                <span>{game.awayTeam}</span>
                              </div>
                              <div className="text-lg font-bold">
                                {game.awayScore !== undefined ? game.awayScore : '-'}
                              </div>
                            </div>
                          </div>
                          {gameIndex % 2 === 0 && <div className="matchup-connector-vertical"></div>}
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Sweet 16 */}
                <div className="col-span-1">
                  <h4 className="text-xl font-bold mb-4 text-gray-700 bracket-title">SWEET 16</h4>
                  <div className="flex flex-col gap-64">
                    {regionData.rounds[2]?.map((game, gameIndex) => (
                      isValidGame(game) && (
                        <div key={`sweet16-${gameIndex}`} className="flex flex-col relative">
                          <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={getTeamLogoUrl(game.homeTeam)}
                                  alt={`${game.homeTeam} logo`}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                                  }}
                                />
                                <span>{game.homeTeam}</span>
                              </div>
                              <div className="text-lg font-bold">
                                {game.homeScore !== undefined ? game.homeScore : '-'}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={getTeamLogoUrl(game.awayTeam)}
                                  alt={`${game.awayTeam} logo`}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                                  }}
                                />
                                <span>{game.awayTeam}</span>
                              </div>
                              <div className="text-lg font-bold">
                                {game.awayScore !== undefined ? game.awayScore : '-'}
                              </div>
                            </div>
                          </div>
                          {gameIndex % 2 === 0 && <div className="matchup-connector-vertical"></div>}
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Elite 8 */}
                <div className="col-span-1">
                  <h4 className="text-xl font-bold mb-4 text-gray-700 bracket-title">ELITE 8</h4>
                  <div className="flex flex-col gap-64">
                    {regionData.rounds[3]?.map((game, gameIndex) => (
                      isValidGame(game) && (
                        <div key={`elite8-${gameIndex}`} className="flex flex-col relative">
                          <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={getTeamLogoUrl(game.homeTeam)}
                                  alt={`${game.homeTeam} logo`}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                                  }}
                                />
                                <span>{game.homeTeam}</span>
                              </div>
                              <div className="text-lg font-bold">
                                {game.homeScore !== undefined ? game.homeScore : '-'}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={getTeamLogoUrl(game.awayTeam)}
                                  alt={`${game.awayTeam} logo`}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                                  }}
                                />
                                <span>{game.awayTeam}</span>
                              </div>
                              <div className="text-lg font-bold">
                                {game.awayScore !== undefined ? game.awayScore : '-'}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          )
        })}

        <div className="mt-8">
          <h3 className="text-3xl font-bold mb-6 text-center text-primary bracket-title">FINAL FOUR & CHAMPIONSHIP</h3>
          <div className="grid grid-cols-3 gap-8">
            {/* Final Four - Semifinals */}
            <div className="col-span-1">
              <h4 className="text-xl font-bold mb-4 text-center text-gray-700 bracket-title">SEMIFINALS</h4>
              <div className="flex flex-col gap-24">
                {bracketData.finalFour.rounds[0]?.map((game, gameIndex) => (
                  isValidGame(game) && (
                    <div key={`semifinal-${gameIndex}`} className="flex flex-col">
                      <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img
                              src={getTeamLogoUrl(game.homeTeam)}
                              alt={`${game.homeTeam} logo`}
                              className="w-8 h-8 object-contain"
                              onError={(e) => { 
                                (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                              }}
                            />
                            <span>{game.homeTeam}</span>
                          </div>
                          <div className="text-lg font-bold">
                            {game.homeScore !== undefined ? game.homeScore : '-'}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <img
                              src={getTeamLogoUrl(game.awayTeam)}
                              alt={`${game.awayTeam} logo`}
                              className="w-8 h-8 object-contain"
                              onError={(e) => { 
                                (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                              }}
                            />
                            <span>{game.awayTeam}</span>
                          </div>
                          <div className="text-lg font-bold">
                            {game.awayScore !== undefined ? game.awayScore : '-'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Championship */}
            <div className="col-span-1">
              <h4 className="text-xl font-bold mb-4 text-center text-gray-700 bracket-title">CHAMPIONSHIP</h4>
              <div className="flex flex-col justify-center h-full">
                {bracketData.finalFour.rounds[1]?.map((game, gameIndex) => (
                  isValidGame(game) && (
                    <div key={`championship-${gameIndex}`} className="flex flex-col">
                      <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img
                              src={getTeamLogoUrl(game.homeTeam)}
                              alt={`${game.homeTeam} logo`}
                              className="w-8 h-8 object-contain"
                              onError={(e) => { 
                                (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                              }}
                            />
                            <span>{game.homeTeam}</span>
                          </div>
                          <div className="text-lg font-bold">
                            {game.homeScore !== undefined ? game.homeScore : '-'}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <img
                              src={getTeamLogoUrl(game.awayTeam)}
                              alt={`${game.awayTeam} logo`}
                              className="w-8 h-8 object-contain"
                              onError={(e) => { 
                                (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                              }}
                            />
                            <span>{game.awayTeam}</span>
                          </div>
                          <div className="text-lg font-bold">
                            {game.awayScore !== undefined ? game.awayScore : '-'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Champion */}
            <div className="col-span-1">
              <h4 className="text-xl font-bold mb-4 text-center text-gray-700 bracket-title">CHAMPION</h4>
              <div className="flex justify-center items-center h-full">
                {bracketData.finalFour.rounds[2]?.length > 0 && isValidGame(bracketData.finalFour.rounds[2][0]) && (
                  <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                    <Trophy className="h-12 w-12 text-yellow-500 mb-2" />
                    <div className="flex items-center space-x-2">
                      <img
                        src={getTeamLogoUrl(bracketData.finalFour.rounds[2][0].homeTeam)}
                        alt={`${bracketData.finalFour.rounds[2][0].homeTeam} logo`}
                        className="w-12 h-12 object-contain"
                        onError={(e) => { 
                          (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                        }}
                      />
                      <span className="text-xl font-bold">{bracketData.finalFour.rounds[2][0].homeTeam}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <TabsContent value="schedule" className="mt-8">
          <GameSchedule games={games} />
        </TabsContent>

        <TabsContent value="odds" className="mt-8">
          <BettingOddsView />
        </TabsContent>
      </Tabs>
    </div>
  )
}

