import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { toggleFavorite } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FavoriteButtonScreen, AuthorizationStatus, AppRoute } from '../../const';

type FavoriteButtonProps = {
  isFavorite: boolean;
  screen: string;
  id: number;
};

const setFavoriteButtonClassName = (isFavorite: boolean, screen: string,): string =>
  isFavorite
    ? `${screen}__bookmark-button ${screen}__bookmark-button--active button`
    : `${screen}__bookmark-button button`;

const getFavoriteButtonSize = (screen: string): { width: string; height: string; } =>
  screen === FavoriteButtonScreen.Property
    ? { width: '31', height: '33' }
    : { width: '18', height: '19' };


function FavoriteButton({ isFavorite, screen, id }: FavoriteButtonProps): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleFavoriteButtonClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(toggleFavorite({ id, status: Number(!isFavorite) }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={setFavoriteButtonClassName(isFavorite, screen)}
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      <svg
        className={`${screen}__bookmark-icon`}
        {...getFavoriteButtonSize(screen)}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;


