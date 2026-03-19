import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
        document
            .getElementById('add-to-cart')
            .addEventListener('click', this.addToCart.bind(this));
    }

    addToCart() {
        let cartContents = getLocalStorage("so-cart");
        if (!cartContents) {
            cartContents = [];
        }
        cartContents.push(this.product);
        setLocalStorage("so-cart", cartContents);
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            productDetailsTemplate(this.product)
        );
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent =
      product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
    document.querySelector('#p-brand').textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('p-image');
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;

    

    document.querySelector("#p-price").textContent = `New Price: $${product.FinalPrice}`;
    document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
    document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#add-to-cart").dataset.id = product.Id;

    // Grab the price  from the product data
    const retailPrice = product.SuggestedRetailPrice;
    // const finalPrice = (retailPrice * (1 - discountRate)).toFixed(2);
    const finalPrice = product.FinalPrice;
    const priceElement = document.getElementById('productPrice');

    // Check if there is a discount
    if (retailPrice > finalPrice) {
        const savings = Math.round(retailPrice - finalPrice);
        
        // Use innerHTML to inject the discount badge + old price + new price with backticks
        priceElement.innerHTML = `
            <span class="original-price">Retail Price: $${retailPrice}</span> 
            <span class="discount-badge">Discount $${savings}!</span>
        `;
    } else {
        // the else If no discount, just show the price as usual
        priceElement.textContent = `$${finalPrice}`;
    }


    // document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    // document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    // document.getElementById('addToCart').dataset.id = product.Id;
}