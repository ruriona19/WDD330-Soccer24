
export default class LeagueDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
  }

  init() {
    this.renderLeagueDetails(this.dataSource);
  }

  renderLeagueDetails() {
    const description = document.querySelector(".product__description");
    const name = document.getElementById("league-name");
    const currentSeason = document.getElementById("current-season");
    const formerYear = document.getElementById("former-year");
    const country = document.getElementById("country");
    const logo = document.querySelector('#logo');
    const banner = document.querySelector('#banner');
    const poster = document.querySelector('#poster');
    const trophy = document.querySelector('#trophy');
    const fanart1 = document.querySelector('#fanart1');
    const fanart2 = document.querySelector('#fanart2');
    const fanart3 = document.querySelector('#fanart3');
    const fanart4 = document.querySelector('#fanart4');

    description.innerHTML = this.dataSource["strDescriptionEN"];
    name.innerHTML = this.dataSource["strLeague"];  
    currentSeason.innerHTML = this.dataSource["strCurrentSeason"];
    formerYear.innerHTML = this.dataSource["intFormedYear"];
    country.innerHTML = this.dataSource["strCountry"];
    logo.src = this.dataSource["strLogo"];
    banner.src = this.dataSource["strBanner"];
    poster.src = this.dataSource["strPoster"];
    trophy.src = this.dataSource["strTrophy"];
    fanart1.src = this.dataSource["strFanart1"];
    fanart2.src = this.dataSource["strFanart2"];
    fanart3.src = this.dataSource["strFanart3"];
    fanart4.src = this.dataSource["strFanart4"];
  }
}
