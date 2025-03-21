import { BettingOdds } from './betting-odds';

const NCAA_API_URL = "https://ncaa-api.henrygd.me";

// List of all 64 teams in the NCAA Men's Basketball Tournament
const NCAA_TOURNAMENT_TEAMS = new Set([
  // South Region
  "Auburn", "Alabama State", "Louisville", "Creighton", 
  "Michigan", "UC San Diego", "Texas A&M", "Yale", 
  "Ole Miss", "North Carolina", "Iowa State", "Lipscomb", 
  "Marquette", "New Mexico", "Michigan State", "Bryant",
  
  // North/East Region
  "Duke", "Mount St. Mary's", "Mississippi State", "Baylor", 
  "Oregon", "Liberty", "Arizona", "Akron", 
  "BYU", "VCU", "Wisconsin", "Montana", 
  "Saint Mary's", "Vanderbilt", "Alabama", "Robert Morris",
  
  // Midwest Region
  "Houston", "SIU-Edwardsville", "Gonzaga", "Georgia", 
  "Clemson", "McNeese", "Purdue", "High Point", 
  "Illinois", "Xavier", "Kentucky", "Troy", 
  "UCLA", "Utah State", "Tennessee", "Wofford",
  
  // West/Southwest Region
  "Florida", "Norfolk State", "UConn", "Oklahoma", 
  "Memphis", "Colorado State", "Maryland", "Grand Canyon", 
  "Missouri", "Drake", "Texas Tech", "UNC Wilmington", 
  "Kansas", "Arkansas", "St. John's", "Omaha"
]);

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
  startTime: string;
  region?: string;
  round?: string;
  venue?: string;
  location?: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
}

// Mock data for live games in First Round 
const mockLiveGames: Game[] = [
  // South Region
  {
    id: "south-1",
    homeTeam: "Auburn",
    awayTeam: "Alabama State",
    homeScore: 85,
    awayScore: 52,
    status: "Final",
    startTime: "2025-03-20T12:00:00Z",
    region: "South",
    round: "First Round",
    venue: "Rupp Arena",
    location: "Lexington, KY"
  },
  {
    id: "south-2",
    homeTeam: "Louisville",
    awayTeam: "Creighton",
    homeScore: 72,
    awayScore: 67,
    status: "Final",
    startTime: "2025-03-20T14:30:00Z",
    region: "South",
    round: "First Round",
    venue: "Rupp Arena",
    location: "Lexington, KY"
  },
  // North/East Region
  {
    id: "north-1",
    homeTeam: "Duke",
    awayTeam: "Mount St. Mary's",
    homeScore: 92,
    awayScore: 57,
    status: "Final",
    startTime: "2025-03-20T13:00:00Z",
    region: "North",
    round: "First Round",
    venue: "Amica Mutual Pavilion",
    location: "Providence, RI"
  },
  // West Region
  {
    id: "west-1",
    homeTeam: "Florida",
    awayTeam: "Norfolk State",
    homeScore: 76,
    awayScore: 62,
    status: "Final",
    startTime: "2025-03-21T12:30:00Z",
    region: "West",
    round: "First Round",
    venue: "Climate Pledge Arena",
    location: "Seattle, WA"
  },
  // Southwest Region
  {
    id: "southwest-1",
    homeTeam: "Houston",
    awayTeam: "SIU-Edwardsville",
    homeScore: 88,
    awayScore: 48,
    status: "Final",
    startTime: "2025-03-20T15:00:00Z",
    region: "Southwest",
    round: "First Round",
    venue: "Intrust Bank Arena",
    location: "Wichita, KS"
  },
  // Final Four - Semifinals
  {
    id: "ff-semi-1",
    homeTeam: "Auburn",
    awayTeam: "Duke",
    homeScore: 78,
    awayScore: 75,
    status: "Final",
    startTime: "2025-04-05T18:00:00Z",
    region: "Final Four",
    round: "Final Four",
    venue: "Lucas Oil Stadium",
    location: "Indianapolis, IN"
  },
  {
    id: "ff-semi-2",
    homeTeam: "Houston",
    awayTeam: "Florida",
    homeScore: 68,
    awayScore: 63,
    status: "Final",
    startTime: "2025-04-05T20:30:00Z",
    region: "Final Four",
    round: "Final Four",
    venue: "Lucas Oil Stadium",
    location: "Indianapolis, IN"
  },
  // Final Four - Championship
  {
    id: "ff-champ",
    homeTeam: "Auburn",
    awayTeam: "Houston",
    homeScore: 82,
    awayScore: 79,
    status: "Final",
    startTime: "2025-04-07T21:00:00Z",
    region: "Final Four",
    round: "Championship",
    venue: "Lucas Oil Stadium",
    location: "Indianapolis, IN"
  }
];

