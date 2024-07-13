import { getParam, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import LeagueDetails from "./LeagueDetails.mjs";

/**
 * Gets the data related to a leagueId retrieved from the url
 * using getParam() function
 */
document.addEventListener("DOMContentLoaded", async () => {
  const leagueId = getParam("league");
  const dataSource = new ExternalServices();
  const leagueData = await dataSource.getLeagueById(leagueId);
  setLocalStorage("current-league-detail", leagueData);

  // Initialize a LeagueDetails object and render it.
  const leagueDetails = new LeagueDetails(leagueId, leagueData);
  await leagueDetails.init();
});
