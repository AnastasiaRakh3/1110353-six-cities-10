import PlaceCard from '../place-card/place-card';
import { PLACES_LIST_CLASSES, PlaceType } from '../../const';
import { OfferType } from '../../types/offer';

type PlacesListProps = {
  offers: OfferType[];
  placeType: PlaceType;
  onHoverCard: (id: number | null) => void;
}

export default function PlacesList({ offers, placeType, onHoverCard }: PlacesListProps) {

  return (
    <div className={`places__list ${PLACES_LIST_CLASSES[placeType]}`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onHoverCard={onHoverCard}
          placeType={placeType}
        />
      ))}
    </div>
  );
}