// Mock data for upcoming games
const mockUpcomingGames: Game[] = [
  // South Region
  {
    id: "south-3",
    homeTeam: "Michigan",
    awayTeam: "UC San Diego",
    homeScore: 0,
    awayScore: 0,
    status: "Scheduled",
    startTime: "2025-03-21T14:30:00Z",
    region: "South",
    round: "First Round",
    venue: "Rupp Arena",
    location: "Lexington, KY"
  },
  {
    id: "south-4",
    homeTeam: "Texas A&M",
    awayTeam: "Yale",
    homeScore: 0,
    awayScore: 0,
    status: "Scheduled",
    startTime: "2025-03-21T17:00:00Z",
    region: "South",
    round: "First Round",
    venue: "Rupp Arena",
    location: "Lexington, KY"
  },
  // North/East Region
  {
    id: "north-2",
    homeTeam: "Mississippi State",
    awayTeam: "Baylor",
    homeScore: 0,
    awayScore: 0,
    status: "Scheduled",
    startTime: "2025-03-21T15:30:00Z",
    region: "North",
    round: "First Round",
    venue: "Amica Mutual Pavilion",
    location: "Providence, RI"
  },
  // West Region
  {
    id: "west-2", 
    homeTeam: "UConn",
    awayTeam: "Oklahoma",
    homeScore: 0,
    awayScore: 0,
    status: "Scheduled",
    startTime: "2025-03-22T12:00:00Z",
    region: "West",
    round: "First Round",
    venue: "Climate Pledge Arena",
    location: "Seattle, WA"
  },
  // Southwest Region
  {
    id: "southwest-2",
    homeTeam: "Purdue",
    awayTeam: "High Point",
    homeScore: 0,
    awayScore: 0,
    status: "Scheduled",
    startTime: "2025-03-21T19:00:00Z",
    region: "Southwest",
    round: "First Round",
    venue: "Intrust Bank Arena",
    location: "Wichita, KS"
  },
  // Add some more second round games
  {
    id: "south-second-1",
    homeTeam: "Auburn",
    awayTeam: "Louisville",
    homeScore: 75,
    awayScore: 68,
    status: "Final",
    startTime: "2025-03-23T12:00:00Z",
    region: "South",
    round: "Second Round",
    venue: "Rupp Arena",
    location: "Lexington, KY"
  },
  {
    id: "north-second-1",
    homeTeam: "Duke",
    awayTeam: "Baylor",
    homeScore: 82,
    awayScore: 74,
    status: "Final",
    startTime: "2025-03-23T14:30:00Z",
    region: "North",
    round: "Second Round",
    venue: "Amica Mutual Pavilion",
    location: "Providence, RI"
  },
  {
    id: "west-second-1",
    homeTeam: "Florida",
    awayTeam: "UConn",
    homeScore: 77,
    awayScore: 71,
    status: "Final",
    startTime: "2025-03-24T12:00:00Z",
    region: "West",
    round: "Second Round",
    venue: "Climate Pledge Arena",
    location: "Seattle, WA"
  },
  {
    id: "midwest-second-1",
    homeTeam: "Houston",
    awayTeam: "Purdue",
    homeScore: 65,
    awayScore: 58,
    status: "Final",
    startTime: "2025-03-24T14:30:00Z",
    region: "Southwest",
    round: "Second Round",
    venue: "Intrust Bank Arena",
    location: "Wichita, KS"
  }
];

