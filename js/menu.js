// Select elements
const MENU_TOGGLE = document.getElementById("menu-toggle");
const NAV_MENU = document.getElementById("navigation-menu");

// Add click event to toggle button
MENU_TOGGLE.addEventListener("click", () => {
  const IS_EXPANDED = MENU_TOGGLE.getAttribute("aria-expanded") === "true";

  if (IS_EXPANDED) {
    // Close the menu
    NAV_MENU.classList.remove("active");
    MENU_TOGGLE.setAttribute("aria-expanded", "false");
    NAV_MENU.setAttribute("aria-hidden", "true");
  } else {
    // Open the menu
    NAV_MENU.classList.add("active");
    MENU_TOGGLE.setAttribute("aria-expanded", "true");
    NAV_MENU.setAttribute("aria-hidden", "false");
  }
})
