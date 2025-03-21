// This file stores SVG data for team logos

export const teamSvgLogos: Record<string, string> = {
  Maryland: "/logos/university-of-maryland-4.svg",
  "Saint Mary's": "/logos/Saint_Mary's_College_Gaels_logo.svg",
  Duke: "/logos/duke-blue-devils-1.svg",
  Marquette: "/logos/marquette-university-1.svg",
  Arizona: "/logos/arizona-wildcats.svg",
  "Mississippi State": "/logos/mississippi-state-bulldogs.svg",
  BYU: "/logos/brigham-young-cougars-74753.svg",
  Wisconsin: "/logos/wisconsin-badgers.svg",
  Oregon: "/logos/oregon-ducks-3.svg",
  Alabama: "/logos/alabama-crimson-tide.svg",
  Auburn: "/logos/auburn-tigers.svg",
  "Alabama State": "/logos/alabama-state-hornets-1.svg",
  Louisville: "/logos/louisville-cardinals-7.svg",
  Michigan: "/logos/michigan-wolverines-2.svg",
  "UC San Diego": "/logos/uc-san-diego-tritons@logotyp.us.svg",
  "St. John's": "/logos/st-johns-university.svg",
  Yale: "/logos/yale-bulldogs-1.svg",
  "Ole Miss": "/logos/ole-miss-rebels.svg",
  "North Carolina": "/logos/north-carolina-tar-heels@logotyp.us.svg",
  "Iowa State": "/logos/iowa-state-cyclones.svg",
  Lipscomb: "/logos/lipscomb.png",
  "New Mexico": "/logos/new-mexico-state-aggies.svg",
  "Michigan State": "/logos/michigan-state-university.svg",
  Bryant: "/logos/Bryant_Bulldogs_logo.svg",
  "Mount St. Mary's": "/logos/Mount_Saint_Mary's_M.png",
  Baylor: "/logos/baylor-bears-7.svg",
  Liberty: "/logos/Liberty_flames_text_logo.svg",
  Akron: "/logos/akron-zips-76032.svg",
  VCU: "/logos/VCU_Rams_logo.svg",
  Montana: "/logos/Montana_Griz_logo.svg",
  Vanderbilt: "/logos/vanderbilt-commodores-2.svg",
  "Robert Morris": "/logos/robert-morris-colonials@logotyp.us.svg",
  Florida: "/logos/florida-gators-2.svg",
  "Norfolk State": "/logos/norfolk-state-spartans@logotyp.us.svg",
  UConn: "/logos/connecticut-huskies-2.svg",
  Oklahoma: "/logos/oklahoma-sooners@logotyp.us.svg",
  Memphis: "/logos/memphis-tigers.svg",
  "Colorado State": "/logos/colorado-state-rams@logotyp.us.svg",
  "Grand Canyon": "/logos/grand-canyon-antelopes@logotyp.us.svg",
  Missouri: "/logos/missouri-tigers-1.svg",
  Drake: "/logos/drake-bulldogs@logotyp.us.svg",
  "Texas Tech": "/logos/texas-tech-red-raiders-1.svg",
  "UNC Wilmington": "/logos/unc-wilmington-seahawks@logotyp.us.svg",
  Kansas: "/logos/kansas-jayhawks-1.svg",
  Arkansas: "/logos/arkansas-razorbacks.svg",
  Omaha: "/logos/omaha-mavericks.svg",
  Houston: "/logos/Houston_Cougars_primary_logo.svg",
  "SIU-Edwardsville": "/logos/SIUE_Cougars_logo.svg",
  Gonzaga: "/logos/gonzaga.png",
  Georgia: "/logos/georgia-bulldogs-6.svg",
  Clemson: "/logos/clemson-tigers.svg",
  McNeese: "/logos/McNeese_Athletics_logo.svg",
  Purdue: "/logos/purdue-university-boilermakers-5.svg",
  "High Point": "/logos/high-point-panthers.svg",
  Illinois: "/logos/university-of-illinois-1.svg",
  Xavier: "/logos/xavier-athletics.svg",
  Kentucky: "/logos/kentucky-wildcats-3.svg",
  Troy: "/logos/Troy_Trojans_logo.svg",
  UCLA: "/logos/UCLA_Bruins_script.svg",
  "Utah State": "/logos/Utah_State_Aggies_logo.svg",
  Tennessee: "/logos/tennessee-vols-4.svg",
  Wofford: "/logos/wofford-terriers@logotyp.us.svg",
  "Texas A&M": "/logos/texas-a-m-aggies-1.svg",
}

// Function to check if a team has an SVG logo
export function hasSvgLogo(teamName: string): boolean {
  return teamName in teamSvgLogos
}

// Function to get the SVG logo path
export function getSvgLogoPath(teamName: string): string | null {
  return teamSvgLogos[teamName] || null
}