export async function fetchFromNcaaApi(path: string): Promise<any> {
  try {
    console.log(`Fetching from NCAA API: ${NCAA_API_URL}${path}`);
    const response = await fetch(`${NCAA_API_URL}${path}`);
    if (!response.ok) {
      throw new Error(`NCAA API returned ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from NCAA API:', error);
    throw error;
  }
}

// Get the current date in YYYY/MM/DD format
function getCurrentDateFormatted(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

export async function getLiveGames(): Promise<Game[]> {
  try {
    // First, try to fetch from NCAA API
    const currentDate = getCurrentDateFormatted();
    const path = `/scoreboard/basketball-men/d1/${currentDate}/all-conf`;
    
    try {
      const data = await fetchFromNcaaApi(path);
      
      // Transform the NCAA API data to our Game interface
      if (data && data.games) {
        console.log('Successfully fetched live games from NCAA API');
        
        return data.games.map((gameData: any) => {
          const game = gameData.game;
          
          // Extract region and round from bracket information if available
          let region = "Unknown";
          let round = "Unknown";
          
          if (game.bracketRegion) {
            region = game.bracketRegion;
          }
          
          if (game.bracketRound) {
            round = game.bracketRound;
          }
          
          return {
            id: game.gameID,
            homeTeam: game.home?.names?.short || "TBD",
            awayTeam: game.away?.names?.short || "TBD",
            homeScore: parseInt(game.home?.score) || 0,
            awayScore: parseInt(game.away?.score) || 0,
            status: game.gameState,
            startTime: game.startTimeEpoch ? new Date(parseInt(game.startTimeEpoch) * 1000).toISOString() : game.startTime,
            region: region,
            round: round,
            venue: game.venue?.name,
            location: game.venue?.city
          };
        }).filter((game: Game) => 
          // Keep only games that are in progress or final
          game.status === "in_progress" || game.status === "final" || game.status === "FINAL"
        );
      }
    } catch (apiError) {
      console.error('Error fetching from NCAA API, falling back to mock data:', apiError);
    }
    
    // Fallback to mock data if API fails
    console.log('Returning mock live games data');
    return mockLiveGames;
  } catch (error) {
    console.error('Error fetching live games:', error);
    return mockLiveGames;
  }
}

export async function getUpcomingGames(): Promise<Game[]> {
  try {
    // First try to fetch from NCAA API for today and the next few days
    const currentDate = new Date();
    const upcoming: Game[] = [];
    
    // Try to fetch the next 3 days worth of schedules
    for (let i = 0; i < 3; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      const path = `/scoreboard/basketball-men/d1/${year}/${month}/${day}/all-conf`;
      
      try {
        const data = await fetchFromNcaaApi(path);
        
        if (data && data.games) {
          const games = data.games.map((gameData: any) => {
            const game = gameData.game;
            
            // Extract region and round from bracket information if available
            let region = "Unknown";
            let round = "Unknown";
            
            if (game.bracketRegion) {
              region = game.bracketRegion;
            }
            
            if (game.bracketRound) {
              round = game.bracketRound;
            }
            
            return {
              id: game.gameID,
              homeTeam: game.home?.names?.short || "TBD",
              awayTeam: game.away?.names?.short || "TBD",
              homeScore: parseInt(game.home?.score) || 0,
              awayScore: parseInt(game.away?.score) || 0,
              status: game.gameState,
              startTime: game.startTimeEpoch ? new Date(parseInt(game.startTimeEpoch) * 1000).toISOString() : game.startTime,
              region: region,
              round: round,
              venue: game.venue?.name,
              location: game.venue?.city
            };
          }).filter((game: Game) => 
            // Keep only scheduled games
            game.status === "scheduled" || game.status === "Scheduled"
          );
          
          upcoming.push(...games);
        }
      } catch (apiError) {
        console.error(`Error fetching schedule for ${year}/${month}/${day}:`, apiError);
      }
    }
    
    if (upcoming.length > 0) {
      console.log(`Successfully fetched ${upcoming.length} upcoming games from NCAA API`);
      return upcoming;
    }
    
    // Fallback to mock data if API fails
    console.log('Returning mock upcoming games data');
    return mockUpcomingGames;
  } catch (error) {
    console.error('Error fetching upcoming games:', error);
    return mockUpcomingGames;
  }
}

export async function getTeamDetails(teamName: string): Promise<Team | null> {
  try {
    const response = await fetch(`${NCAA_API_URL}/searchteams.php?t=${encodeURIComponent(teamName)}`);
    const data = await response.json();
    
    if (data.teams && data.teams.length > 0) {
      const team = data.teams[0];
      return {
        id: team.idTeam,
        name: team.strTeam,
        shortName: team.strTeamShort,
        logo: team.strTeamBadge
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching team details:', error);
    return null;
  }
}

export async function getBettingOdds(): Promise<BettingOdds[]> {
  return [
    {
      teamName: "Auburn",
      odds: "+350",
      movement: "up"
    },
    {
      teamName: "Duke",
      odds: "+450",
      movement: "down"
    },
    {
      teamName: "Houston",
      odds: "+500",
      movement: "up"
    },
    {
      teamName: "Florida",
      odds: "+650",
      movement: "unchanged"
    },
    {
      teamName: "Louisville",
      odds: "+800",
      movement: "down"
    },
    {
      teamName: "UConn",
      odds: "+1000",
      movement: "up"
    },
    {
      teamName: "Purdue",
      odds: "+1200",
      movement: "unchanged"
    },
    {
      teamName: "Michigan",
      odds: "+1500",
      movement: "down"
    },
    {
      teamName: "Alabama",
      odds: "+2000",
      movement: "unchanged"
    },
    {
      teamName: "Texas A&M",
      odds: "+2500",
      movement: "up"
    }
  ];
} 