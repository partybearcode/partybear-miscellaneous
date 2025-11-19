/* Quick note from partybear here: i tried to make this secure by escaping HTML inputs
and avoiding XSS vulnerabilities. I also tried to do here something new by implementing JSDoc
because i already learnt in programming class about JavaDoc 
so i tried my best here to innovate and make really cool details :) */

const STORAGE_KEY_PRIMARY = "partybear_matches_v1";
const STORAGE_KEY_LEGACY = "matches";

/**
 * Safe escape to avoid XSS (Cross site scripting) in simple contexts
 * @param {string} unsafe
 * @returns {string}
 */
function escapeHtml(unsafe) {
  if (!unsafe && unsafe !== 0) return "";
  return String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Format ISO (standard) date/time to dd/mm/yyyy hh:mm
 * If input is only date (yyyy-mm-dd) it will render dd/mm/yyyy
 */
function formatDateIso(dateIso) {
  if (!dateIso) return "";
  let d = new Date(dateIso);
  if (isNaN(d.getTime())) {
    // try fallback for plain yyyy-mm-dd
    let parts = String(dateIso).split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return escapeHtml(dateIso);
  }
  let day = String(d.getDate()).padStart(2, "0");
  let month = String(d.getMonth() + 1).padStart(2, "0");
  let year = d.getFullYear();
  let hours = String(d.getHours()).padStart(2, "0");
  let minutes = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Try to load matches from storage.
 * Tries primary key first, then legacy key.
 * Returns array (possibly empty).
 */
function loadMatchesFromStorage() {
  let raw = localStorage.getItem(STORAGE_KEY_PRIMARY);
  if (!raw) raw = localStorage.getItem(STORAGE_KEY_LEGACY);
  if (!raw) return [];
  try {
    let parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    console.error("matches-read: invalid JSON in storage", e);
    return [];
  }
}

/**
 * Normalize a match object so code can read consistent properties.
 * Accepts different shapes: { teamHome, teamAway } or { team1, team2 } etc.
 */
function normalizeMatch(raw) {
  let m = raw || {};
  return {
    teamHome: m.teamHome || m.team1 || m.home || m.homeTeam || "",
    teamAway: m.teamAway || m.team2 || m.away || m.awayTeam || "",
    matchDate: m.matchDate || m.date || m.datetime || "",
    competition: m.competition || m.competitionName || m.competition_name || "",
    result: m.result || m.score || m.matchResult || "",
    imageUrl: m.imageUrl || m.image || m.img || ""
  };
}

/**
 * If there are no matches, seed small demo data so the read page shows something.
 */
function ensureSeedData(matches) {
  if (matches.length) return matches;
  let demo = [
    {
      teamHome: "Real Madrid",
      teamAway: "Barcelona",
      matchDate: "2025-10-26T20:00",
      competition: "Champions League",
      result: "2-1",
      imageUrl: "img/madrid-barcelona.webp"
    },
    {
      teamHome: "Atletico Madrid",
      teamAway: "Sevilla",
      matchDate: "2025-10-27T18:30",
      competition: "LaLiga",
      result: "3-0",
      imageUrl: "img/atleti-sevilla.jpg"
    },
    {
      teamHome: "Manchester City",
      teamAway: "Bayern Munich",
      matchDate: "2025-10-28T19:00",
      competition: "Champions League",
      result: "1-1",
      imageUrl: "img/city-bayern.jpg"
    },
    {
      teamHome: "Liverpool",
      teamAway: "Arsenal",
      matchDate: "2025-10-29T20:15",
      competition: "Premier League",
      result: "2-2",
      imageUrl: "img/liverpool-arsenal.jpg"
    },
    {
      teamHome: "Juventus",
      teamAway: "Inter",
      matchDate: "2025-10-30T20:45",
      competition: "Serie A",
      result: "1-2",
      imageUrl: "img/juve-inter.webp"
    },
    {
      teamHome: "AC Milan",
      teamAway: "Napoli",
      matchDate: "2025-10-31T18:00",
      competition: "Serie A",
      result: "3-1",
      imageUrl: "img/milan-napoli.webp"
    },
    {
      teamHome: "PSG",
      teamAway: "Lyon",
      matchDate: "2025-11-01T20:00",
      competition: "Ligue 1",
      result: "4-0",
      imageUrl: "img/psg-lyon.webp"
    },
    {
      teamHome: "Marseille",
      teamAway: "Monaco",
      matchDate: "2025-11-02T19:00",
      competition: "Ligue 1",
      result: "2-2",
      imageUrl: "img/marseille-monaco.jpg"
    },
    {
      teamHome: "Borussia Dortmund",
      teamAway: "RB Leipzig",
      matchDate: "2025-11-03T18:30",
      competition: "Bundesliga",
      result: "1-0",
      imageUrl: "img/dortmund-leipzig.png"
    },
    {
      teamHome: "Schalke",
      teamAway: "Bayer Leverkusen",
      matchDate: "2025-11-04T20:30",
      competition: "Bundesliga",
      result: "0-3",
      imageUrl: "img/schalke-bayer.jpg"
    },
    {
      teamHome: "Chelsea",
      teamAway: "Tottenham",
      matchDate: "2025-11-05T17:30",
      competition: "Premier League",
      result: "2-1",
      imageUrl: "img/chelsea-tottenham.png"
    },
    {
      teamHome: "Everton",
      teamAway: "West Ham",
      matchDate: "2025-11-06T19:00",
      competition: "Premier League",
      result: "1-1",
      imageUrl: "img/everton-westham.jpg"
    },
    {
      teamHome: "Real Sociedad",
      teamAway: "Valencia",
      matchDate: "2025-11-07T21:00",
      competition: "LaLiga",
      result: "2-0",
      imageUrl: "img/realsociedad-valencia.jpg"
    },
    {
      teamHome: "Villarreal",
      teamAway: "Real Betis",
      matchDate: "2025-11-08T18:15",
      competition: "LaLiga",
      result: "1-1",
      imageUrl: "img/villareal-betis.jpg"
    },
    {
      teamHome: "Porto",
      teamAway: "Benfica",
      matchDate: "2025-11-09T20:30",
      competition: "Primeira Liga",
      result: "3-2",
      imageUrl: "img/porto-benfica.jpg"
    },
    {
      teamHome: "Sporting CP",
      teamAway: "Braga",
      matchDate: "2025-11-10T19:30",
      competition: "Primeira Liga",
      result: "2-1",
      imageUrl: "img/sportingcp-braga.jpg"
    },
    {
      teamHome: "Celta Vigo",
      teamAway: "Osasuna",
      matchDate: "2025-11-11T16:15",
      competition: "LaLiga",
      result: "0-0",
      imageUrl: "img/celta-osasuna.webp"
    },
    {
      teamHome: "Boca Juniors",
      teamAway: "River Plate",
      matchDate: "2025-11-12T21:00",
      competition: "Copa Libertadores",
      result: "1-1",
      imageUrl: "img/boca-river.jpg"
    },
    {
      teamHome: "Flamengo",
      teamAway: "Palmeiras",
      matchDate: "2025-11-13T19:30",
      competition: "Copa Libertadores",
      result: "2-3",
      imageUrl: "img/flamengo-palmeiras.webp"
    },
    {
      teamHome: "LA Galaxy",
      teamAway: "Seattle Sounders",
      matchDate: "2025-11-14T22:00",
      competition: "MLS",
      result: "2-1",
      imageUrl: "img/lagalaxy-seattle.jpg"
    },
    {
      teamHome: "New York City",
      teamAway: "Atlanta United",
      matchDate: "2025-11-15T20:30",
      competition: "MLS",
      result: "0-1",
      imageUrl: "img/newyork-atalantautd.jpg"
    },
    {
      teamHome: "Cork City",
      teamAway: "Shamrock Rovers",
      matchDate: "2025-11-16T19:45",
      competition: "League of Ireland",
      result: "1-2",
      imageUrl: "img/cork-shamrock.jpg"
    },
    {
      teamHome: "Ajax",
      teamAway: "Feyenoord",
      matchDate: "2025-11-17T20:00",
      competition: "Eredivisie",
      result: "3-1",
      imageUrl: "img/ajax-feyenoord.jpg"
    },
    {
      teamHome: "Celtic",
      teamAway: "Rangers",
      matchDate: "2025-11-18T12:30",
      competition: "Scottish Premiership",
      result: "2-0",
      imageUrl: "img/celtic-rangers.jpg"
    }
  ];
  // do not persist demo automatically, just return it for rendering
  /*So this means this is a demo AND IT WILL NOT GET SAVED TO LOCALSTORAGE, AND ITS FOR RENDERING PURPOSES ONLY 
  WHEN THE USER DOESN'T CLICK IN MANAGING PAGE FOR THE 1ST TIME. */
  return demo;
}

/**
 * Render the grid of matches into #matches-grid
 */
function renderMatchesGrid() {
  let rawMatches = loadMatchesFromStorage();
  // normalize each match
  let matches = rawMatches.map(normalizeMatch);

  // if no matches, use demo seed so UI is visible
  if (matches.length === 0) {
    matches = ensureSeedData(matches);
  }

  let container = document.getElementById("matches-grid");
  if (!container) {
    console.warn("matches-read: missing #matches-grid element");
    return;
  }

  container.innerHTML = "";

  if (!matches.length) {
    container.innerHTML = '<p>No hay partidos guardados. Ve a <a href="manage-matches.html">Gestionar partidos</a> para añadir.</p>';
    return;
  }

  matches.forEach((raw) => {
    let match = normalizeMatch(raw);
    let imageUrl = match.imageUrl && String(match.imageUrl).trim()
      ? escapeHtml(match.imageUrl)
      : `https://picsum.photos/400/200?random=${Math.floor(Math.random() * 1000)}`;

    let card = document.createElement("div");
    card.className = "match-card";

    card.innerHTML = `
      <div class="match-thumb">
        <img src="${imageUrl}" alt="${escapeHtml(match.teamHome)} vs ${escapeHtml(match.teamAway)}">
      </div>
      <div class="match-info">
        <h3>${escapeHtml(match.teamHome)} <span style="color:#94a3b8">vs</span> ${escapeHtml(match.teamAway)}</h3>
        <p>${formatDateIso(match.matchDate)} • ${escapeHtml(match.competition)}</p>
        ${match.result ? `<p><strong>Resultado:</strong> ${escapeHtml(match.result)}</p>` : `<p><em>Partido pendiente</em></p>`}
      </div>
    `;

    container.appendChild(card);
  });
}

function updateYearRead() {
  let span = document.getElementById("current-year-read");
  if (span) span.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderMatchesGrid();
  updateYearRead();
});


