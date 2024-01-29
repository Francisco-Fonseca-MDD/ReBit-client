import Sentiment from "sentiment";
import axios from "axios";
import { useEffect, useState } from "react";

const sentiment = new Sentiment();

function App() {
  const [reviews, setReviews] = useState(null);
  const id = 1172470;
  const gradientCalculator = (score) => {
    if (score < 0) return `(255,${255 * score},${255 * score})`;
  };
  async function api(gameId) {
    const { data } = await axios.get(`http://localhost:8080/${gameId}`);
    const results = data.reviews.map((reviewObj) => {
      return {
        review: reviewObj.review,
        score: sentiment.analyze(reviewObj.review).score,
      };
    });
    setReviews(results);
  }

  useEffect(() => {
    api(id);
  }, []);

  const reviewCard = () => {};
  if (!reviews) return;
  return (
    <div className="App">
      {reviews.map((review, i) => {
        return (
          <article
            key={i}
            style={{
              backgroundColor: `rgb${gradientCalculator(review.score)}`,
            }}
          >{`review: ${review.review}`}</article>
        );
      })}
    </div>
  );
}

export default App;
