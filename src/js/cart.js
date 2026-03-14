import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

// dynamic header and footer from W03 Team Activity
loadHeaderFooter();

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

  const htmlItems = cartItems.map(item => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {

  //to calculate the discount
  const discountRate = 0.20;
  const discount = (item.SuggestedRetailPrice * discountRate).toFixed(2);
  const finalPrice = (item.SuggestedRetailPrice - discount).toFixed(2)
  
  //template building
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>

  ${discount> 0 ? ` 
  <p class="cart-card__discount"> Save $${discount}! </p>
  <p class="cart-card__retail-price"> Suggested Price $${item.SuggestedRetailPrice} </p>
  ` : "" }
  <p class="cart-card__price">Final Price $${finalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
