import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import LeagueDetails from "./LeagueDetails.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const leagueId = getParam("league");
  const dataSource = new ExternalServices();
  const leagueData = await dataSource.getLeagueById(leagueId);

  const leagueDetails = new LeagueDetails(leagueId, leagueData);
  await leagueDetails.init();
});
