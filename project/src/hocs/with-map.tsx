import { ComponentType, useState } from 'react';

import Map from '../components/map/map';
import PlacesList from '../components/places-list/places-list';
import NearPlaces from '../components/near-places/near-places';
import { OfferType, City } from '../types/offer';
import { MapType, PlaceType } from '../const';

export type MapHocProps = {
  renderMap: (offers: OfferType[], city: City, mapType: MapType) => JSX.Element;
  renderOffersList: (offers: OfferType[], placeType: PlaceType) => JSX.Element;
};

// ComponentType - специальные тип, когда возникает необходимость использовать тип компонента
// Тип React.ComponentType имеет generic-параметр. Этот generic описывает тип props-ов. По умолчанию он равен {}

// Хок withMap будет принимать компонент(MainScreen), являющийся типом ComponentType(обычно для хоков), и у этого типа могут быть пропсы Т и MapHocProps (MainScreen({ offersList, city, cities, renderMap, renderOffersList }: MainScreenProps & MapHocProps)), но на выходе мы получаем компонент такого же типа ComponentType, где у него пропсы как Т без MapHocProps - (<MainScreenWithMap offersList={offers} city={city} cities={cities}/>)
export function withMap<T>(Component: ComponentType<T & MapHocProps>)
  : ComponentType<T> {

  type ComponentProps = Omit<T, keyof MapHocProps>;

  function WithMap(props: ComponentProps): JSX.Element {

    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const handleCardHover = (id: number | null): void => setActiveCardId(id);

    return (
      <Component
        {...props as T}
        renderMap={(offers: OfferType[], city: City, mapType: MapType) => (
          <Map
            offers={offers}
            activeCardId={activeCardId}
            city={city}
            mapType={mapType}
          />
        )}
        renderOffersList={(offers: OfferType[], placeType: PlaceType) => (
          placeType === PlaceType.NearPlaces
            ?
            <NearPlaces
              offers={offers}
              placeType={placeType}
              onHoverCard={handleCardHover}
            />
            :
            <PlacesList
              offers={offers}
              placeType={placeType}
              onHoverCard={handleCardHover}
            />
        )}
      />
    );
  }

  return WithMap;
}