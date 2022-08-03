import { useState } from 'react';

import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import LocationList from '../../components/location-list/location-list';
import SortForm from '../../components/sort-form/sort-form';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { OfferType } from '../../types/offer';
import { MapType, PlaceType, SortType } from '../../const';
import { getSortedOffers } from '../../utils';

type MainScreenProps = {
  offersList: OfferType[];
  city: string;
  cities: string[];
};

export default function MainScreen({ offersList, city, cities }: MainScreenProps): JSX.Element {

  const [activeSortType, setActiveSortType] = useState(SortType.Popular);

  const locationOffers = offersList.filter((offer) => offer.city.name === city);
  const renderingOffers = getSortedOffers(activeSortType, [...locationOffers]);

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
              <PlacesList offersList={renderingOffers} placeType={PlaceType.Cities} />
            </section>
            <div className="cities__right-section">
              <Map city={offersList[0].city} offers={locationOffers} mapType={MapType.Cities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
