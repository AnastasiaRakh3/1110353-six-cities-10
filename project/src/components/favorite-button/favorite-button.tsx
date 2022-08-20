import { FavoriteButtonScreen } from '../../const';

type FavoriteButtonProps = {
  isFavorite: boolean;
  screen: string;
};
const setFavoriteButtonClassName = (isFavorite: boolean, screen: string,): string =>
  isFavorite
    ? `${screen}__bookmark-button ${screen}__bookmark-button--active button`
    : `${screen}__bookmark-button button`;

const getFavoriteButtonSize = (screen: string): { width: string; height: string; } =>
  screen === FavoriteButtonScreen.Property
    ? { width: '31', height: '33' }
    : { width: '18', height: '19' };


function FavoriteButton({ isFavorite, screen }: FavoriteButtonProps): JSX.Element {
  return (
    <button
      className={setFavoriteButtonClassName(isFavorite, screen)}
      type="button"
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

