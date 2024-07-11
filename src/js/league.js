import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

document.addEventListener("DOMContentLoaded", async () => {

  const leagueId = getParam("product");
  const dataSource = new ExternalServices();
  const leagueData = await dataSource.getLeagueById(leagueId);

  const productDetails = new ProductDetails(leagueId, leagueData);
  await productDetails.init();
});
