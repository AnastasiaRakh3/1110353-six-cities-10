import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import LocationList from '../../components/location-list/location-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { OfferType } from '../../types/offer';
import { MapType, PlaceType } from '../../const';

type MainScreenProps = {
  offersList: OfferType[];
  city: string;
  cities: string[];
};

export default function MainScreen({ offersList, city, cities }: MainScreenProps): JSX.Element {

  const locationOffers = offersList.filter((offer) => offer.city.name === city);

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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <PlacesList offersList={locationOffers} placeType={PlaceType.Cities} />
            </section>
            <div className="cities__right-section">
              <Map city={offersList[0].city} offers={offersList} mapType={MapType.Cities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
