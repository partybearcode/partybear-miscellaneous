const STORAGE_KEY = "partybear_matches_v1";

// MatchManager class
class MatchManager {

  // Constructor of the class
  constructor() {
    this.matches = [];
    this.editIndex = null;
    this.cacheDom();
    this.bindEvents();
    this.loadFromStorage();
    this.renderList();
    this.updateYear();
  }

  // Stores key DOM elements in properties to avoid repeated lookups.
  cacheDom() {
    this.formElement = document.getElementById("match-form");
    this.inputTeamHome = document.getElementById("team-home");
    this.inputTeamAway = document.getElementById("team-away");
    this.inputMatchDate = document.getElementById("match-date");
    this.inputCompetition = document.getElementById("competition");
    this.inputMatchResult = document.getElementById("match-result");
    this.inputImageUrl = document.getElementById("image-url");
    this.saveButton = document.getElementById("save-btn");
    this.cancelButton = document.getElementById("cancel-btn");
    this.errorsBox = document.getElementById("form-errors");
    this.matchesList = document.getElementById("matches-list");
    this.yearSpan = document.getElementById("current-year-manage");
  }

  // Attaches click events to the Save and Cancel buttons.
  bindEvents() {
    this.saveButton.addEventListener("click", () => this.handleSave());
    this.cancelButton.addEventListener("click", () => this.clearForm());
  }

