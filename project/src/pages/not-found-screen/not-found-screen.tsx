import './not-found-screen.css';

export default function NotFoundScreen(): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <section className="not-found">
          <p className="not-found__text">404</p>
          <p className="not-found__text">Page not found</p>
          <a className="not-found__return-link" href="/">Return to main page</a>
        </section>
      </main>
    </div>
  );
}
