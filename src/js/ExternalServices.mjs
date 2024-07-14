const baseURLV2 = 'https://www.thesportsdb.com/api/v2/json/3/';
const baseURLV1 = 'https://www.thesportsdb.com/api/v1/json/3/';

function getUniqueIntRoundCount(data) {
  const uniqueRounds = new Set();
  data["1"].forEach(event => {
      uniqueRounds.add(event.intRound);
  });
  return uniqueRounds.size;
}

async function convertToJson(res) {
  try {
    const jsonResponse = await res.json();
    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: "servicesError", message: jsonResponse };
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw { name: "jsonParseError", message: "Unable to parse JSON response" };
  }
}

export default class ExternalServices {
  async getLeaguesBySport(sport) {
    try {
      const response = await fetch(baseURLV2 + "all/leagues");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await convertToJson(response);
      const filteredData = data.leagues.filter(item => item.strSport === "Soccer");
      return filteredData;

    } catch (error) {
      console.error("Unable to fetch data:", error);
      throw error; 
    }
  }

  async getLeagueById(leagueId) {
    try {
      const response = await fetch(baseURLV2 + `lookup/league/${leagueId}`);
      const leagueData = await convertToJson(response);
      return leagueData.leagues[0];

    } catch (error) {
      console.error("Unable to fetch leagueData:", error);
      throw error; 
    }
  }

  async getScheduleByRound(leagueId, season, round = 1) {
    try {
      const response = await fetch(baseURLV1 + `eventsround.php?id=${leagueId}&r=${round}&s=${season}`);
      const scheduleByRound = await convertToJson(response);
      return scheduleByRound.events;

    } catch (error) {
      console.error("Unable to fetch scheduleByRound:", error);
      throw error; 
    }
  }

  async getNumberOfRoundsBySeason(leagueId, season) {
    try {
      const response = await fetch(baseURLV2 + `schedual/league/${leagueId}/${season}`);
      const scheduleBySeasonLeagueId = await convertToJson(response);
      const numberOfRounds = getUniqueIntRoundCount(scheduleBySeasonLeagueId);
      return numberOfRounds;

    } catch (error) {
      console.error("Unable to fetch nextSchedualData:", error);
      throw error; 
    }
  }
}
