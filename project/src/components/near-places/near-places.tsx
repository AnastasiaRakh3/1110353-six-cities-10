import PlacesList from '../../components/places-list/places-list';
import { OfferType } from '../../types/offer';
import { PlaceType } from '../../const';

type NearPlacesProps = {
  offersList: OfferType[];
  placeType: PlaceType,
};

export default function NearPlaces({ offersList, placeType }: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <PlacesList offersList={offersList} placeType={placeType} />
    </section>
  );
}
