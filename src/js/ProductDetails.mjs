import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartInventory } from "./cartCounter.mjs";

export default class ProductDetails {
    
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);

        //for superscript number in orderCounter
        updateCartInventory();
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;

    // Grab the price  from the product data
    const discountRate = 0.20;
    const retailPrice = product.SuggestedRetailPrice.toFixed(2);
    const finalPrice = (retailPrice * (1 - discountRate)).toFixed(2);
    const priceElement = document.getElementById('productPrice');

    // Check if there is a discount
    if (retailPrice > finalPrice) {
        const savings = (retailPrice - finalPrice).toFixed(2);
        
        // Use innerHTML to inject the discount badge + old price + new price with backticks
        priceElement.innerHTML = `
            <span class="original-price">RETAIL PRICE: $${retailPrice}</span> 
            <span class="discount-badge">Discount $${savings}!</span>
            <span class="finalPrice"> FINAL PRICE: $${finalPrice}</span>
        `;
    } else {
        // the else If no discount, just show the price as usual
        priceElement.textContent = `$${finalPrice}`;
    }


    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}