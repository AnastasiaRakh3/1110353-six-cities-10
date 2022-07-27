import { useParams, Navigate } from 'react-router-dom';

import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import ReviewForm from '../../components/review-form/review-form';
import CommentsList from '../../components/comments-list/comments-list';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import { OfferType } from '../../types/offer';
import { commentsList } from '../../mocks/comments';
import { setRatingStarWidth, isPremium, isFavorite, makeFistLetterUp } from '../../utils';
import { AppRoute } from '../../const';

type RoomScreenProps = {
  offersList: OfferType[];
};

const additionalMapClass = 'property__map';
const placeType = 'near-places';

export default function RoomScreen({ offersList }: RoomScreenProps): JSX.Element {
  const { id } = useParams();

  const room = offersList.find((offer) => offer.id === Number(id));

  if (!room) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const reviews = commentsList.filter((comment) => comment.idOffer === Number(id));

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
                  {room.bedrooms} Bedroom{room.bedrooms > 1 && 's'}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {room.maxAdults} adult{room.maxAdults > 1 && 's'}
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
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <CommentsList commentsList={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map city={offersList[0].city} offers={offersList.slice(0, 3)} additionalClass={additionalMapClass} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList offersList={offersList.slice(0, 3)} placeType={placeType} />
          </section>
        </div>
      </main>
    </div>
  );
}
