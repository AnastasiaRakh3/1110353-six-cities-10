import { useState, useCallback } from 'react';

import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import LocationList from '../../components/location-list/location-list';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import SortForm from '../../components/sort-form/sort-form';
import PlacesEmpty from '../../components/places-empty/places-empty';
import { useAppSelector } from '../../hooks';
import { getOffers } from '../../store/data-process/selectors';
import { getCity } from '../../store/city-process/selectors';
import { PlaceType, SortType, DEFAULT_CITIES } from '../../const';
import { fetchOffersAction, fetchFavoriteOffersAction } from '../../store/api-actions';
import { store } from '../../store';
import { OfferType } from '../../types/offer';
import { getSortedOffers } from '../../utils';

store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteOffersAction());

export default function MainScreen(): JSX.Element {

  const offersList = useAppSelector(getOffers);
  const city = useAppSelector(getCity);

  const [activeSortType, setActiveSortType] = useState(SortType.Popular);

  const locationOffers = offersList.filter((offer: OfferType) => offer.city.name === city);
  const sortedOffers = getSortedOffers(activeSortType, [...locationOffers]);
  const currentCity = sortedOffers[0].city;

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleCardHover = (id: number | null): void => {
    setActiveCardId(id);
  };

  const handleSortType = useCallback((type: string) => {
    setActiveSortType(type);
  }, []);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav />
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList cities={DEFAULT_CITIES} />
          </section>
        </div>
        <div className="cities">
          {
            locationOffers.length
              ?
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{locationOffers.length} places to stay in {city}</b>
                  <SortForm
                    activeSortType={activeSortType}
                    onChangeSortType={handleSortType}
                  />
                  < PlacesList offers={sortedOffers} placeType={PlaceType.Cities} onHoverCard={handleCardHover} />
                </section>
                <div className="cities__right-section">
                  < Map offers={locationOffers} city={currentCity} activeCardId={activeCardId} />
                </div>
              </div>
              :
              <PlacesEmpty />
          }
        </div>
      </main>
    </div>
  );
}
