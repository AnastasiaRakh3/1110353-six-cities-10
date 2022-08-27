import { PLACES_LIST_CLASSES, PlaceType } from '../../const';
import PlaceCard from '../place-card/place-card';
import { OfferType } from '../../types/offer';

type NearPlacesProps = {
  offers: OfferType[];
  placeType: PlaceType,
};

export default function NearPlaces({ offers, placeType }: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className={`places__list ${PLACES_LIST_CLASSES[placeType]}`}>
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            placeType={placeType}
          />
        ))}

      </div>
    </section>
  );
}
