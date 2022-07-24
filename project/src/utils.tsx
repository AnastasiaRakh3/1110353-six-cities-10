import { OfferType } from './types/offer';
import { CommentType } from './types/comment';

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

export { setRatingStarWidth, isPremium, isFavorite, makeFistLetterUp };
