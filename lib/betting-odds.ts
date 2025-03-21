import { Game } from './sports-api';

const API_KEY = "3"; // Free test API key
const BASE_URL = "https://www.thesportsdb.com/api/v1/json";

export interface BettingOdds {
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  homeOdds: number;
  awayOdds: number;
  spread: number;
  total: number;
  lastUpdated: string;
}

export async function getBettingOdds(gameId: string): Promise<BettingOdds | null> {
  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/lookupevent.php?id=${gameId}`);
    const data = await response.json();
    
    if (data.events && data.events.length > 0) {
      const event = data.events[0];
      return {
        gameId: event.idEvent,
        homeTeam: event.strHomeTeam,
        awayTeam: event.strAwayTeam,
        homeOdds: parseFloat(event.strHomeOdds || "0"),
        awayOdds: parseFloat(event.strAwayOdds || "0"),
        spread: parseFloat(event.strSpread || "0"),
        total: parseFloat(event.strTotal || "0"),
        lastUpdated: new Date().toISOString()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching betting odds:', error);
    return null;
  }
}

export async function getLiveBettingOdds(): Promise<BettingOdds[]> {
  try {
    // In a real implementation, this would fetch from a betting API
    // For now, return mock data for NCAA tournament games
    const mockOdds: BettingOdds[] = [
      {
        gameId: "ncaa-1",
        homeTeam: "UConn",
        awayTeam: "Stetson",
        homeOdds: -2500,
        awayOdds: +1200,
        spread: -25.5,
        total: 145.5,
        lastUpdated: new Date().toISOString()
      },
      {
        gameId: "ncaa-2",
        homeTeam: "Baylor",
        awayTeam: "Colgate",
        homeOdds: -1800,
        awayOdds: +1000,
        spread: -20.5,
        total: 142.5,
        lastUpdated: new Date().toISOString()
      },
      {
        gameId: "ncaa-3",
        homeTeam: "Houston",
        awayTeam: "Longwood",
        homeOdds: -3000,
        awayOdds: +1500,
        spread: -28.5,
        total: 138.5,
        lastUpdated: new Date().toISOString()
      }
    ];

    return mockOdds;
  } catch (error) {
    console.error('Error fetching betting odds:', error);
    return [];
  }
} 