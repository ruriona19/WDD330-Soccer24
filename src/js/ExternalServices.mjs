const baseURL = 'https://www.thesportsdb.com/api/v2/json/3/';

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
      const response = await fetch("https://www.thesportsdb.com/api/v2/json/3/all/leagues");
  
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
      const response = await fetch(`https://www.thesportsdb.com/api/v2/json/3/lookup/league/${leagueId}`);
      const leagueData = await convertToJson(response);
      return leagueData.leagues[0];

    } catch (error) {
      console.error("Unable to fetch leagueData:", error);
      throw error; 
    }
  }
}
