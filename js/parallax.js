
/**
 * Applies the Parallax effect to the hero elements.
 * The text moves down faster (0.8), simulating being closer.
 * The player moves slightly slower than the background (0.25 vs 0.2),
 * which helps create a sense of depth.
 */
function applyParallaxEffect() {
  // We only need to calculate window.scrollY once per frame
  let scrollY = window.scrollY;

  // We obtain all necessary elements
  let bg = document.querySelector(".stadium-layer img");
  let text = document.querySelector(".parallax-text");
  let playerLayer = document.querySelector(".player-layer");

  // Verify if all elements exist before attempting to manipulate them
  if (!bg || !text || !playerLayer) {
    return;
  }

  //Parallax logic

  // 1. background (Stadium): Moves slower to simulate distance (background effect).
  // Multiplier: 0.2
  bg.style.transform = `translateY(${scrollY * 0.2}px)`;

  // 2. Text (Matches): Moves faster (simulating foreground) and uses its original X transform. Multiplier: 0.8
  // Use translate3d to promote hardware acceleration
  text.style.transform = `translateX(-50%) translate3d(0, ${scrollY * 0.8}px, 0)`;

  //3. Player Layer (Mbappe): Moves at an intermediate speed (0.25)
  // Stays in the "foreground" visually thanks to z-index in CSS.
  playerLayer.style.transform = `translateX(-50%) translate3d(0, ${scrollY * 0.25}px, 0)`;
}

// Listen for the scroll event and apply the effect
window.addEventListener("scroll", applyParallaxEffect);


// Call once when the page loads to apply the initial position if there's prior scroll
document.addEventListener("DOMContentLoaded", applyParallaxEffect);