  // Loads match data from localStorage.
  // If no data exists, it seeds example matches and stores them.
  loadFromStorage() {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Default list of seeded example matches
      this.matches = [
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
      this.saveToStorage();
    } else {
      try {
        this.matches = JSON.parse(raw) || [];
      } catch (e) {
        console.error("manage-matches: invalid JSON", e);
        this.matches = [];
      }
    }
  }
  // Saves the current match list into localStorage.
  saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.matches));
  }

  // Validates the form inputs and returns an array of error messages.
  validateForm() {
    let errors = [];
    let teamHome = this.inputTeamHome.value.trim();
    let teamAway = this.inputTeamAway.value.trim();
    let matchDate = this.inputMatchDate.value;
    let competition = this.inputCompetition.value.trim();
    let matchResult = (this.inputMatchResult && this.inputMatchResult.value.trim()) || "";

    // Required fields (four controls): teamHome, teamAway, matchDate, competition
    if (!teamHome) errors.push("El equipo local es obligatorio.");
    if (!teamAway) errors.push("El equipo visitante es obligatorio.");
    if (!matchDate) errors.push("La fecha y hora son obligatorias.");
    if (!competition) errors.push("La competición es obligatoria.");

    // Teams must be different
    if (teamHome && teamAway && teamHome.toLowerCase() === teamAway.toLowerCase()) {
      errors.push("El equipo local y el visitante deben ser distintos.");
    }

    // Validate date format (if present)
    let dateValue = null;
    if (matchDate) {
      dateValue = new Date(matchDate);
      if (isNaN(dateValue.getTime())) {
        errors.push("Formato de fecha inválido.");
      }
    }

    // Rule about dates:
    // - Dates are allowed to be in the past.
    // - But if the date is in the past (match already happened), then result is required.
    if (dateValue && !isNaN(dateValue.getTime())) {
      let now = new Date();
      // consider match in past if strictly before now (allow same minute as future)
      if (dateValue.getTime() < now.getTime()) {
        // If match is in the past, result is required
        if (!matchResult) {
          errors.push("Si la fecha está en el pasado, debe indicar el resultado del partido.");
        }
      }
    }

    return errors;
  }

  // Handles saving either a new match or an edited one.
  handleSave() {
    this.errorsBox.textContent = "";
    let errors = this.validateForm();
    if (errors.length) {
      this.showErrors(errors);
      return;
    }

    let newMatch = {
      teamHome: this.inputTeamHome.value.trim(),
      teamAway: this.inputTeamAway.value.trim(),
      matchDate: this.inputMatchDate.value,
      competition: this.inputCompetition.value.trim(),
      result: (this.inputMatchResult && this.inputMatchResult.value.trim()) || "",
      imageUrl: this.inputImageUrl.value.trim() || this.generatePlaceholder()
    };

    //Add or update
    if (this.editIndex === null) {
      // Create
      this.matches.push(newMatch);
    } else {
      // Update
      this.matches[this.editIndex] = newMatch;
      this.editIndex = null;
    }

    this.saveToStorage();
    this.renderList();
    this.clearForm();
  }

  // Displays validation errors in the UI.
  showErrors(errors) {
    this.errorsBox.innerHTML = errors.map(e => `<div>• ${this.escapeHtml(e)}</div>`).join("");
  }

  // Generates the visual list of match cards.
  renderList() {
    this.matchesList.innerHTML = "";
    if (!this.matches.length) {
      this.matchesList.innerHTML = "<p>No hay partidos. Añade uno con el formulario.</p>";
      return;
    }

    this.matches.forEach((match, index) => {
      let card = document.createElement("div");
      card.className = "match-card";
      card.innerHTML = `
        <div class="match-thumb"><img src="${this.escapeHtml(match.imageUrl)}" alt="${this.escapeHtml(match.teamHome)} vs ${this.escapeHtml(match.teamAway)}"></div>
        <div class="match-meta">
          <h4>${this.escapeHtml(match.teamHome)} <span style="color:#94a3b8">vs</span> ${this.escapeHtml(match.teamAway)}</h4>
          <p>${this.formatDate(match.matchDate)} • ${this.escapeHtml(match.competition)}</p>
          ${match.result ? `<p><strong>Resultado:</strong> ${this.escapeHtml(match.result)}</p>` : ""}
        </div>
        <div class="match-actions">
          <button class="icon-btn edit" data-index="${index}" title="Editar" aria-label="Editar">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="icon-btn delete" data-index="${index}" title="Eliminar" aria-label="Eliminar">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;

      // listeners
      let editBtn = card.querySelector(".icon-btn.edit");
      let deleteBtn = card.querySelector(".icon-btn.delete");
      editBtn.addEventListener("click", () => this.startEdit(index));
      deleteBtn.addEventListener("click", () => this.deleteMatch(index));

      this.matchesList.appendChild(card);
    });
  }

  // Loads a match into the form so it can be edited.
  startEdit(index) {
    let match = this.matches[index];
    this.inputTeamHome.value = match.teamHome || "";
    this.inputTeamAway.value = match.teamAway || "";
    this.inputMatchDate.value = match.matchDate || "";
    this.inputCompetition.value = match.competition || "";
    if (this.inputMatchResult) this.inputMatchResult.value = match.result || "";
    this.inputImageUrl.value = match.imageUrl || "";
    this.editIndex = index;
    this.inputTeamHome.focus();
    this.formElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Deletes a match after confirmation.
  deleteMatch(index) {
    let accepted = confirm("¿Eliminar este partido?");
    if (!accepted) return;
    this.matches.splice(index, 1);
    this.saveToStorage();
    this.renderList();
  }

  // Clears the form and resets editing state.
  clearForm() {
    this.formElement.reset();
    this.editIndex = null;
    this.errorsBox.textContent = "";
  }

  // Generates a fallback placeholder image.
  generatePlaceholder() {
    let seed = Math.floor(Math.random() * 1000) + 300;
    return `https://picsum.photos/400/200?random=${seed}`;
  }

  // Formats an ISO date string into a human-readable dd/mm/yyyy hh:mm format.
  formatDate(dateIso) {
    if (!dateIso) return "";
    let d = new Date(dateIso);
    if (isNaN(d.getTime())) return this.escapeHtml(dateIso);
    let day = String(d.getDate()).padStart(2, "0");
    let month = String(d.getMonth() + 1).padStart(2, "0");
    let year = d.getFullYear();
    let hours = String(d.getHours()).padStart(2, "0");
    let minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  // Escapes HTML to prevent accidental injection in user-provided fields.
  escapeHtml(unsafe) {
    if (!unsafe) return "";
    return String(unsafe)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Updates the footer copyright year.
  updateYear() {
    if (this.yearSpan) this.yearSpan.textContent = new Date().getFullYear();
  }
}

// Instantiates MatchManager once the DOM has finished loading.
document.addEventListener("DOMContentLoaded", () => {
  new MatchManager();
});
