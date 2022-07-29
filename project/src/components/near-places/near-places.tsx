import PlacesList from '../../components/places-list/places-list';
import { OfferType } from '../../types/offer';

type NearPlacesProps = {
  offersList: OfferType[];
  placeType: string,
};

export default function NearPlaces({ offersList, placeType }: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <PlacesList offersList={offersList} placeType={placeType} />
    </section>
  );
}
