import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";
import { updateCartInventory } from "./cartCounter.mjs";

// dynamic header and footer from W03 Team Activity
// loadHeaderFooter();
async function init() {
  // 1. Wait for the header to actually land in the DOM
  await loadHeaderFooter();

  updateCartInventory();

  renderCartContents();
}

// Helper: get cart from localStorage, always returns an array
function getCart() {
  let cartItems = getLocalStorage("so-cart") || [];
  // Ensure cart is always an array even if a single object was saved
  if (!Array.isArray(cartItems)) cartItems = [cartItems];
  return cartItems;
}

// Helper: save updated cart back to localStorage and refresh cart bubble
function saveCart(cartItems) {
  setLocalStorage("so-cart", cartItems);
  // Keep the cart counter badge in the header in sync
  updateCartInventory();
}

// Helper: calculate the total price of all items respecting quantity
function calculateTotal(cartItems) {
  return cartItems.reduce((sum, item) => {
    // Use FinalPrice directly from product data (already discounted)
    const finalPrice = Number(item.FinalPrice);
    // Default quantity to 1 if not set
    const qty = item.quantity || 1;
    return sum + finalPrice * qty;
  }, 0);
}

// Professor's code. Doesn't work when cart is empty, because "so-cart" isn't an array.
// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

function renderCartContents() {
  // Always get a fresh copy from localStorage before rendering
  const cartItems = getCart();

  // Pass index so each card knows its position in the cart array
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  /* W04 Individual Task(s): Report - Total$ in Cart */
  const footer = document.querySelector(".list-footer");

  if (cartItems.length > 0) {
    footer.classList.remove("hide");

    // Use calculateTotal so quantity is factored into the grand total
    document.querySelector(".list-total").textContent =
      `Total: $${calculateTotal(cartItems).toFixed(2)}`;
  } else {
    footer.classList.add("hide");
  }

  // Attach +/- and remove button events after HTML is in the DOM
  attachQuantityEvents();
}

// Attach event listeners to all quantity buttons after each render
// We re-attach after every render because innerHTML replaces the DOM nodes
function attachQuantityEvents() {
  // Decrease quantity by 1 — removes item if quantity reaches 0
  document.querySelectorAll(".qty-btn-decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      changeQuantity(index, -1);
    });
  });

  // Increase quantity by 1
  document.querySelectorAll(".qty-btn-increase").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      changeQuantity(index, 1);
    });
  });

  // Remove button — instantly removes item from cart regardless of quantity
  document.querySelectorAll(".qty-btn-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      removeItem(index);
    });
  });
}

// Change the quantity of an item at a given index by delta (+1 or -1)
function changeQuantity(index, delta) {
  const cartItems = getCart();
  const item = cartItems[index];

  // Initialize quantity to 1 if this is the first time it's being changed
  if (!item.quantity) item.quantity = 1;
  item.quantity += delta;

  // If quantity drops to 0 or below, remove the item entirely
  if (item.quantity <= 0) {
    removeItem(index);
    return;
  }

  // Save updated cart and re-render to reflect changes
  saveCart(cartItems);
  renderCartContents();
}

// Remove a single item from the cart by its index position
function removeItem(index) {
  const cartItems = getCart();
  // splice removes 1 item at the given index
  cartItems.splice(index, 1);
  saveCart(cartItems);
  renderCartContents();
}

function cartItemTemplate(item, index) {
  let imageSrc = item.Image || (item.Images && item.Images.PrimaryMedium) || "";

  if (imageSrc.startsWith("http")) {
    return imageSrc;
  } else if (imageSrc.startsWith("../")) {
    imageSrc = imageSrc.replace("../", "/");
  } else if (imageSrc && !imageSrc.startsWith("/")) {
    imageSrc = "/" + imageSrc;
  }

  //to calculate the discount
  const retailPrice = Number(item.SuggestedRetailPrice);
  const finalPrice = Number(item.FinalPrice);
  // Calculate actual discount from product data instead of hardcoded 20%
  const discount = (retailPrice - finalPrice).toFixed(2);

  // Default quantity to 1 if not yet set on this item
  const quantity = item.quantity || 1;
  // Subtotal = price x quantity for this specific item
  const itemTotal = (finalPrice * quantity).toFixed(2);

  //template building
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageSrc}" 
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>

  <!-- Quantity Controls: decrease, display current qty, increase -->
  <div class="cart-card__quantity-controls">
    <button class="qty-btn qty-btn-decrease" data-index="${index}">−</button>
    <span class="qty-display">${quantity}</span>
    <button class="qty-btn qty-btn-increase" data-index="${index}">+</button>
  </div>

  ${
    // Number(discount) ensures proper numeric comparison (not string)
    Number(discount) > 0
      ? `
  <p class="cart-card__discount"> Save $${discount}! </p>
  <p class="cart-card__retail-price"> Suggested Price $${retailPrice} </p>
  `
      : ""
  }
  <p class="cart-card__price">Item Price: $${finalPrice}</p>
  <!-- Subtotal updates dynamically as quantity changes -->
  <p class="cart-card__item-total">Subtotal: $${itemTotal}</p>

  <!-- Remove button instantly deletes item from cart -->
  <button class="qty-btn qty-btn-remove" data-index="${index}">Remove</button>
</li>`;

  return newItem;
}

init();
