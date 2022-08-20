import { Link } from 'react-router-dom';

import FavoriteButton from '../favorite-button/favorite-button';
import { OfferType } from '../../types/offer';
import { AppRoute, FavoriteButtonScreen } from '../../const';
import { setRatingStarWidth, isPremium } from '../../utils';

type FavoriteCardProps = {
  city: string;
  offers: OfferType[];
};

export default function FavoriteCard({ city, offers }: FavoriteCardProps): JSX.Element {

  return (
    <li key={city} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="https://www.google.com/">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <article key={offer.id} className="favorites__card place-card">
            {isPremium(offer, 'place-card')}
            <div className="favorites__image-wrapper place-card__image-wrapper">
              <a href="https://www.google.com/">
                <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place" title={offer.title} />
              </a>
            </div>
            <div className="favorites__card-info place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">&euro;{offer.price}</b>
                  <span className="place-card__price-text">&#47;&nbsp;night</span>
                </div>
                <FavoriteButton isFavorite={offer.isFavorite} screen={FavoriteButtonScreen.PlaceCard} id={offer.id} />
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
        )
        )}
      </div>
    </li>
  );
}
