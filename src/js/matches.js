import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ScheduleList from "./ScheduleList.mjs";

/**
 * Gets the schedual data related to a leagueId and season retrieved from the url
 * using getParam() function
 */
document.addEventListener("DOMContentLoaded", async () => {
  const leagueId = getParam("league");
  const season = getParam("season");
  const dataSource = new ExternalServices();
  const seasonSchedualData = await dataSource.getSchedualByLeagueIdAndSeason(
    leagueId,
    season,
  );

  const scheduleList = new ScheduleList(leagueId, season, seasonSchedualData);
  await scheduleList.init();
});
