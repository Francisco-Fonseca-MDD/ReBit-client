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
  fetchOneGame = async (setStateFun, gameId) => {
    const endpoint = this.apiUrl + ":" + this.apiPort + "/games/" + gameId;
    const game = await axios.get(endpoint);
    setStateFun(game.data);
  };
  updateLikes = async (interaction) => {
    const endpoint =
      this.apiUrl + ":" + this.apiPort + "/reviews/" + interaction.reviewId;
    await axios.put(endpoint, interaction);
  };
  postReview = async (body) => {
    const endpoint =
      this.apiUrl + ":" + this.apiPort + "/reviews/" + body.reviewId;
    await axios.post(endpoint, body);
  };
}

const backendApi = new api(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_API_PORT
);

export default backendApi;
