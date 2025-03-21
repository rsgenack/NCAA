'use client';

import { useEffect, useState, useRef } from 'react';
import { getLiveBettingOdds, BettingOdds } from '@/lib/betting-odds';
import { getTeamLogoUrl } from '@/lib/team-logos';
import { RefreshCw } from 'lucide-react';

export default function BettingOddsView() {
  console.log('BettingOddsView component rendering');
  const [odds, setOdds] = useState<BettingOdds[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const previousOdds = useRef<Record<string, BettingOdds>>({});

  useEffect(() => {
    console.log('BettingOddsView useEffect running');
    const fetchOdds = async () => {
      setIsUpdating(true);
      try {
        console.log('Fetching betting odds...');
        const liveOdds = await getLiveBettingOdds();
        console.log('Fetched betting odds:', liveOdds);
        
        // Update previous odds before setting new data
        odds.forEach(odd => {
          previousOdds.current[odd.gameId] = odd;
        });

        setOdds(liveOdds);
      } catch (error) {
        console.error('Error fetching odds:', error);
      } finally {
        setLoading(false);
        setIsUpdating(false);
      }
    };

    fetchOdds();
    // Refresh every 30 seconds
    const interval = setInterval(fetchOdds, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    console.log('BettingOddsView showing loading state');
    return <div className="text-center py-8">Loading betting odds...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Betting Odds</h2>
        <div className="flex items-center text-sm text-gray-500">
          <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
          Live Updates
        </div>
      </div>
      <div className="grid gap-4">
        {odds.length > 0 ? (
          odds.map((game) => {
            const previous = previousOdds.current[game.gameId];
            const homeOddsChanged = previous?.homeOdds !== game.homeOdds;
            const awayOddsChanged = previous?.awayOdds !== game.awayOdds;
            const spreadChanged = previous?.spread !== game.spread;
            const totalChanged = previous?.total !== game.total;

            return (
              <div key={game.gameId} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img
                        src={getTeamLogoUrl(game.homeTeam)}
                        alt={`${game.homeTeam} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold">{game.homeTeam}</span>
                  </div>
                  <div className="text-xl font-bold">VS</div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">{game.awayTeam}</span>
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img
                        src={getTeamLogoUrl(game.awayTeam)}
                        alt={`${game.awayTeam} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Money Line</div>
                    <div className="flex justify-between">
                      <span className={`transition-all duration-1000 ease-in-out ${homeOddsChanged ? 'animate-pulse text-green-600' : ''} ${game.homeOdds > 0 ? "text-green-600" : "text-red-600"}`}>
                        {game.homeOdds > 0 ? `+${game.homeOdds}` : game.homeOdds}
                      </span>
                      <span className={`transition-all duration-1000 ease-in-out ${awayOddsChanged ? 'animate-pulse text-green-600' : ''} ${game.awayOdds > 0 ? "text-green-600" : "text-red-600"}`}>
                        {game.awayOdds > 0 ? `+${game.awayOdds}` : game.awayOdds}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Spread</div>
                    <div className="flex justify-between">
                      <span className={`transition-all duration-1000 ease-in-out ${spreadChanged ? 'animate-pulse text-green-600' : ''} ${game.spread > 0 ? "text-green-600" : "text-red-600"}`}>
                        {game.spread > 0 ? `+${game.spread}` : game.spread}
                      </span>
                      <span className={`transition-all duration-1000 ease-in-out ${totalChanged ? 'animate-pulse text-green-600' : ''} text-gray-600`}>
                        Total: {game.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-4">No live betting odds available at the moment</p>
        )}
      </div>
    </div>
  );
}