'use client';

import { useEffect, useState, useRef } from 'react';
import { getLiveGames, getUpcomingGames, Game } from '@/lib/sports-api';
import { getTeamLogoUrl } from '@/lib/team-logos';
import { RefreshCw, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

type GameScheduleProps = {
  games?: Game[];
}

export default function GameSchedule({ games: propGames }: GameScheduleProps = {}) {
  console.log('GameSchedule component rendering');
  const [liveGames, setLiveGames] = useState<Game[]>([]);
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(propGames ? false : true);
  const [isUpdating, setIsUpdating] = useState(false);
  const previousScores = useRef<Record<string, { home: number; away: number }>>({});
  const [selectedRegion, setSelectedRegion] = useState<string>("all")

  useEffect(() => {
    // If games were passed as props, don't fetch
    if (propGames) {
      return;
    }
    
    console.log('GameSchedule useEffect running');
    const fetchGames = async () => {
      setIsUpdating(true);
      try {
        console.log('Fetching games...');
        const [live, upcoming] = await Promise.all([
          getLiveGames(),
          getUpcomingGames()
        ]);
        console.log('Fetched games:', { live, upcoming });
        
        // Store previous scores before updating
        liveGames.forEach(game => {
          previousScores.current[game.id] = {
            home: game.homeScore,
            away: game.awayScore
          };
        });

        setLiveGames(live);
        setUpcomingGames(upcoming);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
        setIsUpdating(false);
      }
    };

    fetchGames();
    // Refresh every 30 seconds
    const interval = setInterval(fetchGames, 30 * 1000);
    return () => clearInterval(interval);
  }, [propGames]);

  // Use either prop games or fetched games
  const allGames = propGames || [...liveGames, ...upcomingGames];

  // Group games by region
  const gamesByRegion = allGames.reduce((acc: Record<string, Game[]>, game) => {
    const region = game.region || "Unknown"
    if (!acc[region]) {
      acc[region] = []
    }
    acc[region].push(game)
    return acc
  }, {})
  
  // Get all unique regions
  const regions = Object.keys(gamesByRegion).sort()
  
  // Filter games by selected region
  const filteredGames = selectedRegion === "all" 
    ? allGames
    : gamesByRegion[selectedRegion] || []
    
  // Sort games by date/time
  const sortedGames = [...filteredGames].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  )

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  if (loading) {
    console.log('GameSchedule showing loading state');
    return <div className="text-center py-8">Loading games...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tournament Schedule</h2>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map(region => (
              <SelectItem key={region} value={region}>
                {region} Region
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="bg-primary/5">
          <CardTitle>Games</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Round</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Venue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedGames.length > 0 ? (
                  sortedGames.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>{game.region || "Unknown"}</TableCell>
                      <TableCell>{game.round || "TBD"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div>{game.homeTeam}</div>
                          <div className="text-center">vs.</div>
                          <div>{game.awayTeam}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {game.status !== "Scheduled" ? (
                          <div className="flex flex-col gap-1">
                            <div>{game.homeScore}</div>
                            <div className="text-center">-</div>
                            <div>{game.awayScore}</div>
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          game.status === "Final" 
                            ? "bg-gray-200" 
                            : game.status === "in_progress" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                        }`}>
                          {game.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {formatDate(game.startTime)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {(game.venue || game.location) && (
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {[game.venue, game.location].filter(Boolean).join(', ')}
                            </span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No games found for selected region
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 