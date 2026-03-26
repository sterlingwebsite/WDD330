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

  /* W04 Individual Task(s): Report - Total$ in Cart */
  const footer = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    footer.classList.remove("hide");

    const total = cartItems.reduce((sum, item) => {
      const price = Number(item.SuggestedRetailPrice);
      const discount = price * 0.2;
      const finalPrice = price - discount;
      return sum + finalPrice;
    }, 0);

    document.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;
  } else {
    footer.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  let imageSrc = item.Image || (item.Images && item.Images.PrimaryMedium) || "";

  if (imageSrc.startsWith("http")) {
  } else if (imageSrc.startsWith("../")) {
    imageSrc = imageSrc.replace("../", "/");
  } else if (imageSrc && !imageSrc.startsWith("/")) {
    imageSrc = "/" + imageSrc;
  }
  //to calculate the discount
  const discountRate = 0.2;
  const discount = (item.SuggestedRetailPrice * discountRate).toFixed(2);
  const finalPrice = (item.SuggestedRetailPrice - discount).toFixed(2);

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
  <p class="cart-card__quantity">qty: 1</p>

  ${
    discount > 0
      ? ` 
  <p class="cart-card__discount"> Save $${discount}! </p>
  <p class="cart-card__retail-price"> Suggested Price $${item.SuggestedRetailPrice} </p>
  `
      : ""
  }
  <p class="cart-card__price">Final Price $${finalPrice}</p>
</li>`;

  return newItem;
}

init();
