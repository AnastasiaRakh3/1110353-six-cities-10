import { FormEvent, useRef } from 'react';
import { toast } from 'react-toastify';

import Logo from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks/index';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

const validatePassword = ( password: string ): boolean =>
  (/[a-zA-Z]+[1-90]+|[1-90]+[a-zA-Z]+/).test(password);

export default function LoginScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {

      if (validatePassword(passwordRef.current.value)) {
        const authData: AuthData = {
          login: loginRef.current.value,
          password: passwordRef.current.value
        };
        dispatch(loginAction(authData));
      } else {
        toast.warning('Incorrect password');
      }
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
                  ref={loginRef}
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
                  ref={passwordRef}
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
