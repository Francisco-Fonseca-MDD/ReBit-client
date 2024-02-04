import "./HomePage.scss";
import backendApi from "../../utils";
import LargeGameCard from "./LargeGameCard/LargeGameCard";
import { useEffect, useState } from "react";
function HomePage() {
  const [gamesList, setGamesList] = useState(null);

  useEffect(() => {
    setGamesList(backendApi.fetchAllGames(setGamesList));
  }, []);

  if (!gamesList) return <h1>Loading...</h1>;
  return (
    <main>
      <LargeGameCard gamesList={gamesList} />
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
