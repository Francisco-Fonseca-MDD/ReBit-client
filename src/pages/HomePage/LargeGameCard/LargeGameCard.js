import { useNavigate } from "react-router";
import "./LargeGameCard.scss";
function LargeGameCard({ game }) {
  const navigate = useNavigate();
  return (
    <article
      className="LargeGameCard"
      key={game.id}
      style={{ backgroundImage: `url(${game.header_url})` }}
      onClick={() => {
        navigate(`/games/${game.id}`);
      }}
    >
      <div className="LargeGameCard__container">
        <h1 className="LargeGameCard__title">{game.game}</h1>
        <h2
          className={
            game.score <= 0
              ? "LargeGameCard__score LargeGameCard__score--negative"
              : "LargeGameCard__score"
          }
        >
          {game.score}
        </h2>
      </div>
      <div className="LargeGameCard__details">
        <p className="LargeGameCard__text">{game.short_description}</p>
        <p className="LargeGameCard__text">{String(game.tags)}</p>
      </div>
    </article>
  );
}

export default LargeGameCard;
