import { useRef, useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';

import { City } from '../types/offer';

// Чтобы не привязывать процесс создания карты к отдельному компоненту и получить свободу переиспользования
// Хук useState добавит состояние для пользовательского хука и useEffect — возможность применять побочные эффекты

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City) {
  const [map, setMap] = useState<Map | null>(null);
  // Инициализируем свойство current переданным аргументом, чтобы потом сделать условие на 1ю отрисовку
  // Не можем просто присвоить переменой булево значение, так как значение isRenderedRef будет теряться после каждой отрисовке ex.let isRenderedRef = false;
  const isRenderedRef = useRef<boolean>(false);
  // Вызов useRef возвращает объект
  // console.log(isRenderedRef) - {current: false}, потом {current: true}

  useEffect(() => {
    // Проверка на первую отрисовку карты и что mapRef уже прикрепили к html элементу
    if (mapRef.current !== null && !isRenderedRef.current) {
      // new Map - создает карту
      // Map: 1й аргумент - ссылка на HTML-элемент (куда отрендерить карту)
      // Map: 2й аргумент - объект доп. параметров
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom,
      });

      // TileLayer - позволяет подключить определенный слой карты. Мы взяли слой voyager

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      // Метод addTo указывает к какому объекту карты добавить подключенный слой
      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}
