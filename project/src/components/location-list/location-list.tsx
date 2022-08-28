import LocationItem from '../location-item/location-item';
import { changeCity } from '../../store/city-process/city-process';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getCity } from '../../store/city-process/selectors';
import { DEFAULT_CITIES } from '../../const';

type LocationListProps = {
  cities: typeof DEFAULT_CITIES;
};

export default function LocationList({ cities }: LocationListProps): JSX.Element {

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
