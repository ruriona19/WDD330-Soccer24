import { getParam, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ScheduleList from "./ScheduleList.mjs";

/**
 * Gets the schedual data related to a leagueId and season retrieved from the url
 * using getParam() function
 */
document.addEventListener("DOMContentLoaded", async () => {
  const firstLoad = localStorage.getItem("firstLoad");

  if (firstLoad === "false") {
    const leagueId = getParam("league");
    const season = getParam("season");
    const dataSource = new ExternalServices();
    const scheduleDataByRound = await dataSource.getScheduleByRound(
      leagueId,
      season,
    );
    const numberOfRoundsBySeason = await dataSource.getNumberOfRoundsBySeason(
      leagueId,
      season,
    );
    setLocalStorage("rounds-by-season", numberOfRoundsBySeason);

    const scheduleList = new ScheduleList(
      leagueId,
      season,
      scheduleDataByRound,
    );
    await scheduleList.init();

    localStorage.setItem("firstLoad", true);
  }
});

const matchdaySelect = document.querySelector("#select-matchday");

matchdaySelect.addEventListener("input", async (e) => {
  const leagueId = getParam("league");
  const season = getParam("season");
  const round = e.target.value;
  localStorage.setItem("current-round", round);
  const dataSource = new ExternalServices();
  const newScheduleData = await dataSource.getScheduleByRound(
    leagueId,
    season,
    round,
  );

  const scheduleList = new ScheduleList(leagueId, season, newScheduleData);
  await scheduleList.init();
});
