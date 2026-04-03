import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const hasDiscount = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
      100,
  );

  return `<li class="product-card ${hasDiscount ? "discounted" : ""}">
      <a href="/product_pages/?product=${product.Id}"> 
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">

        ${hasDiscount ? `<span class="discount-badge">${discountPercent}% OFF</span>` : ""}

        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>

        <p class="product-card__price">$${product.FinalPrice}</p>

        ${hasDiscount ? `<p class="product-card__retail-price"><s>$${product.SuggestedRetailPrice}</s></p>` : ""}
      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; // store full list for re-sorting
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);
    document.querySelector(".title").textContent = this.category;

    // Listen for sort changes
    document.querySelector("#sort").addEventListener("change", (e) => {
      this.sortAndRender(e.target.value);
    });
  }

  sortAndRender(sortValue) {
    // Copy array so original order is preserved
    const sorted = [...this.products];

    if (sortValue === "name") {
      sorted.sort((a, b) =>
        a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
      );
    } else if (sortValue === "price-asc") {
      sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
    } else if (sortValue === "price-desc") {
      sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
    }
    // "default" just uses original order

    this.renderList(sorted);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true  // clear before re-rendering
    );
  }
}
