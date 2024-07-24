import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import TeamDetails from "./TeamDetails.mjs";

/**
 * Gets the data related to a leagueId retrieved from the url
 * using getParam() function
 */
document.addEventListener("DOMContentLoaded", async () => {
  const teamId = getParam("team");
  const dataSource = new ExternalServices();
  const teamDetailsData = await dataSource.getTeamDetailsByTeamId(teamId);

  // Initialize a TeamDetails object and render it.
  const teamDetails = new TeamDetails(teamId, teamDetailsData);
  await teamDetails.init();
});
