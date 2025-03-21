"use client"

import { useState, useEffect } from "react"
import { getLiveGames, getUpcomingGames, Game } from "@/lib/sports-api"
import { BracketData, Region } from "@/lib/bracket-data"

// This component serves as a data adapter that converts API data to the format expected by BracketView
export default function useTournamentData() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [bracketData, setBracketData] = useState<BracketData>({
    east: { rounds: [] },
    west: { rounds: [] },
    south: { rounds: [] },
    midwest: { rounds: [] },
    finalFour: { rounds: [] }
  })
  const [error, setError] = useState<string | null>(null)

  // Map region names from API to our internal region structure
  const mapRegionName = (apiRegion: string): Region => {
    console.log(`Mapping region: ${apiRegion}`);
    
    // Map region names based on NCAA API or our mock data structure
    if (apiRegion === "South") return "south";
    if (apiRegion === "North" || apiRegion === "East") return "east";
    if (apiRegion === "West") return "west";
    if (apiRegion === "Southwest" || apiRegion === "Midwest") return "midwest";
    if (apiRegion === "Final Four") return "finalFour";
    
    // If no match, try lowercase
    const lowerApiRegion = apiRegion.toLowerCase();
    if (lowerApiRegion === "south") return "south";
    if (lowerApiRegion === "north" || lowerApiRegion === "east") return "east";
    if (lowerApiRegion === "west") return "west";
    if (lowerApiRegion === "southwest" || lowerApiRegion === "midwest") return "midwest";
    if (lowerApiRegion === "final four") return "finalFour";
    
    // Default fallback
    console.log(`Unknown region: ${apiRegion}, defaulting to east`);
    return "east";
  };

  // Convert Game[] to BracketData format
  const convertGamesToBracketData = (games: Game[]): BracketData => {
    console.log(`Converting ${games.length} games to bracket data`);
    
    // Create a new bracket data object
    const newBracketData: BracketData = {
      east: { rounds: [] },
      west: { rounds: [] },
      south: { rounds: [] },
      midwest: { rounds: [] },
      finalFour: { rounds: [] }
    };

    if (games.length === 0) {
      console.log("No games to convert");
      return newBracketData;
    }

    try {
      // Separate Final Four games
      const finalFourGames = games.filter(game => 
        game.region === "Final Four" || 
        (game.round && (
          game.round.includes("Final Four") || 
          game.round.includes("Championship") ||
          game.round.includes("Semifinal")
        ))
      );
      
      console.log(`Found ${finalFourGames.length} Final Four games`);
      
      // Regular region games
      const regionGames = games.filter(game => 
        game.region !== "Final Four" && 
        (!game.round || (
          !game.round.includes("Final Four") && 
          !game.round.includes("Championship") &&
          !game.round.includes("Semifinal")
        ))
      );
      
      console.log(`Found ${regionGames.length} regional games`);

      // Group regional games by region and round
      const gamesByRegionAndRound = new Map<string, Map<number, Game[]>>();
      
      // Process region games
      regionGames.forEach(game => {
        if (!game.region) {
          console.log("Game missing region:", game);
          return;
        }
        
        // Map the region name to our expected format
        const mappedRegion = mapRegionName(game.region);
        
        // Determine round index based on round name
        let roundIndex = 0;
        if (!game.round) {
          console.log("Game missing round:", game);
        } else if (game.round.includes("First")) {
          roundIndex = 0;
        } else if (game.round.includes("Second") || game.round.includes("32")) {
          roundIndex = 1;
        } else if (game.round.includes("Sweet") || game.round.includes("16")) {
          roundIndex = 2;
        } else if (game.round.includes("Elite") || game.round.includes("Eight")) {
          roundIndex = 3;
        } else {
          console.log(`Unknown round: ${game.round}, defaulting to round 0`);
        }
        
        // Ensure the round array exists
        if (!newBracketData[mappedRegion].rounds[roundIndex]) {
          newBracketData[mappedRegion].rounds[roundIndex] = [];
        }
        
        // Add the game to the appropriate round
        newBracketData[mappedRegion].rounds[roundIndex].push({
          homeTeam: game.homeTeam,
          awayTeam: game.awayTeam,
          homeScore: game.homeScore,
          awayScore: game.awayScore,
          venue: game.venue,
          location: game.location
        });
      });
      
      // Process Final Four games
      finalFourGames.forEach(game => {
        // Determine round index for Final Four
        let roundIndex = 0;
        if (!game.round) {
          console.log("Final Four game missing round:", game);
        } else if (game.round.includes("Final Four") || game.round.includes("Semifinal")) {
          roundIndex = 0;
        } else if (game.round.includes("Championship")) {
          roundIndex = 1;
        } else {
          console.log(`Unknown Final Four round: ${game.round}, defaulting to semifinals`);
        }
        
        // Ensure the round array exists
        if (!newBracketData.finalFour.rounds[roundIndex]) {
          newBracketData.finalFour.rounds[roundIndex] = [];
        }
        
        // Add the game to the Final Four rounds
        newBracketData.finalFour.rounds[roundIndex].push({
          homeTeam: game.homeTeam,
          awayTeam: game.awayTeam,
          homeScore: game.homeScore,
          awayScore: game.awayScore,
          venue: game.venue,
          location: game.location
        });
      });
      
      // Create the champion entry if we have a completed championship game
      const championshipGame = finalFourGames.find(game => 
        game.round?.includes("Championship") && game.status === "Final"
      );
      
      if (championshipGame) {
        const winner = championshipGame.homeScore > championshipGame.awayScore
          ? championshipGame.homeTeam
          : championshipGame.awayTeam;
        
        // Add champion to round 2 of finalFour
        if (!newBracketData.finalFour.rounds[2]) {
          newBracketData.finalFour.rounds[2] = [];
        }
        
        newBracketData.finalFour.rounds[2].push({
          homeTeam: winner,
          awayTeam: "",
          homeScore: undefined,
          awayScore: undefined
        });
      }
      
      console.log("Converted bracket data:", 
        Object.keys(newBracketData).map(region => 
          `${region}: ${newBracketData[region as Region].rounds.length} rounds`
        )
      );
      
      return newBracketData;
    } catch (error) {
      console.error("Error converting games to bracket data:", error);
      return newBracketData;
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get both live and upcoming games
        const [liveGames, upcomingGames] = await Promise.allSettled([
          getLiveGames(),
          getUpcomingGames()
        ]);
        
        let combinedGames: Game[] = [];
        
        // Add live games if successful
        if (liveGames.status === 'fulfilled') {
          combinedGames = [...combinedGames, ...liveGames.value];
        } else {
          console.error("Error fetching live games:", liveGames.reason);
        }
        
        // Add upcoming games if successful
        if (upcomingGames.status === 'fulfilled') {
          combinedGames = [...combinedGames, ...upcomingGames.value];
        } else {
          console.error("Error fetching upcoming games:", upcomingGames.reason);
        }
        
        // If we have no games, set an error
        if (combinedGames.length === 0) {
          setError("No games available. Please try again later.");
          console.error("No games available");
        } else {
          console.log(`Successfully fetched ${combinedGames.length} games`);
          setGames(combinedGames);
          
          // Convert games to bracket data format and update state
          const convertedData = convertGamesToBracketData(combinedGames);
          setBracketData(convertedData);
        }
      } catch (error) {
        console.error("Error in fetchGames:", error);
        setError("Failed to load tournament data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();

    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchGames, 30000);
    return () => clearInterval(interval);
  }, []);

  return { games, bracketData, loading, error };
} 