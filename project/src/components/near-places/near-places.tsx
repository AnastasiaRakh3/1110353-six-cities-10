import PlacesList from '../../components/places-list/places-list';
import { OfferType } from '../../types/offer';
import { PlaceType } from '../../const';

type NearPlacesProps = {
  offers: OfferType[];
  placeType: PlaceType,
  onHoverCard: (id: number | null) => void;
};

export default function NearPlaces({ offers, placeType, onHoverCard }: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <PlacesList offers={offers} placeType={placeType} onHoverCard={onHoverCard} />
    </section>
  );
}
