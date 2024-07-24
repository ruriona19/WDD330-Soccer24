import ExternalServices from "./ExternalServices.mjs";
import TeamList from "./TeamList.mjs";
import { getParam } from "./utils.mjs";

async function initialize() {
  const leagueId = getParam("league");
  const season = getParam("season");
  const dataSource = new ExternalServices();
  const allTeamsByLeagueId = await dataSource.getTeamsByLeagueId(leagueId);

  const teamList = new TeamList(leagueId, season, allTeamsByLeagueId);
  teamList.init();
}

initialize();
