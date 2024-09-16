const baseURLV2 = 'https://www.thesportsdb.com/api/v2/json/3/';
const baseURLV1 = 'https://www.thesportsdb.com/api/v1/json/3/';

// function getUniqueIntRoundCount(data) {
//   const uniqueRounds = new Set();
//   data["1"].forEach(event => {
//       uniqueRounds.add(event.intRound);
//   });
//   return uniqueRounds.size;
// }

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
  // async getLeaguesBySport(sport) {
  //   try {
  //     const response = await fetch(baseURLV1 + "all_leagues.php");
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await convertToJson(response);
  //     const filteredData = data.leagues.filter(item => item.strSport === "Soccer");
  //     return filteredData;

  //   } catch (error) {
  //     console.error("Unable to fetch data:", error);
  //     throw error; 
  //   }
  // }

  async getLeaguesByCountry(country) {
    try {
      const response = await fetch(baseURLV1 + `search_all_leagues.php?c=${country}&s=Soccer`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await convertToJson(response);
      // TODO: figured out how to avoid using this filter because all leagues are already related to Soccer
      const filteredData = data.countries.filter(item => item.strSport === "Soccer");
      return filteredData;

    } catch (error) {
      console.error("Unable to fetch data:", error);
      throw error; 
    }
  }

  async getLeagueById(leagueId) {
    try {
      //const response = await fetch(baseURLV2 + `lookup/league/${leagueId}`);
      //const leagueData = await convertToJson(response);
      let storedArray = JSON.parse(localStorage.getItem('current-leagues-by-country'));
      if (storedArray && Array.isArray(storedArray)) {
  
        // Step 2: Define the value you're searching for
        const searchValue = leagueId; // Example value you're looking for
      
        // Step 3: Find the value in the array (using .find() as an example)
        const foundValue = storedArray.find(item => item.idLeague === searchValue);
      
        // Step 4: Store the result in a variable
        if (foundValue) {
          return foundValue;
        } else {
          console.log('Value not found.');
        }
      
      } else {
        console.log('No array found in localStorage.');
      }

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

      // Get leagueName by leagueId
      const currentLeague = JSON.parse(localStorage.getItem('current-league-detail'));
      let currentLeagueName = currentLeague.strLeague;
      currentLeagueName = currentLeagueName.replaceAll(' ', '%20');

      // Get the list of teams related to a given league name
      const response = await fetch(baseURLV1 + `search_all_teams.php?l=${currentLeagueName}`);
      const teamsList = await convertToJson(response);

      const numberOfRounds = (teamsList.teams.length - 1)*2;
      return numberOfRounds;

    } catch (error) {
      console.error("Unable to fetch nextSchedualData:", error);
      throw error; 
    }
  }

  async getTeamsByLeagueId(leagueId) {
    try {
      const response = await fetch(baseURLV2 + `list/teams/${leagueId}`);
      const leagueData = await convertToJson(response);
      return leagueData.teams;

    } catch (error) {
      console.error("Unable to fetch teamsData:", error);
      throw error; 
    }
  }

  async getTeamDetailsByTeamId(teamId) {
    try {
      const response = await fetch(baseURLV2 + `lookup/team/${teamId}`);
      const teamDetailsData = await convertToJson(response);
      return teamDetailsData.teams[0];

    } catch (error) {
      console.error("Unable to fetch teamDetailsData:", error);
      throw error; 
    }
  }
}
