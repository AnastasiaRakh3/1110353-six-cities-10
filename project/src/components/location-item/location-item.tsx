import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LocationItemProps = {
  city: string;
  selectedCity: string;
  onSelectCity: (name: string) => void;
};

export default function LocationItem({ city, selectedCity, onSelectCity }: LocationItemProps): JSX.Element {

  const isSelected = selectedCity === city ? 'tabs__item--active' : '';

  return (
    <li className="locations__item" onClick={() => onSelectCity(city)}>
      <Link
        className={`locations__item-link tabs__item ${isSelected}`}
        to={AppRoute.Main}
      >
        <span>{city}</span>
      </Link>
    </li>
  );
}
