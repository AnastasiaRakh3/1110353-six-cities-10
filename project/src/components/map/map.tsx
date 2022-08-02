import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';

import useMap from '../../hooks/useMap';
import { City, OfferType } from '../../types/offer';
import { MapType } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: OfferType[];
  mapType: MapType;
};

// new Icon принимает набор параметров для создания альтер. иконки маркера
const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39], // координаты кончика хвоста метки высчитываются от левого верхнего угла иконки
});

export default function Map({ city, offers, mapType }: MapProps): JSX.Element {
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

  // useRef вязываем с HTML-элементом через аттрибут ref, mapRef.current уже не null
  return (
    <section
      className={`map ${mapType}__map`}
      style={mapType === 'property' ? { height: '579px' } : { height: 'auto' }}
      ref={mapRef}
    >
    </section>
  );
}

// Порядок:
// 1. Инициализируем useRef со значением null и привязываем с HTML-элементом через аттрибут ref
// 2. Инициализируем наш хук useMap и передаем ему mapRef и city
// 3. Сначала useRef был null, затем после того как связали с HTML-элементом, элемент с этим ref уже есть в реальном доме, а значит сработает useEffect, так как mapRef есть среди зависимостей
// 4. Там в хуке useMap прежде чем применится эффект, идет условие:
// mapRef.current !== null - првоеряет что ты в хук передан mapRef и что элемент с этим рефом уже есть в реальном DOM (а мы связали mapRef с HTML-элементом и значит он есть)
// !isRenderedRef.current - срабатывает 1 раз и в самый первый раз
// 5. Отрисовывается карта и isRenderedRef.current становится true, а значит пока сама карта не изменится, сам html элемент, или город, то больше эффект не сработает

