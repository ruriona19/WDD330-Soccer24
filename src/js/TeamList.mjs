import { getLocalStorage, renderListWithTemplate} from "./utils.mjs";

function createArrayOfRoundsBySeason(rounds) {
  let roundsBySeason = [];
  for (let i = 1; i <= rounds; i++) {
    roundsBySeason.push(i);
  }
  return roundsBySeason;
}

function navSubMenuTemplate(leagueId, season) {
  let htmlString = "";
    htmlString = `<ul class="no-search">
              <li class="nav-item">
                <a id="matches-link" href="/matches/index.html?league=${leagueId}&season=${season}">Matches</a>
              </li>
              <li class="nav-item"><a href="#">Table</a></li>
              <li class="nav-item"><a href="/teams/index.html?league=${leagueId}&season=${season}">Teams</a></li>
            </ul>`;
  return htmlString;
}

function matchdaySelectOptionTemplate(round) {
  let htmlString = "";
  htmlString = `<option value=${round}>MATCHDAY ${round}</option>`;
  return htmlString;
}

function teamCardTemplate(team) {

  let htmlString = "";
  htmlString = `<li >
                <a class="item-box" href="/team_pages/index.html?team=${team.idTeam}" data-cy="team">
                  <img class="team-item-shield" src="${team.strBadge}" alt="${team.strTeam} Badge">
                  <img class="team-item-badge" src="${team.strBanner}" alt="${team.strTeam}">
                  <p class="team-item-name">${team.strTeam}</p>
                </a>
               </li> `;
  return htmlString;
}

export default class TeamList {
  constructor(leagueId, season, teamDataSource) {
    this.leagueId = leagueId;
    this.season = season;
    this.teamList = teamDataSource;
    this.leagueData = getLocalStorage("current-league-detail");
  }

  async init() {
    this.renderTeamList();
  }
    
  renderTeamList() {

    const subMenu = document.querySelector(".navbar-sub-menu");
    const title = document.querySelector("#schedule-title > h4");
    const panelHead = document.querySelector(".team-panel-head");
    const ulTeamList = document.querySelector(".item-list");
    const currentTitle = `${this.leagueData["strLeague"]} ${this.season} season`;

    subMenu.innerHTML = navSubMenuTemplate(this.leagueId, this.season);
    title.innerHTML = currentTitle;
    panelHead.innerHTML = `<img
                    id="league-badge"
                    class="league-shield"
                    src="${this.leagueData["strBadge"]}"
                    alt="${this.leagueData["strLeague"]}"
                    itemprop="image"
                  />`;
 
      
    

    // render list of teams
    renderListWithTemplate(teamCardTemplate, ulTeamList, this.teamList);
  }
}