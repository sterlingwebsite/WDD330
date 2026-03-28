import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartInventory } from "./cartCounter.mjs";
import Alert from "./Alert.mjs";

async function init() {
  await loadHeaderFooter();

  updateCartInventory();

  const category = getParam("category");
  const dataSource = new ExternalServices();
  const element = document.querySelector(".product-list");
  const productList = new ProductList(category, dataSource, element);

  // alert - W04 individual task
  const alertHandler = new Alert();
  alertHandler.init();

  productList.init();
}

init();
