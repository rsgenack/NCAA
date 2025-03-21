export interface TeamInfo {
  primaryColor: string
  secondaryColor: string
  textColor: string
  abbreviation: string
}

export const teamColors: Record<string, TeamInfo> = {
  // East Region
  Auburn: {
    primaryColor: "#0C2340",
    secondaryColor: "#E87722",
    textColor: "white",
    abbreviation: "AUB",
  },
  "Alabama State": {
    primaryColor: "#C99700",
    secondaryColor: "#000000",
    textColor: "white",
    abbreviation: "ALST",
  },
  Louisville: {
    primaryColor: "#AD0000",
    secondaryColor: "#000000",
    textColor: "white",
    abbreviation: "LOU",
  },
  "Mississippi State": {
    primaryColor: "#660000",
    secondaryColor: "#CCCCCC",
    textColor: "white",
    abbreviation: "MSST",
  },
  Michigan: {
    primaryColor: "#00274C",
    secondaryColor: "#FFCB05",
    textColor: "white",
    abbreviation: "MICH",
  },
  "UC San Diego": {
    primaryColor: "#182B49",
    secondaryColor: "#FFCD00",
    textColor: "white",
    abbreviation: "UCSD",
  },
  "St. John's": {
    primaryColor: "#BA0C2F",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "STJ",
  },
  Yale: {
    primaryColor: "#00356B",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "YALE",
  },
  "Ole Miss": {
    primaryColor: "#CE1126",
    secondaryColor: "#14213D",
    textColor: "white",
    abbreviation: "MISS",
  },
  "North Carolina": {
    primaryColor: "#7BAFD4",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "UNC",
  },
  "Iowa State": {
    primaryColor: "#C8102E",
    secondaryColor: "#F1BE48",
    textColor: "white",
    abbreviation: "ISU",
  },
  Lipscomb: {
    primaryColor: "#331E54",
    secondaryColor: "#F4AA00",
    textColor: "white",
    abbreviation: "LIP",
  },
  Marquette: {
    primaryColor: "#003366",
    secondaryColor: "#FFCC00",
    textColor: "white",
    abbreviation: "MARQ",
  },
  "New Mexico": {
    primaryColor: "#BA0C2F",
    secondaryColor: "#63666A",
    textColor: "white",
    abbreviation: "UNM",
  },
  "Michigan State": {
    primaryColor: "#18453B",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "MSU",
  },
  Bryant: {
    primaryColor: "#000000",
    secondaryColor: "#B5A268",
    textColor: "white",
    abbreviation: "BRY",
  },

  // West Region
  Duke: {
    primaryColor: "#012169",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "DUKE",
  },
  "Mount St. Mary's": {
    primaryColor: "#002D72",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "MSM",
  },
  Baylor: {
    primaryColor: "#003015",
    secondaryColor: "#FFB81C",
    textColor: "white",
    abbreviation: "BAY",
  },
  Oregon: {
    primaryColor: "#154733",
    secondaryColor: "#FEE123",
    textColor: "white",
    abbreviation: "ORE",
  },
  Liberty: {
    primaryColor: "#002D62",
    secondaryColor: "#A71930",
    textColor: "white",
    abbreviation: "LIB",
  },
  Arizona: {
    primaryColor: "#CC0033",
    secondaryColor: "#003366",
    textColor: "white",
    abbreviation: "ARIZ",
  },
  Akron: {
    primaryColor: "#041E42",
    secondaryColor: "#A89968",
    textColor: "white",
    abbreviation: "AKR",
  },
  BYU: {
    primaryColor: "#002E5D",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "BYU",
  },
  VCU: {
    primaryColor: "#000000",
    secondaryColor: "#F8B800",
    textColor: "white",
    abbreviation: "VCU",
  },
  Wisconsin: {
    primaryColor: "#C5050C",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "WIS",
  },
  Montana: {
    primaryColor: "#5E001D",
    secondaryColor: "#999999",
    textColor: "white",
    abbreviation: "MONT",
  },
  "Saint Mary's": {
    primaryColor: "#06315B",
    secondaryColor: "#D80024",
    textColor: "white",
    abbreviation: "SMC",
  },
  Vanderbilt: {
    primaryColor: "#000000",
    secondaryColor: "#866D4B",
    textColor: "white",
    abbreviation: "VAN",
  },
  Alabama: {
    primaryColor: "#9E1B32",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "BAMA",
  },
  "Robert Morris": {
    primaryColor: "#14234B",
    secondaryColor: "#A6192E",
    textColor: "white",
    abbreviation: "RMU",
  },

  // South Region
  Florida: {
    primaryColor: "#0021A5",
    secondaryColor: "#FA4616",
    textColor: "white",
    abbreviation: "FLA",
  },
  "Norfolk State": {
    primaryColor: "#046A38",
    secondaryColor: "#F3D03E",
    textColor: "white",
    abbreviation: "NSU",
  },
  UConn: {
    primaryColor: "#0C2340",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "CONN",
  },
  Oklahoma: {
    primaryColor: "#841617",
    secondaryColor: "#FDF9D8",
    textColor: "white",
    abbreviation: "OKLA",
  },
  Memphis: {
    primaryColor: "#003087",
    secondaryColor: "#898D8D",
    textColor: "white",
    abbreviation: "MEM",
  },
  "Colorado State": {
    primaryColor: "#1E4D2B",
    secondaryColor: "#C8C372",
    textColor: "white",
    abbreviation: "CSU",
  },
  Maryland: {
    primaryColor: "#E03a3e",
    secondaryColor: "#FFD520",
    textColor: "white",
    abbreviation: "UMD",
  },
  "Grand Canyon": {
    primaryColor: "#522398",
    secondaryColor: "#000000",
    textColor: "white",
    abbreviation: "GCU",
  },
  Missouri: {
    primaryColor: "#000000",
    secondaryColor: "#F1B82D",
    textColor: "white",
    abbreviation: "MIZZ",
  },
  Drake: {
    primaryColor: "#004477",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "DRKE",
  },
  "Texas Tech": {
    primaryColor: "#CC0000",
    secondaryColor: "#000000",
    textColor: "white",
    abbreviation: "TTU",
  },
  "UNC Wilmington": {
    primaryColor: "#006666",
    secondaryColor: "#FFCC00",
    textColor: "white",
    abbreviation: "UNCW",
  },
  Kansas: {
    primaryColor: "#0051BA",
    secondaryColor: "#E8000D",
    textColor: "white",
    abbreviation: "KU",
  },
  Arkansas: {
    primaryColor: "#9D2235",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "ARK",
  },
  Omaha: {
    primaryColor: "#000000",
    secondaryColor: "#D71920",
    textColor: "white",
    abbreviation: "OMA",
  },

  // Midwest Region
  Houston: {
    primaryColor: "#C8102E",
    secondaryColor: "#76232F",
    textColor: "white",
    abbreviation: "HOU",
  },
  "SIU-Edwardsville": {
    primaryColor: "#CC0000",
    secondaryColor: "#000000",
    textColor: "white",
    abbreviation: "SIUE",
  },
  Gonzaga: {
    primaryColor: "#002967",
    secondaryColor: "#C8102E",
    textColor: "white",
    abbreviation: "GONZ",
  },
  Georgia: {
    primaryColor: "#BA0C2F",
    secondaryColor: "#000000",
    textColor: "white",
    abbreviation: "UGA",
  },
  Clemson: {
    primaryColor: "#F56600",
    secondaryColor: "#522D80",
    textColor: "white",
    abbreviation: "CLEM",
  },
  McNeese: {
    primaryColor: "#00529B",
    secondaryColor: "#FFD204",
    textColor: "white",
    abbreviation: "MCN",
  },
  Purdue: {
    primaryColor: "#CEB888",
    secondaryColor: "#000000",
    textColor: "black",
    abbreviation: "PUR",
  },
  "High Point": {
    primaryColor: "#330072",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "HPU",
  },
  Illinois: {
    primaryColor: "#13294B",
    secondaryColor: "#E84A27",
    textColor: "white",
    abbreviation: "ILL",
  },
  Xavier: {
    primaryColor: "#0C2340",
    secondaryColor: "#9EA2A2",
    textColor: "white",
    abbreviation: "XAV",
  },
  Kentucky: {
    primaryColor: "#0033A0",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "UK",
  },
  Troy: {
    primaryColor: "#8A2432",
    secondaryColor: "#A3AAAE",
    textColor: "white",
    abbreviation: "TROY",
  },
  UCLA: {
    primaryColor: "#2D68C4",
    secondaryColor: "#F2A900",
    textColor: "white",
    abbreviation: "UCLA",
  },
  "Utah State": {
    primaryColor: "#00263A",
    secondaryColor: "#8A8D8F",
    textColor: "white",
    abbreviation: "USU",
  },
  Tennessee: {
    primaryColor: "#FF8200",
    secondaryColor: "#FFFFFF",
    textColor: "white",
    abbreviation: "TENN",
  },
  Wofford: {
    primaryColor: "#000000",
    secondaryColor: "#886E4C",
    textColor: "white",
    abbreviation: "WOF",
  },

  // Default for teams not in the list
  default: {
    primaryColor: "#718096",
    secondaryColor: "#E2E8F0",
    textColor: "white",
    abbreviation: "TBD",
  },
}

export function getTeamInfo(teamName: string): TeamInfo {
  return teamColors[teamName] || teamColors.default
}

