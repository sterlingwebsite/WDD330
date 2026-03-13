import { getLocalStorage } from "./utils.mjs";

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
  const discount = (item.SuggestedRetailPrice - item.FinalPrice).toFixed(2);
  
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

  ${item.SuggestedRetailPrice > item.FinalPrice ? ` 
  <p class="cart-card__discount"> Save $${discount}! </p>
  <p class="cart-card__retail-price"> Suggested Price $${item.SuggestedRetailPrice} </p>
  ` : "" }
  <p class="cart-card__price">Final Price $${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
