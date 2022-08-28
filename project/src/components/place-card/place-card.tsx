import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import FavoriteButton from '../favorite-button/favorite-button';
import { AppRoute, PlaceType, FavoriteButtonScreen } from '../../const';
import { OfferType } from '../../types/offer';
import { setRatingStarWidth, isPremium } from '../../utils';

type PlaceCardProps = {
  offer: OfferType;
  placeType: PlaceType;
  onHoverCard?: (id: number | null) => void;
};

export default function PlaceCard({ offer, placeType, onHoverCard }: PlaceCardProps): JSX.Element {

  const handleMouseOver = (evt: MouseEvent<HTMLElement>) => {
    if (onHoverCard !== undefined) {
      onHoverCard(offer.id);
    }
  };

  const handleMouseLeave = (evt: MouseEvent<HTMLElement>) => {
    if (onHoverCard !== undefined) {
      onHoverCard(null);
    }
  };

  return (
    <article
      className={`${placeType}__card place-card`}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium(offer, 'place-card')}
      <div className={`${placeType}__image-wrapper place-card__image-wrapper`}>
        <Link
          to={`${AppRoute.Room}/${offer.id}`}
        >
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place" title={offer.title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            isFavorite={offer.isFavorite}
            screen={FavoriteButtonScreen.PlaceCard}
            id={offer.id}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: setRatingStarWidth(offer) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
