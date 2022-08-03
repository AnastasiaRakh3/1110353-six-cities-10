import dayjs from 'dayjs';

import { OfferType } from './types/offer';
import { CommentType } from './types/comment';
import { SortType } from './const';

const STAR_WIDTH = 20;

const setRatingStarWidth = (element: OfferType | CommentType) =>
  `${STAR_WIDTH * Math.round(element.rating)}%`;

const isPremium = (offer: OfferType, place: string) =>
  offer.isPremium
    ? <div className={`${place}__mark`}><span>Premium</span></div>
    : '';

const isFavorite = (offer: OfferType, place: string) =>
  offer.isFavorite ? `${place}__bookmark-button--active` : '';

const makeFistLetterUp = (word: string): string => {
  const splitted = word.split('');
  const firstLetter = splitted[0].toUpperCase();
  const rest = splitted.slice(1);
  return [firstLetter, ...rest].join('');
};

const checkEnding = (quantity: number) => quantity > 1 ? 's' : '';

const humanizeCommentDate = (date: string) => dayjs(date).format('MMMM YYYY');

const getSortedOffers = (type: string, offers: OfferType[]) => {
  switch (type) {
    case SortType.PriceLowToHigh:
      return offers.sort((offerA: OfferType, offerB: OfferType) => offerA.price - offerB.price);
    case SortType.PriceHighToLow:
      return offers.sort((offerA: OfferType, offerB: OfferType) => offerB.price - offerA.price);
    case SortType.TopRatedFirst:
      return offers.sort((offerA: OfferType, offerB: OfferType) => offerB.rating - offerA.rating);
    default:
      return offers;
  }
};

export { setRatingStarWidth, isPremium, isFavorite, makeFistLetterUp, checkEnding, humanizeCommentDate, getSortedOffers };
