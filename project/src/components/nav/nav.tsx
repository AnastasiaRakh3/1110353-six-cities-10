import { SyntheticEvent, memo } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getFavoriteOffers } from '../../store/data-process/selectors';
import { getAuthorizationStatus, getUserName } from '../../store/user-process/selectors';

function Nav(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userName = useAppSelector(getUserName);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const dispatch = useAppDispatch();

  const handleLogOutClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      {
        authorizationStatus === AuthorizationStatus.Auth ?
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{userName}</span>
                <span className="header__favorite-count">{favoriteOffers.length}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to={AppRoute.Main} onClick={handleLogOutClick}>
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </ul>
          :
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          </ul>
      }
    </nav>
  );
}

export default memo(Nav);
