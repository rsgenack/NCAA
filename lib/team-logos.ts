import { getTeamInfo } from "./team-data"
import { hasSvgLogo, getSvgLogoPath } from "./team-svg-logos"

export function getTeamLogoUrl(teamName: string): string {
  // If no team name, return empty placeholder
  if (!teamName) {
    return `/placeholder.svg?height=60&width=60`
  }

  // Check if we have an SVG logo for this team
  if (hasSvgLogo(teamName)) {
    const logoPath = getSvgLogoPath(teamName)
    if (logoPath) {
      return logoPath
    }
  }

  // Map of team names to their website URLs
  const teamWebsites: Record<string, string> = {
    Auburn: "https://www.auburn.edu/",
    "Alabama State": "https://www.alasu.edu/",
    Louisville: "https://louisville.edu/",
    Creighton: "https://www.creighton.edu/",
    Michigan: "https://umich.edu/",
    "UC San Diego": "https://ucsd.edu/",
    "Texas A&M": "https://www.tamu.edu/",
    Yale: "https://www.yale.edu/",
    "Ole Miss": "https://olemiss.edu/",
    "North Carolina": "https://www.unc.edu/",
    "Iowa State": "https://www.iastate.edu/",
    Lipscomb: "https://www.lipscomb.edu/",
    Marquette: "https://www.marquette.edu/",
    "New Mexico": "https://www.unm.edu/",
    "Michigan State": "https://msu.edu/",
    Bryant: "https://www.bryant.edu/",
    Duke: "https://www.duke.edu/",
    "Mount St. Mary's": "https://msmary.edu/",
    "Mississippi State": "https://www.msstate.edu/",
    Baylor: "https://www.baylor.edu/",
    Oregon: "https://www.uoregon.edu/",
    Liberty: "https://www.liberty.edu/",
    Arizona: "https://www.arizona.edu/",
    Akron: "https://www.uakron.edu/",
    BYU: "https://www.byu.edu/",
    VCU: "https://www.vcu.edu/",
    Wisconsin: "https://www.wisc.edu/",
    Montana: "https://www.umt.edu/",
    "Saint Mary's": "https://www.stmarys-ca.edu/",
    Vanderbilt: "https://www.vanderbilt.edu/",
    Alabama: "https://www.ua.edu/",
    "Robert Morris": "https://www.rmu.edu/",
    Houston: "https://www.uh.edu/",
    "SIU-Edwardsville": "https://www.siue.edu/",
    Gonzaga: "https://www.gonzaga.edu/",
    Georgia: "https://www.uga.edu/",
    Clemson: "https://www.clemson.edu/",
    McNeese: "https://www.mcneese.edu/",
    Purdue: "https://www.purdue.edu/",
    "High Point": "https://www.highpoint.edu/",
    Illinois: "https://illinois.edu/",
    Xavier: "https://www.xavier.edu/",
    Kentucky: "https://www.uky.edu/",
    Troy: "https://www.troy.edu/",
    UCLA: "https://www.ucla.edu/",
    "Utah State": "https://www.usu.edu/",
    Tennessee: "https://www.utk.edu/",
    Wofford: "https://www.wofford.edu/",
    Florida: "https://www.ufl.edu/",
    "Norfolk State": "https://www.nsu.edu/",
    UConn: "https://uconn.edu/",
    Oklahoma: "https://www.ou.edu/",
    Memphis: "https://www.memphis.edu/",
    "Colorado State": "https://www.colostate.edu/",
    Maryland: "https://www.umd.edu/",
    "Grand Canyon": "https://www.gcu.edu/",
    Missouri: "https://missouri.edu/",
    Drake: "https://www.drake.edu/",
    "Texas Tech": "https://www.ttu.edu/",
    "UNC Wilmington": "https://uncw.edu/",
    Kansas: "https://www.ku.edu/",
    Arkansas: "https://www.uark.edu/",
    "St. John's": "https://www.stjohns.edu/",
    Omaha: "https://www.unomaha.edu/",
  }

  // Get the website URL for the team
  const websiteUrl = teamWebsites[teamName]

  if (websiteUrl) {
    // Try to get a higher quality logo from Google's favicon service
    return `https://www.google.com/s2/favicons?domain=${new URL(websiteUrl).hostname}&sz=128`
  }

  // Fallback to the generated logo if website not found
  const teamInfo = getTeamInfo(teamName)
  const svg = `
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="4" fill="${teamInfo.primaryColor}" />
      <rect x="2" y="2" width="56" height="56" rx="2" fill="${teamInfo.secondaryColor}" stroke="${teamInfo.primaryColor}" stroke-width="2" />
      <text x="30" y="36" font-family="Arial" font-size="18" font-weight="bold" fill="${teamInfo.textColor}" text-anchor="middle">${teamInfo.abbreviation}</text>
    </svg>
  `

  // Convert SVG to data URL
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

