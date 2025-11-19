// Select elements
const MENU_TOGGLE = document.getElementById("menu-toggle");
const NAV_MENU = document.getElementById("navigation-menu");
// Select the new Overlay element
const MENU_OVERLAY = document.getElementById("menu-overlay");

// Function to toggle the menu
function toggleMenu() {
  const IS_EXPANDED = MENU_TOGGLE.getAttribute("aria-expanded") === "true";

  if (IS_EXPANDED) {
    // Close the menu
    NAV_MENU.classList.remove("active");
    MENU_OVERLAY.classList.remove("active"); // Hide the overlay
    MENU_TOGGLE.setAttribute("aria-expanded", "false");
    NAV_MENU.setAttribute("aria-hidden", "true");
    MENU_OVERLAY.setAttribute("aria-hidden", "true");
    // Enable body scroll
    document.body.style.overflow = "auto";
  } else {
    // Open the menu
    NAV_MENU.classList.add("active");
    MENU_OVERLAY.classList.add("active"); // Show the overlay
    MENU_TOGGLE.setAttribute("aria-expanded", "true");
    NAV_MENU.setAttribute("aria-hidden", "false");
    MENU_OVERLAY.setAttribute("aria-hidden", "false");
    // Prevent body scroll when the menu is open
    document.body.style.overflow = "hidden";
  }
}

// Click event on the toggle button (hamburger)
MENU_TOGGLE.addEventListener("click", toggleMenu);

// Click event on the overlay to close the menu
MENU_OVERLAY.addEventListener("click", toggleMenu);

// Close the menu if a link is clicked
NAV_MENU.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', toggleMenu);
});