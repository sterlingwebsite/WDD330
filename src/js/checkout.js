import { loadHeaderFooter } from "../js/utils.mjs";
import { updateCartInventory } from "../js/cartCounter.mjs";

async function init() {
 
  await loadHeaderFooter();

   
  updateCartInventory();
}

init();