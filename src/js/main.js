import { loadHeaderFooter } from "./utils.mjs";
import { updateCartInventory } from "./cartCounter.mjs";
import Alert from "./Alert.mjs";

// the 4 categories in main page
const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

function renderCategories(list) {
  const container = document.querySelector(".product-list");

  const mainPageCard = list.map(
    (category) => `
    <li>
      <a href="product_listing/index.html?category=${category}">
        <img src="images/category-${category}.svg" alt="${category}">
        <h2>${category.charAt(0).toUpperCase() + category.slice(1).replaceAll("-", " ")}</h2>
      </a>
    </li>
  `,
  );

  container.innerHTML = mainPageCard.join("");
}

async function init() {
  // Wait for header/footer to load
  await loadHeaderFooter();

  // for the alert - W04
  try {
    const alertManager = new Alert();
    await alertManager.init(); 
    console.log("Alerts loaded successfully");
  } catch (err) {
    // If alerts fail, the code "catches" the error here and keeps going
    console.error("Alerts failed to load, but continuing to categories:", err);
  }

  // Update cart bubble
  updateCartInventory();

  // Render homepage categories
  renderCategories(categories);
}

// Initialize
init();
