import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/useMap';
import { City, OfferType } from '../../types/offer';
import { getMapType } from '../../utils';
import { iconUrl } from '../../const';

type MapProps = {
  city: City;
  offers: OfferType[];
  activeCardId: number | null;
};

const DEFAULT_ICON = new Icon({
  iconUrl: iconUrl.Default,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const ACTIVE_ICON = new Icon({
  iconUrl: iconUrl.Active,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export default function Map({ city, offers, activeCardId }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const { pathname } = useLocation();
  const mapType = getMapType(pathname);
  const { latitude, longitude, zoom } = city.location;

  useEffect(() => {
    if (map) {
      map.setView({ lat: latitude, lng: longitude }, zoom, { animate: true, duration: 1 });
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(offer.id === activeCardId ? ACTIVE_ICON : DEFAULT_ICON)
          .addTo(map);
      });
    }
  }, [map, offers, activeCardId, latitude, longitude, zoom]);

  return (
    <section
      className={`map ${mapType}__map`}
      style={mapType === 'property' ? { height: '579px' } : { height: 'auto' }}
      ref={mapRef}
    >
    </section>
  );
}

