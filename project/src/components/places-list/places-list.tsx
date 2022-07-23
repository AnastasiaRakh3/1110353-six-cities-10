import { useState } from 'react';

import PlaceCard from '../place-card/place-card';
import { OfferType } from '../../types/offer';

type PlacesListProps = {
  offersList: OfferType[];
}

export default function PlacesList({ offersList }: PlacesListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOffer, setActiveOffer] = useState({});

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onPlaceCardMouseOver={() => setActiveOffer(offer)}
        />
      ))}
    </div>
  );
}
