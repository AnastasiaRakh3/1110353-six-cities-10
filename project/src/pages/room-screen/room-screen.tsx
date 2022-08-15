import { Navigate } from 'react-router-dom';

import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import Reviews from '../../components/reviews/reviews';
import { setRatingStarWidth, isPremium, isFavorite, makeFistLetterUp, checkEnding } from '../../utils';
import { AppRoute, MapType, PlaceType } from '../../const';
import { MapHocProps } from '../../hocs/with-map';
import { useAppSelector } from '../../hooks';

export default function RoomScreen({ renderMap, renderOffersList }: MapHocProps): JSX.Element {

  const room = useAppSelector((state) => state.activeOffer);
  const comments = useAppSelector((state) => state.comments);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);

  if (!room) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const currentCity = room.city;

  const roomImagesElements = room.images.map((img) => (
    <div key={img} className="property__image-wrapper">
      <img className="property__image" src={img} alt={`Room ${room.id}`} />
    </div>
  ));

  const goodsElements = room.goods.map(
    (element) => <li key={element} className="property__inside-item">{element}</li>
  );

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav />
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {roomImagesElements}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium(room, 'property')}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {room.title}
                </h1>
                <button className={`property__bookmark-button ${isFavorite(room, 'property')} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: setRatingStarWidth(room) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{room.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {makeFistLetterUp(room.type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {room.bedrooms} Bedroom{checkEnding(room.bedrooms)}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {room.maxAdults} adult{checkEnding(room.maxAdults)}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{room.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goodsElements}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={room.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {room.host.name}
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {room.description}
                  </p>
                </div>
              </div>
              <Reviews reviews={comments} />
            </div>
          </div>
        </section>
        <div className="container">
          {renderMap(nearbyOffers, currentCity, MapType.Property)}
          {renderOffersList(nearbyOffers, PlaceType.NearPlaces)}
        </div>
      </main>
    </div>
  );
}

