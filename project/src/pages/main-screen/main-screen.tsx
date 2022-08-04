import { useState } from 'react';

import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import LocationList from '../../components/location-list/location-list';
import SortForm from '../../components/sort-form/sort-form';
import { OfferType } from '../../types/offer';
import { MapType, PlaceType, SortType } from '../../const';
import { getSortedOffers } from '../../utils';
import { MapHocProps } from '../../hocs/with-map';

type MainScreenProps = {
  offersList: OfferType[];
  city: string;
  cities: string[];
};

export default function MainScreen({ offersList, city, cities, renderMap, renderOffersList }: MainScreenProps & MapHocProps): JSX.Element {

  const [activeSortType, setActiveSortType] = useState(SortType.Popular);

  const locationOffers = offersList.filter((offer) => offer.city.name === city);
  const renderingOffers = getSortedOffers(activeSortType, [...locationOffers]);
  const currentCity = renderingOffers[0].city;

  const handleSortType = (type: string) => {
    setActiveSortType(type);
  };

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
              <SortForm onChangeSortType={handleSortType} />
              {renderOffersList(renderingOffers, PlaceType.Cities)}
            </section>
            <div className="cities__right-section">
              {renderMap(locationOffers, currentCity, MapType.Cities)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
