import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartInventory } from "./cartCounter.mjs";

async function init() {
  
  await loadHeaderFooter();

  updateCartInventory();

const category = getParam("category");
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();
}

init();
