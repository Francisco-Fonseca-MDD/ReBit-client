import axios from "axios";

class api {
  constructor(apiUrl, apiPort) {
    this.apiUrl = apiUrl;
    this.apiPort = apiPort;
  }
  fetchAllGames = async (setStateFun) => {
    const endpoint = this.apiUrl + ":" + this.apiPort + "/games";
    const games = await axios.get(endpoint);
    setStateFun(games.data);
  };
  fetchTags = async (setStateFun) => {
    const endpoint = this.apiUrl + ":" + this.apiPort + "/games/tags";
    const tags = await axios.get(endpoint);
    setStateFun(tags.data);
  };
}

const backendApi = new api(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_API_PORT
);

export default backendApi;
