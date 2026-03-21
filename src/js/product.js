import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get the existing cart (could be null, array, or object)
  let cartItems = getLocalStorage("so-cart");
  // If it's not an array, start fresh
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  // Add the new product
  cartItems.push(product);
  // Save the updated array back to localStorage
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Wait for the DOM to be ready before attaching the event listener
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.getElementById("addToCart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", addToCartHandler);
  } else {
    console.error("Add to Cart button not found");
  }
});