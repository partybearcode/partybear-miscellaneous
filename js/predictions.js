// MatchPrediction class manages a single match card prediction
class MatchPrediction {
  // here i put the constructor to initialize the atributes with the card element
  constructor(cardElement) {
    this.cardElement = cardElement;
    this.teamOne = cardElement.dataset.team1;
    this.teamTwo = cardElement.dataset.team2;
    this.resultElement = cardElement.querySelector(".result");
    this.initEvents();
  }

  // initialize click event for the predict button
  initEvents() {
    const PREDICT_BUTTON = this.cardElement.querySelector(".predict-btn");
    PREDICT_BUTTON.addEventListener("click", () => this.generatePrediction());
  }

  // this method generates a random prediction and display it
  generatePrediction() {
    const SCORE_A = this.randomScoreInclusive(0, 4);
    const SCORE_B = this.randomScoreInclusive(0, 4);

    // here i generate a string variable that changes depending on the scores generated with the random numbers
    let outcomeText = "";
    if (SCORE_A > SCORE_B) {
      outcomeText = `${this.teamOne} gana ${SCORE_A}-${SCORE_B}`;
    } else if (SCORE_B > SCORE_A) {
      outcomeText = `${this.teamTwo} gana ${SCORE_B}-${SCORE_A}`;
    } else {
      outcomeText = `Empate ${SCORE_A}-${SCORE_B}`;
    }

    this.showResult(`Predicción: ${outcomeText}`);
  }

  // this method returns random integer between min and max (inclusive)
  randomScoreInclusive(min, max) {
    const RANGE = max - min + 1;
    return Math.floor(Math.random() * RANGE) + min;
  }

  // here i display result with a brief highlight animation
  showResult(text) {
    this.resultElement.textContent = text;
    this.resultElement.classList.add("result-visible");
    // remove the highlight after animation (1.2s)
    setTimeout(() => this.resultElement.classList.remove("result-visible"), 1200);
  }
}

// here i initialize all match prediction cards when DOM (Document Object Model) is ready
document.addEventListener("DOMContentLoaded", () => {
  const MATCH_CARDS = document.querySelectorAll(".match-card");
  MATCH_CARDS.forEach(card => new MatchPrediction(card));
});
