import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartInventory } from "./cartCounter.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch the product data from the API using the product id from the URL
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product details into the main element
    this.renderProductDetails("main");

    // Attach click event to the Add to Cart button
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    // Get existing cart from localStorage or start with an empty array
    let cartContents = getLocalStorage("so-cart");
    if (!cartContents) {
      cartContents = [];
    }

    // Check if this product is already in the cart by matching product Id
    // find() returns the existing item object if found, or undefined if not
    const existingItem = cartContents.find(
      (item) => item.Id === this.product.Id
    );

    if (existingItem) {
      // Item already exists in cart — increment quantity instead of adding a duplicate
      // Use (existingItem.quantity || 1) in case quantity was never initialized
      // then add 1 to get the new quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;

      // Let the user know the quantity was updated instead of added
      alertMessage(
        `${this.product.NameWithoutBrand} quantity updated to ${existingItem.quantity}!`
      );
    } else {
      // Item is new to the cart — initialize quantity to 1 before pushing
      // This ensures the cart quantity controls work correctly from the start
      this.product.quantity = 1;

      // Add the new product to the cart array
      cartContents.push(this.product);

      // Let the user know the item was successfully added
      alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    // Save the updated cart array back to localStorage
    // This persists the changes so they survive page refreshes
    setLocalStorage("so-cart", cartContents);

    // Update the cart counter badge in the header to reflect new quantity
    updateCartInventory();
  }

  renderProductDetails(selector) {
    // Find the target element in the DOM and inject the product HTML
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product),
    );
  }
}

function productDetailsTemplate(product) {
  // document.querySelector("h2").textContent =
  //   product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  // document.querySelector("#p-brand").textContent = product.Brand.Name;
  // document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  // const productImage = document.getElementById("p-image");
  // productImage.src = product.Images.PrimaryExtraLarge;
  // productImage.alt = product.NameWithoutBrand;

  // document.querySelector("#p-price").textContent =
  //   `New Price: $${product.FinalPrice}`;
  // document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  // document.querySelector("#p-description").innerHTML =
  //   product.DescriptionHtmlSimple;
  // document.querySelector("#add-to-cart").dataset.id = product.Id;

  // // Grab the price from the product data
  // const retailPrice = product.SuggestedRetailPrice;
  // // const finalPrice = (retailPrice * (1 - discountRate)).toFixed(2);
  // const finalPrice = product.FinalPrice;
  // const priceElement = document.getElementById("productPrice");

  // // Check if there is a discount
  // if (retailPrice > finalPrice) {
  //   const savings = Math.round(retailPrice - finalPrice);

  //   // Use innerHTML to inject the discount badge + old price + new price with backticks
  //   priceElement.innerHTML = `
  //           <span class="original-price">Retail Price: $${retailPrice}</span>
  //           <span class="discount-badge">Discount $${savings}!</span>
  //       `;
  // } else {
  //   // the else If no discount, just show the price as usual
  //   priceElement.textContent = `$${finalPrice}`;
  // }

  // // document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  // // document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  // // document.getElementById('addToCart').dataset.id = product.Id;

  // Check if the product has a discount by comparing retail vs final price
  const hasDiscount = product.SuggestedRetailPrice > product.FinalPrice;

  // Calculate how much the user saves if there is a discount
  const savings = Math.round(product.SuggestedRetailPrice - product.FinalPrice);

  return `
    <section class="product-detail">
      <!-- Capitalize the first letter of the category name -->
      <h2>${product.Category.charAt(0).toUpperCase() + product.Category.slice(1)}</h2>

      <h3 id="p-brand">${product.Brand.Name}</h3>
      <p id="p-name">${product.NameWithoutBrand}</p>

      <!-- Product image using the extra large version for detail page -->
      <img id="p-image"
           src="${product.Images.PrimaryExtraLarge}"
           alt="${product.NameWithoutBrand}">

      <div id="productPrice">
        <!-- Show discount badge and savings if product is on sale
             otherwise just show the final price -->
        ${
          hasDiscount
            ? `
              <span class="original-price">Retail Price: $${product.SuggestedRetailPrice}</span>
              <span class="discount-badge">Discount $${savings}!</span>
              <span class="final-price">New Price: $${product.FinalPrice}</span>
            `
            : `$${product.FinalPrice}`
        }
      </div>

      <p id="p-color">${product.Colors[0].ColorName}</p>

      <!-- Product description comes as HTML from the API so we use template literal -->
      <p id="p-description">${product.DescriptionHtmlSimple}</p>

      <!-- data-id stores the product Id for reference when adding to cart -->
      <button id="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    </section>
  `;
}
