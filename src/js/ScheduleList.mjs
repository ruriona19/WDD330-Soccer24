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

function matchCardTemplate(match) {

  let marker;
  if (match.strTime == null) {
    marker = "00:00"
  } else if(match.strStatus === "Match Finished"){
    marker = `${match.intHomeScore}-${match.intAwayScore}`;
  } else {
    marker = match.strTime.slice(0, -3);
  }

  let htmlString = "";
  htmlString = `<div class="match-list-row">
              <div class="info-head">
                <div class="match-status-label">${match.strStatus}</div>
                <div class="right-info ta-r">${match.strVenue}</div>
              </div>
              <div class="info-body">
                <div class="team-info ta-r">
                  <div class="team-name ta-r team_left">
                    <div class="name">${match.strHomeTeam}</div>
                  </div>
                  <img
                    class="pv3 va-m team-shield"
                    src=${match.strHomeTeamBadge}
                    alt=${match.strHomeTeam}
                    itemprop="image"
                  />
                </div>
                <div class="marker">${marker}</div>
                <div class="team-info ta-l">
                  <img
                    loading="lazy"
                    class="pv3 va-m team-shield"
                    src=${match.strAwayTeamBadge}
                    alt=${match.strAwayTeam}
                    itemprop="image"
                  />
                  <div class="team-name ta-l team_right">
                    <div class="name">${match.strAwayTeam}</div>
                  </div>
                </div>
              </div>
              <div class="info-footer">${match.dateEvent}</div>
            </div>`;
  return htmlString;
}

export default class ScheduleList {
  constructor(leagueId, season, scheduleDataSource) {
    this.leagueId = leagueId;
    this.season = season;
    this.scheduleList = scheduleDataSource;
    this.leagueData = getLocalStorage("current-league-detail");
    this.roundsBySeason = getLocalStorage("rounds-by-season");
  }

  async init() {
    this.renderScheduleList();
  }
    
  renderScheduleList() {
    let currentRound = localStorage.getItem("current-round");

    const subMenu = document.querySelector(".navbar-sub-menu");
    const scheduleTitle = document.querySelector("#schedule-title > h4");
    const roundText = document.querySelector(".panel-head > h5");
    const panelBody = document.querySelector(".panel-body");
    const matchdaySelect = document.getElementById("select-matchday");
    const currentScheduleTitle = `${this.leagueData["strLeague"]} ${this.season} season`;

    subMenu.innerHTML = navSubMenuTemplate(this.leagueId, this.season);
    scheduleTitle.innerHTML = currentScheduleTitle;
    let rounds = createArrayOfRoundsBySeason(this.roundsBySeason);
    if (currentRound == null) {
      roundText.innerHTML = "ROUND 1";
      currentRound = "1";
    } else {
      roundText.innerHTML = `ROUND ${currentRound}`;
    }
    // render list of options 
    matchdaySelect.value = currentRound;
    renderListWithTemplate(matchdaySelectOptionTemplate, matchdaySelect, rounds);
    
      
    

    // render list of matches
    renderListWithTemplate(matchCardTemplate, panelBody, this.scheduleList);

  }
}