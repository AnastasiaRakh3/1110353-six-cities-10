import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import { setRatingStarWidth, isPremium, isFavorite } from '../../utils';

type PlaceCardProps = {
  key: number;
  offer: Offer;
  handlePlaceCardMouseOver: (evt: MouseEvent<HTMLElement>) => void;
};

export default function PlaceCard({ key, offer, handlePlaceCardMouseOver }: PlaceCardProps): JSX.Element {

  return (
    <article key={key} className="cities__card place-card" onMouseOver={handlePlaceCardMouseOver}>
      {isPremium(offer, 'place-card')}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="https://www.google.com/">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place" title={offer.title} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite(offer, 'place-card')} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: setRatingStarWidth(offer) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

