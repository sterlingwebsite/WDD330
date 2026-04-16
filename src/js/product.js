import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

async function init() {
  // Wait for header and footer to load before doing anything else
  await loadHeaderFooter();

  // No category needed - findProductById uses the product id directly
  const dataSource = new ExternalServices();

  // Get the product id from the URL e.g. ?product=880RR
  const productId = getParam("product");

  // Create and initialize the product detail view
  const product = new ProductDetails(productId, dataSource);
  await product.init();
}

init();
