import FavoriteCard from '../favorite-card/favorite-card';
import { OfferType } from '../../types/offer';

type FavoriteListProps = {
  groupedOffers: [string, OfferType[]][];
};

export default function FavoriteList({ groupedOffers }: FavoriteListProps): JSX.Element {

  return (
    <ul className="favorites__list">
      {groupedOffers.map(([city, group]): JSX.Element => (
        <FavoriteCard
          key={city}
          city={city}
          offers={group}
        />
      ))}
    </ul>
  );
}
