import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import FavoriteList from '../../components/favorite-list/favorite-list';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/data-process/selectors';
import { OfferType } from '../../types/offer';

type GroupOffer = {
  [city: string]: OfferType[];
};

export default function FavoritesScreen(): JSX.Element {

  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const groupFavoriteOffers = (): GroupOffer => {
    const groups: GroupOffer = {};

    favoriteOffers.forEach((offer) => {

      const city = offer.city.name;

      if (city in groups) {
        groups[city].push(offer);
      } else {
        groups[city] = [];
        groups[city].push(offer);
      }
    });
    // {Paris: Array(4), Hamburg: Array(2), Brussels: Array(1)}
    return groups;
  };


  const groupedFavoriteOffersList = Object.entries(groupFavoriteOffers());
  // [Array(['Paris', Array(4)]), Array(['Hamburg', Array(2)]), Array(['Brussels', Array(1)])]

  const favoritesTitle = favoriteOffers.length ? 'Saved listing' : 'Favorites (empty)';
  const favoritesAddedBlock = favoriteOffers.length ? <FavoriteList groupedOffers={groupedFavoriteOffersList} /> : (
    <div className="favorites__status-wrapper">
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
    </div>
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
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">{favoritesTitle}</h1>
            {favoritesAddedBlock}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}
