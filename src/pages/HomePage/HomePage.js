import "./HomePage.scss";
import backendApi from "../../utils";
import LargeGameCard from "../../components/LargeGameCard/LargeGameCard";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router";

function HomePage() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const navigate = useNavigate();
  const [gamesList, setGamesList] = useState(null);
  const [tags, setTags] = useState(null);
  const [displayGames, setDisplayGames] = useState(null);
  const [inputs, setInputs] = useState({
    genreInput: false,
    ratingInput: false,
  });

  const handleDropdowns = (event, type) => {
    if (type === "ratingInput") {
      setDisplayGames(
        (inputs.genreInput ? displayGames : gamesList).sort((a, b) => {
          return (a.score - b.score) * event.target.value;
        })
      );
      setInputs({
        ...inputs,
        ratingInput: true,
      });
    }
    if (type === "genreInput") {
      setDisplayGames(
        gamesList.filter((game) => {
          return game.tags.includes(event.target.value);
        })
      );
      setInputs({
        ...inputs,
        genreInput: true,
      });
    }
  };

  useEffect(() => {
    backendApi.fetchAllGames(setGamesList);
    backendApi.fetchTags(setTags);
  }, []);

  if (!gamesList || !tags) return <h1>Loading...</h1>;
  return (
    <main>
      <Carousel responsive={responsive} className="carousel">
        {gamesList.map((game) => {
          return <LargeGameCard game={game} />;
        })}
      </Carousel>

      <section className="sorting">
        <div className="sorting__container">
          <label htmlFor="genreInput" className="sorting__label">
            <p className="sorting__label-text">Genre</p>
            <select
              id="genreInput"
              name="genreInput"
              className="sorting__select"
              onChange={(event) => {
                handleDropdowns(event, "genreInput");
              }}
            >
              <option value="">Filter by genre</option>
              {tags.map((tag) => {
                return (
                  <option key={tag.id} value={tag.tag}>
                    {tag.tag}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="ratingInput" className="sorting__label">
            <p className="sorting__label-text">Rating</p>
            <select
              onChange={(event) => {
                handleDropdowns(event, "ratingInput");
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

      <section className="smallCards">
        {(displayGames ? displayGames : gamesList).map((game) => {
          return (
            <article
              className="smallCards__article"
              key={game.id}
              onClick={() => {
                navigate("/games/" + game.id);
              }}
            >
              <img src={game.header_url} className="smallCards__image" />
              <div className="smallCards__details">
                <p className="smallCards__text">{game.short_description}</p>
                <p className="smallCards__text">{game.about}</p>
              </div>
              <h2
                className={
                  game.score <= 0
                    ? "smallCards__score smallCards__score--negative"
                    : "smallCards__score"
                }
              >
                {game.score}
              </h2>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default HomePage;
