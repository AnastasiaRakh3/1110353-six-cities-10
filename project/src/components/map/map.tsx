import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';

import useMap from '../../hooks/useMap';
import { City, OfferType } from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: OfferType[];
};

// new Icon принимает набор параметров для создания альтер. иконки маркера
const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39], // координаты кончика хвоста метки высчитываются от левого верхнего угла иконки
});

export default function Map({ city, offers }: MapProps): JSX.Element {
  // useRef инициализируем
  const mapRef = useRef(null);
  // useMap будет срабатывать только когда в компоненте useMap будут обновлены значения переменных mapRef, map и city
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        // new Marker - параметр - объект с координатами точки, куда нужно поставить маркер
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        // Если не использовать setIcon - маркер на карте будет отмечен стандарной иконкой из пакета leaflet
        // setIcon для указания альтернативного вида иконки маркера
        // addTo - указывает на какую карту добавить маркер
        marker.setIcon(defaultIcon).addTo(map);
      });
    }
  }, [map, offers]);

  // useRef вязываем с HTML-элементом через аттрибут ref
  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}
