import { useState } from 'react';

import PlaceCard from '../place-card/place-card';
import { PLACES_LIST_CLASSES, PlaceType } from '../../const';
import { OfferType } from '../../types/offer';

type PlacesListProps = {
  offersList: OfferType[];
  placeType: PlaceType;
}

export default function PlacesList({ offersList, placeType }: PlacesListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOffer, setActiveOffer] = useState({});

  return (
    <div className={`places__list ${PLACES_LIST_CLASSES[placeType]}`}>
      {offersList.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          setActiveOffer={setActiveOffer}
          placeType={placeType}
        />
      ))}
    </div>
  );
}
