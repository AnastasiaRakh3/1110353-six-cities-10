import { useState, ChangeEvent, FormEvent } from 'react';

import Logo from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks/index';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

export default function LoginScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  const [authData, setAuthData] = useState<AuthData>({ login: '', password: '' });

  const handleLoginChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setAuthData({ ...authData, login: evt.target.value });
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setAuthData({ ...authData, password: evt.target.value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (authData.login !== '' && authData.password !== '') {
      dispatch(loginAction(authData));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={authData.login}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={authData.password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="https://www.google.com/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
