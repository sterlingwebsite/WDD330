import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { updateCartInventory } from "./cartCounter.mjs";

// dynamic header and footer from W03 Team Activity
// loadHeaderFooter();
async function init() {
  // 1. Wait for the header to actually land in the DOM
  await loadHeaderFooter();

  updateCartInventory();

  renderCartContents();
}

// Professor's code. Doesn't work when cart is empty, because "so-cart" isn't an array.
// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  const footer = document.querySelector(".list-footer");

  if (cartItems.length > 0) {
    footer.classList.remove("hide");

    const total = cartItems.reduce((sum, item) => {
      // ✅ Use FinalPrice directly from the product object
      return sum + Number(item.FinalPrice);
    }, 0);

    document.querySelector(".list-total").textContent =
      `Total: $${total.toFixed(2)}`;
  } else {
    footer.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  let imageSrc = item.Image || (item.Images && item.Images.PrimaryMedium) || "";

  if (imageSrc.startsWith("http")) {
    // leave alone
  } else if (imageSrc.startsWith("../")) {
    imageSrc = imageSrc.replace("../", "/");
  } else if (imageSrc && !imageSrc.startsWith("/")) {
    imageSrc = "/" + imageSrc;
  }

  const retailPrice = Number(item.SuggestedRetailPrice);
  const finalPrice = Number(item.FinalPrice);
  // ✅ Convert to number before comparing
  const discount = (retailPrice - finalPrice).toFixed(2);

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
  <p class="cart-card__quantity">qty: 1</p>

  ${
    // Number(discount) ensures proper numeric comparison
    Number(discount) > 0
      ? `
  <p class="cart-card__discount"> Save $${discount}! </p>
  <p class="cart-card__retail-price"> Suggested Price $${retailPrice} </p>
  `
      : ""
  }
  <p class="cart-card__price">Final Price $${finalPrice}</p>
</li>`;

  return newItem;
}

init();
