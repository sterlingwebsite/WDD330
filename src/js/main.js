import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

//the 4 categories in main page
const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

function renderCategories(list) {
  const container = document.querySelector(".product-list");
  
  const mainPageCard = list.map(category =>`
         <li>
            <a href="product_listing/index.html?category=${category}">
                <img src="images/category-${category.replace('-', '')}.svg"  alt="${category}">
                <h2>${category.charAt(0).toUpperCase() +category.slice(1).replace('-', ' ')}</h2>
            </a>
         </li>`);

  container.innerHTML = mainPageCard.join("");
}

renderCategories(categories);