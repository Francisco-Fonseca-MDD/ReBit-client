import "./HomePage.scss";
import backendApi from "../../utils";
import LargeGameCard from "./LargeGameCard/LargeGameCard";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
  const [gamesList, setGamesList] = useState(null);

  useEffect(() => {
    backendApi.fetchAllGames(setGamesList);
  }, []);

  if (!gamesList) return <h1>Loading...</h1>;
  return (
    <main>
      <Carousel responsive={responsive} className="carousel">
        {gamesList.map((game) => {
          return <LargeGameCard game={game} />;
        })}
      </Carousel>

      <section className="sorting">
        <div>sorting and filters here</div>
      </section>
      <section className="smallCards">
        <article>card</article>
        <article>card</article>
        <article>card</article>
        <article>card</article>
      </section>
    </main>
  );
}

export default HomePage;
