import { renderListWithTemplate } from "./utils.mjs";

function leagueCardTemplate(league) {
  let htmlString = "";
  if (league.strBadge) {
    htmlString = `<li class="league-card hover-effect">
      <a href="/league_pages/index.html?league=${league.idLeague}">
        <img src="${league.strBadge}" alt="Image of ${league.strLeague}">
        <h2 class="league__name">${league.strLeague}</h2>
        <h3 class="card__brand">${league.strCurrentSeason}</h3>
      </a>
    </li>`;
  }
  return htmlString;
}

export default class LeagueListing {
  constructor(leagueList, listElement) {
    this.leagueList = leagueList;
    this.listElement = listElement;
  }

  async init() {
    await this.renderList(this.leagueList);
  }

  async renderList(list) {
    await renderListWithTemplate(leagueCardTemplate, this.listElement, list);
  }
}
