import { useState, useCallback } from 'react';

import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import LocationList from '../../components/location-list/location-list';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import SortForm from '../../components/sort-form/sort-form';
import { OfferType } from '../../types/offer';
import { MapType, PlaceType, SortType, DEFAULT_CITIES } from '../../const';
import { getSortedOffers } from '../../utils';

type MainScreenProps = {
  offersList: OfferType[];
  city: string;
  cities: typeof DEFAULT_CITIES;
};

export default function MainScreen({ offersList, city, cities }: MainScreenProps): JSX.Element {

  const [activeSortType, setActiveSortType] = useState(SortType.Popular);

  const locationOffers = offersList.filter((offer) => offer.city.name === city);
  const sortedOffers = getSortedOffers(activeSortType, [...locationOffers]);
  const currentCity = sortedOffers[0].city;

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleCardHover = (id: number | null): void => {
    setActiveCardId(id);
  };

  // useCallback возвращает мемоизированный колбэк
  // useCallback создан специально для случаев, когда требуется передать колбэк дочерним оптимизированным компонентам, чтобы не приходилось только ради этого определять функцию сравнения изменения пропсов.
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
            <LocationList cities={cities} />
          </section>
        </div>
        <div className="cities">
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
              < Map offers={locationOffers} city={currentCity} mapType={MapType.Cities} activeCardId={activeCardId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
