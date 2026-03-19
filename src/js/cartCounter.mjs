//Counter in the backpack - superscript number in logo
export function counterOrders() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  return cartItems.length;
}

//update function of the superscript 
export function updateCartInventory() {
  const count = counterOrders(); 
  const badge = document.querySelector(".cart-count");

  if (badge) {
    badge.textContent = count;
    
    //Show if greater than 0, hide if 0
    if (count > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
}