import ExternalServices from "./ExternalServices.mjs";
import LeagueList from "./leagueList.js";
import { setLocalStorage } from "./utils.mjs";

async function initialize() {
  // contains the elements to be generated dinamically
  const listElement = document.querySelector(".league-list");

  // gets the selected value from search by country selector
  const selectElement = document.getElementById("search-by-country");
  const selectedCountry = selectElement.value;

  const dataSource = new ExternalServices();

  const leaguesByCountry =
    await dataSource.getLeaguesByCountry(selectedCountry);
  setLocalStorage("current-leagues-by-country", leaguesByCountry);

  const leagueList = new LeagueList(leaguesByCountry, listElement);
  leagueList.init();

  // Adding "change" event listener that will regenerate the list of leagues when
  // the value of select by country selector is changed
  const searchBySelect = document.querySelector("#search-by-country");
  searchBySelect.addEventListener("change", async (e) => {
    const filterLeagueByCountry = e.target.value;
    const newSoccerLeaguesByCountry = await dataSource.getLeaguesByCountry(
      filterLeagueByCountry,
    );
    setLocalStorage("current-leagues-by-country", newSoccerLeaguesByCountry);
    leagueList.renderList(newSoccerLeaguesByCountry);
  });
}

initialize();
