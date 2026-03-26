import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartInventory } from "./cartCounter.mjs";

async function init() {
  
  await loadHeaderFooter();

  updateCartInventory();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();
}

init();
