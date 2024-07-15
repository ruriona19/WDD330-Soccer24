function navSubMenuTemplate(leagueId, season) {
  let htmlString = "";
    htmlString = `<ul class="nav no-search">
              <li class="nav-item">
                <a href="/matches/index.html?league=${leagueId}&season=${season}">Matches</a>
              </li>
              <li class="nav-item"><a href="#">Table</a></li>
              <li class="nav-item"><a href="#">Teams</a></li>
            </ul>`;
  return htmlString;
}

export default class LeagueDetails {
  constructor(leagueId, leagueDataSource) {
    this.leagueId = leagueId;
    this.leagueDataSource = leagueDataSource;
  }

  renderLeagueDetails() {
    const subMenu = document.querySelector(".navbar-sub-menu");
    const name = document.getElementById("league-name");
    const currentSeason = document.getElementById("current-season");
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

    subMenu.innerHTML = navSubMenuTemplate(this.leagueId, this.leagueDataSource["strCurrentSeason"]);
    name.innerHTML = this.leagueDataSource["strLeague"];  
    currentSeason.innerHTML = this.leagueDataSource["strCurrentSeason"];
    formerYear.innerHTML = this.leagueDataSource["intFormedYear"];
    country.innerHTML = this.leagueDataSource["strCountry"];
    description.innerHTML = this.leagueDataSource["strDescriptionEN"];
    logo.src = this.leagueDataSource["strLogo"];
    banner.src = this.leagueDataSource["strBanner"];
    poster.src = this.leagueDataSource["strPoster"];
    trophy.src = this.leagueDataSource["strTrophy"];
    fanart1.src = this.leagueDataSource["strFanart1"];
    fanart2.src = this.leagueDataSource["strFanart2"];
    fanart3.src = this.leagueDataSource["strFanart3"];
    fanart4.src = this.leagueDataSource["strFanart4"];
  }

  init() {
    this.renderLeagueDetails();
    localStorage.setItem("firstLoad", false);
  }
}
