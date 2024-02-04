import "./GamePage.scss";
import "../../pages/HomePage/HomePage.scss";
import { useEffect, useState } from "react";
import backendApi from "../../utils";
import { useParams } from "react-router";
import LargeGameCard from "../../components/LargeGameCard/LargeGameCard";

function GamePage() {
  const [game, setGame] = useState(null);
  const [displayReviews, setDisplayReviews] = useState(null);
  const [updateTracker, setUpdateTracker] = useState(false);
  const params = useParams();

  const handleDropdowns = (event, type) => {
    if (type === "rating") {
      setDisplayReviews(
        (displayReviews ? displayReviews : game.reviews).sort((a, b) => {
          return (a.score - b.score) * event.target.value;
        })
      );
    }
    if (type === "positivity") {
      setDisplayReviews(
        game.reviews.filter((review) => {
          return review.score * event.target.value > 1;
        })
      );
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.target.reviewInput.value) {
      return console.log(event.target.reviewInput.value);
    }
    await backendApi.postReview({
      review: event.target.reviewInput.value,
      userId: 1,
      gameId: params.id,
    });
    event.target.reset();
  };

  useEffect(() => {
    backendApi.fetchOneGame(setGame, params.id);
  }, [updateTracker, params]);

  if (!game) return <h1>Loading...</h1>;
  return (
    <main>
      <LargeGameCard game={game} />
      <section className="sorting">
        <div className="sorting__container">
          <label htmlFor="genreInput" className="sorting__label">
            <p className="sorting__label-text">Positivity</p>
            <select
              id="genreInput"
              name="genreInput"
              className="sorting__select"
              onChange={(event) => {
                handleDropdowns(event, "positivity");
              }}
            >
              <option value="">Filter by positivity</option>

              <option value={1}>Positive reviews</option>
              <option value={-1}>Negative reviews</option>
            </select>
          </label>
          <label htmlFor="ratingInput" className="sorting__label">
            <p className="sorting__label-text">Rating</p>
            <select
              onChange={(event) => {
                handleDropdowns(event, "rating");
              }}
              id="ratingInput"
              name="ratingInput"
              className="sorting__select"
            >
              <option value="">Sort by Rating</option>
              <option value={-1}>High to Low</option>
              <option value={1}>Low to High</option>
            </select>
          </label>
        </div>
      </section>

      <form className="review-form" onSubmit={handleSubmit}>
        <label htmlFor="reviewInput" className="review-form__label">
          Add a new review about {game.game}
          <textarea
            id="reviewInput"
            name="reviewInput"
            className="review-form__textarea"
            placeholder="Add a review!"
          />
        </label>
        <button className="review-form__button">Submit</button>
      </form>

      <section className="smallCards">
        {(displayReviews ? displayReviews : game.reviews).map((review) => {
          return (
            <article className="smallCards__article" key={review.id}>
              <div className="smallCards__stats">
                <p
                  className={
                    review.score <= 0
                      ? "smallCards__score smallCards__score--negative smallCards__score--review"
                      : "smallCards__score smallCards__score--review"
                  }
                >
                  {" "}
                  {review.score}
                </p>
                <div className="smallCards__stats-container">
                  <p
                    onClick={async () => {
                      await backendApi.updateLikes({
                        userId: 1,
                        reviewId: review.id,
                        like: true,
                      });
                      setUpdateTracker(!updateTracker);
                    }}
                  >
                    👍 {review.likes}
                  </p>
                  <p
                    onClick={async () => {
                      await backendApi.updateLikes({
                        userId: 1,
                        reviewId: review.id,
                        like: false,
                      });
                      setUpdateTracker(!updateTracker);
                    }}
                  >
                    👎 {review.dislikes}
                  </p>
                </div>
              </div>
              <div className="smallCards__details">
                <p className="smallCards__text">{review.username}</p>
                <p className="smallCards__text">{review.review}</p>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default GamePage;
