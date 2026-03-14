// As far as I know. This module is not used. It was created as part of the stretch activity of W03 Team Activity, but Professor's Blazzard's answer key doesn't have it, and cart.js seems to accomplish its purpose.

import { renderWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    return `
        <li class="cart-card">
            <img src="${item.Image}" alt="${item.Name}">
            <h3>${item.Name}</h3>
            <p>$${item.FinalPrice}</p>
        </li>
    `;
}

export default class ShoppingCart {
    constructor(key, listElement) {
        this.key = key;
        this.listElement = listElement;
    }

    getCartContents() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    renderCart() {
        const items = this.getCartContents();
        this.listElement.innerHTML = "";

        items.forEach(item => {
            renderWithTemplate(cartItemTemplate(item), this.listElement);
        });
    }

    init() {
        this.renderCart();
    }
}