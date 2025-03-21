export type Region = "East" | "West" | "South" | "Midwest"
export type Round = "firstRound" | "secondRound" | "sweet16" | "elite8"

export interface Team {
  name: string
  seed: number
}

export interface BracketData {
  East: Record<Round, Team[][]>
  West: Record<Round, Team[][]>
  South: Record<Round, Team[][]>
  Midwest: Record<Round, Team[][]>
  finalFour: {
    semifinals: Team[][]
    championship: Team[] | [Team, Team]
    champion: Team | null
  }
}

export function initialBracketData(): BracketData {
  return {
    South: {
      firstRound: [
        [
          { name: "Auburn", seed: 1 },
          { name: "Alabama State", seed: 16 },
        ],
        [
          { name: "Louisville", seed: 8 },
          { name: "Creighton", seed: 9 },
        ],
        [
          { name: "Michigan", seed: 5 },
          { name: "UC San Diego", seed: 12 },
        ],
        [
          { name: "Texas A&M", seed: 4 },
          { name: "Yale", seed: 13 },
        ],
        [
          { name: "Ole Miss", seed: 6 },
          { name: "North Carolina", seed: 11 },
        ],
        [
          { name: "Iowa State", seed: 3 },
          { name: "Lipscomb", seed: 14 },
        ],
        [
          { name: "Marquette", seed: 7 },
          { name: "New Mexico", seed: 10 },
        ],
        [
          { name: "Michigan State", seed: 2 },
          { name: "Bryant", seed: 15 },
        ],
      ],
      secondRound: [],
      sweet16: [],
      elite8: [],
    },
    East: {
      firstRound: [
        [
          { name: "Duke", seed: 1 },
          { name: "Mount St. Mary's", seed: 16 },
        ],
        [
          { name: "Mississippi State", seed: 8 },
          { name: "Baylor", seed: 9 },
        ],
        [
          { name: "Oregon", seed: 5 },
          { name: "Liberty", seed: 12 },
        ],
        [
          { name: "Arizona", seed: 4 },
          { name: "Akron", seed: 13 },
        ],
        [
          { name: "BYU", seed: 6 },
          { name: "VCU", seed: 11 },
        ],
        [
          { name: "Wisconsin", seed: 3 },
          { name: "Montana", seed: 14 },
        ],
        [
          { name: "Saint Mary's", seed: 7 },
          { name: "Vanderbilt", seed: 10 },
        ],
        [
          { name: "Alabama", seed: 2 },
          { name: "Robert Morris", seed: 15 },
        ],
      ],
      secondRound: [],
      sweet16: [],
      elite8: [],
    },
    Midwest: {
      firstRound: [
        [
          { name: "Houston", seed: 1 },
          { name: "SIU-Edwardsville", seed: 16 },
        ],
        [
          { name: "Gonzaga", seed: 8 },
          { name: "Georgia", seed: 9 },
        ],
        [
          { name: "Clemson", seed: 5 },
          { name: "McNeese", seed: 12 },
        ],
        [
          { name: "Purdue", seed: 4 },
          { name: "High Point", seed: 13 },
        ],
        [
          { name: "Illinois", seed: 6 },
          { name: "Xavier", seed: 11 },
        ],
        [
          { name: "Kentucky", seed: 3 },
          { name: "Troy", seed: 14 },
        ],
        [
          { name: "UCLA", seed: 7 },
          { name: "Utah State", seed: 10 },
        ],
        [
          { name: "Tennessee", seed: 2 },
          { name: "Wofford", seed: 15 },
        ],
      ],
      secondRound: [],
      sweet16: [],
      elite8: [],
    },
    West: {
      firstRound: [
        [
          { name: "Florida", seed: 1 },
          { name: "Norfolk State", seed: 16 },
        ],
        [
          { name: "UConn", seed: 8 },
          { name: "Oklahoma", seed: 9 },
        ],
        [
          { name: "Memphis", seed: 5 },
          { name: "Colorado State", seed: 12 },
        ],
        [
          { name: "Maryland", seed: 4 },
          { name: "Grand Canyon", seed: 13 },
        ],
        [
          { name: "Missouri", seed: 6 },
          { name: "Drake", seed: 11 },
        ],
        [
          { name: "Texas Tech", seed: 3 },
          { name: "UNC Wilmington", seed: 14 },
        ],
        [
          { name: "Kansas", seed: 7 },
          { name: "Arkansas", seed: 10 },
        ],
        [
          { name: "St. John's", seed: 2 },
          { name: "Omaha", seed: 15 },
        ],
      ],
      secondRound: [],
      sweet16: [],
      elite8: [],
    },
    finalFour: {
      semifinals: [],
      championship: [
        { name: "", seed: 0 },
        { name: "", seed: 0 },
      ],
      champion: null,
    },
  }
}

