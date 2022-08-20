import LocationItem from '../location-item/location-item';
import { changeCity } from '../../store/city-process/city-process';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getCity } from '../../store/selectors';
import { DEFAULT_CITIES } from '../../const';

type LocationListProps = {
  cities: typeof DEFAULT_CITIES;
};

export default function LocationList({ cities }: LocationListProps): JSX.Element {

  //Наш useSelector - хук, принимающая на вход селектор - метод, который принимает redux state и возвращает из него необходимые данные.
  //Наш useDispatch - хук, возвращающий dispatch метод из редакса, с помощью которого можно диспатчить экшены(отправлять). changeCity - наш экшн
  const selectedCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  const handleSelectCity = (name: string) => {
    dispatch(changeCity({ city: name }));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <LocationItem
          key={city}
          city={city}
          selectedCity={selectedCity}
          onSelectCity={handleSelectCity}
        />
      ))}
    </ul>
  );
}
