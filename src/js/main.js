import { loadHeaderFooter } from "./utils.mjs";
import { updateCartInventory } from "./cartCounter.mjs";

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

  // Update cart bubble
  updateCartInventory();

  // Render homepage categories
  renderCategories(categories);
}

// Initialize
init();
