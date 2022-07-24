import './not-found-screen.css';
import Logo from '../../components/logo/logo';

export default function NotFoundScreen(): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
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
