import { loadHeaderFooter } from "./utils.mjs";
import { updateCartInventory } from "./cartCounter.mjs";

async function init() {
  // Wait for header/footer to load
  await loadHeaderFooter();

  // Update cart bubble
  updateCartInventory();
}

// Initialize
init();
