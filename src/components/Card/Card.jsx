export default function Card({card, onCardClick}) {
  return (
    <article className="card">
      <button type="button" className="card__trash"></button>
      <img
        onClick={onCardClick}
        src={card.src}
        className="card__image"
        alt={card.title}
        id={card.id}
      />
      <div className="card__bottom">
        <h2 className="card__heading">{card.title}</h2>
        <div className="card__like-contaier">
          <button type="button" className="card__like"></button>
          <p className="card__like-counter">{card.likes}</p>
        </div>
      </div>
    </article>
  );
}
