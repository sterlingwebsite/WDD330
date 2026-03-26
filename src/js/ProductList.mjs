import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // W03 Individual Task - Sterling - Discount indicator-product listing
  const hasDiscount = product.FinalPrice < product.SuggestedRetailPrice;
  const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
  const discountPercent = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
  );

  return `<li class="product-card ${hasDiscount ? "discounted" : ""}">
      <a href="/product_pages/?product=${product.Id}"> 
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">

        ${hasDiscount ? `
          <span class="discount-badge">${discountPercent}% OFF</span>
        ` : ""}

        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>

        <p class="product-card__price">
          $${product.FinalPrice}
        </p>

        ${hasDiscount ? `
          <p class="product-card__retail-price">
            <s>$${product.SuggestedRetailPrice}</s>
          </p>
        ` : ""}
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}