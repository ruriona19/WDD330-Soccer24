import { getLocalStorage} from "./utils.mjs";


function navSubMenuTemplate(leagueId, season) {
  let htmlString = "";
    htmlString = `<ul class="nav no-search">
              <li class="nav-item">
                <a id="matches-link" href="/matches/index.html?league=${leagueId}&season=${season}">Matches</a>
              </li>
              <li class="nav-item"><a href="#">Table</a></li>
              <li class="nav-item"><a href="/teams/index.html?league=${leagueId}&season=${season}">Teams</a></li>
            </ul>`;
  return htmlString;
}

export default class TeamDetails {
  constructor(teamId, teamDetailsDataSource) {
    this.teamId = teamId;
    this.teamDetailsDataSource = teamDetailsDataSource;
    this.leagueDataSource = getLocalStorage("current-league-detail");
  }

  renderTeamDetails() {
    const subMenu = document.querySelector(".navbar-sub-menu");
    const name = document.getElementById("league-name");
    const formerYear = document.getElementById("former-year");
    const country = document.getElementById("country");
    const description = document.querySelector(".product__description");
    const logo = document.querySelector('#logo');
    const banner = document.querySelector('#banner');
    const poster = document.querySelector('#poster');
    const trophy = document.querySelector('#trophy');
    const fanart1 = document.querySelector('#fanart1');
    const fanart2 = document.querySelector('#fanart2');
    const fanart3 = document.querySelector('#fanart3');
    const fanart4 = document.querySelector('#fanart4');

    subMenu.innerHTML = navSubMenuTemplate(this.leagueDataSource["idLeague"], this.leagueDataSource["strCurrentSeason"]);
    name.innerHTML = this.teamDetailsDataSource["strTeam"];  
    formerYear.innerHTML = this.teamDetailsDataSource["intFormedYear"];
    country.innerHTML = this.teamDetailsDataSource["strCountry"];
    description.innerHTML = this.teamDetailsDataSource["strDescriptionEN"];
    logo.src = this.teamDetailsDataSource["strLogo"];
    banner.src = this.teamDetailsDataSource["strBanner"];
    poster.src = this.teamDetailsDataSource["strEquipment"];
    trophy.src = this.teamDetailsDataSource["strBadge"];
    fanart1.src = this.teamDetailsDataSource["strFanart1"];
    fanart2.src = this.teamDetailsDataSource["strFanart2"];
    fanart3.src = this.teamDetailsDataSource["strFanart3"];
    fanart4.src = this.teamDetailsDataSource["strFanart4"];
  }

  init() {
    this.renderTeamDetails();
  }
}