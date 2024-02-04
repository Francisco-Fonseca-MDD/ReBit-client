function LargeGameCard({ gamesList }) {
  return (
    <article className="LargeGameCard">
      <div className="LargeGameCard__container">
        <h1 className="LargeGameCard__title">{gamesList[0].game}</h1>
        <h2 className="LargeGameCard__score"></h2>
      </div>
    </article>
  );
}

export default LargeGameCard;
