import ExternalServices from "./ExternalServices.mjs";
import LeagueList from "/js/leagueList.js";

async function getLeaguesByCountry(allLeagues, country) {
    const dataSource = new ExternalServices();
    const allLeaguesDetailedData = await Promise.all(allLeagues.map(async (league) => {
        const leagueData = await dataSource.getLeagueById(league.idLeague);
        return leagueData;
    }));

    const filteredLeaguesByCountry = allLeaguesDetailedData.filter(
        league => league.strCountry.includes(country)
    );

    return filteredLeaguesByCountry;   
}

async function initialize() {
    const listElement = document.querySelector(".product-list");
    const dataSource = new ExternalServices();
    const allSoccerLeagues = await dataSource.getLeaguesBySport('Soccer');
    const soccerLeaguesByCountry = await getLeaguesByCountry(allSoccerLeagues, 'Spain');
    const leagueList = new LeagueList(soccerLeaguesByCountry, listElement);
    leagueList.init();

    const searchBySelect = document.querySelector("#search-by-country");

    searchBySelect.addEventListener("input", async (e) => {
        const filterLeagueByCountry = e.target.value;
        const soccerLeaguesByCountry = await getLeaguesByCountry(allSoccerLeagues, filterLeagueByCountry);
        leagueList.renderList(soccerLeaguesByCountry);
    });
}
  
initialize(); 