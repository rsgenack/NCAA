// This file stores SVG data for team logos

export const teamSvgLogos: Record<string, string> = {
  Maryland: "/logos/university-of-maryland-4.svg",
  "Saint Mary's": "/logos/saint-marys-college-gaels.svg",
  Duke: "/logos/duke-blue-devils-1.svg",
  Marquette: "/logos/marquette-university-1.svg",
  Arizona: "/logos/arizona-wildcats.svg",
  "Mississippi State": "/logos/mississippi-state-bulldogs.svg",
  BYU: "/logos/brigham-young-cougars-74753.svg",
  Wisconsin: "/logos/wisconsin-badgers.svg",
  Oregon: "/logos/oregon-ducks-3.svg",
  Alabama: "/logos/alabama-crimson-tide.svg",
}

// Function to check if a team has an SVG logo
export function hasSvgLogo(teamName: string): boolean {
  return teamName in teamSvgLogos
}

// Function to get the SVG logo path
export function getSvgLogoPath(teamName: string): string | null {
  return teamSvgLogos[teamName] || null
}

