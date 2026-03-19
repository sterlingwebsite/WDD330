import { loadHeaderFooter } from "./utils.mjs";
import { updateCartInventory } from "./cartCounter.mjs";

async function init() {
  //Wait for the header to load into the main page
  await loadHeaderFooter();
 
  updateCartInventory();
}

//to inialize
init();
