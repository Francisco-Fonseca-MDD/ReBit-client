import Sentiment from "sentiment";
import axios from "axios";

const sentiment = new Sentiment();

const id = 1172470;
async function api(gameId) {
  const { data } = await axios.get(`http://localhost:8080/${gameId}`);
  const results = data.reviews.map((reviewObj) => {
    return {
      review: reviewObj.review,
      score: sentiment.analyze(reviewObj.review).score,
    };
  });
  // const avgScore =
  //   results.reduce((sum, currentResult) => {
  //     return sum + currentResult.score;
  //   }, 0) / results.length;
  console.log(results);
}
const reviews = api(id);
const gradientCalculator = (score) => {
  if (score < 0) return `(255,${255 * score},${255 * score})`;
};

const reviewCard = () => {};

function App() {
  return (
    <div className="App">
      {reviews.map((review) => {
        return <article></article>;
      })}
    </div>
  );
}

export default App;
