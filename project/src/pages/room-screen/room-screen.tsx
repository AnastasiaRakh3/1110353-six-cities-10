import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import Reviews from '../../components/reviews/reviews';
import Loading from '../../components/loading/loading';
import Map from '../../components/map/map';
import NearPlaces from '../../components/near-places/near-places';
import { setRatingStarWidth, isPremium, makeFistLetterUp, checkEnding } from '../../utils';
import { PlaceType, MAX_GALERY_LENGTH, FavoriteButtonScreen, AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getNearbyOffers, getIsActiveOfferLoading, getActiveOffer, getIsActiveOfferError } from '../../store/data-process/selectors';
import { fetchOneOfferAction } from '../../store/api-actions';
import { OfferType } from '../../types/offer';

export default function RoomScreen(): JSX.Element {

  const activeOffer = useAppSelector(getActiveOffer) as OfferType;
  const isActiveOfferLoading = useAppSelector(getIsActiveOfferLoading);
  const isActiveOfferError = useAppSelector(getIsActiveOfferError);
  const nearbyOffers = useAppSelector(getNearbyOffers);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchOneOfferAction(id as string));
  }, [dispatch, id]);

  if (isActiveOfferError) {
    navigate(AppRoute.NotFound);
  }

  // activeOffer === null иначе ошибка что не читаются свойства activeOffer
  if (isActiveOfferLoading || activeOffer === null) {
    return <Loading />;
  }

  const currentCity = activeOffer.city;

  const roomImagesElements = activeOffer.images.slice(0, MAX_GALERY_LENGTH).map((img) => (
    <div key={img} className="property__image-wrapper">
      <img className="property__image" src={img} alt={`Room ${activeOffer.id}`} />
    </div>
  ));

  const goodsElements = activeOffer.goods.map(
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
              {isPremium(activeOffer, 'property')}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {activeOffer.title}
                </h1>
                <FavoriteButton
                  isFavorite={activeOffer.isFavorite}
                  screen={FavoriteButtonScreen.Property}
                  id={activeOffer.id}
                />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: setRatingStarWidth(activeOffer) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{activeOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {makeFistLetterUp(activeOffer.type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {activeOffer.bedrooms} Bedroom{checkEnding(activeOffer.bedrooms)}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {activeOffer.maxAdults} adult{checkEnding(activeOffer.maxAdults)}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{activeOffer.price}</b>
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
                    <img className="property__avatar user__avatar" src={activeOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {activeOffer.host.name}
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {activeOffer.description}
                  </p>
                </div>
              </div>
              <Reviews roomId={activeOffer.id} />
            </div>
          </div>
        </section>
        <div className="container">
          < Map
            offers={[...nearbyOffers, activeOffer]}
            city={currentCity}
            activeCardId={activeOffer.id}
          />
          < NearPlaces
            offers={nearbyOffers}
            placeType={PlaceType.NearPlaces}
          />
        </div>
      </main>
    </div>
  );
}

