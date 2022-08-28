import { store } from '../store';

import { OfferType } from './offer';
import { CommentType } from './comment';
import { AuthorizationStatus } from '../const';

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userName: string;
};

type DataProcess = {
  offers: OfferType[];
  activeOffer: OfferType | null;
  comments: CommentType[];
  nearbyOffers: OfferType[];
  isOffersListLoading: boolean;
  isActiveOfferLoading: boolean;
  isActiveOfferError: boolean;
  isNewCommentSending: boolean;
  favoriteOffers: OfferType[];
};

type CityProcess = {
  city: string;
};

type FavoriteProcess = {
  currentFavoriteOffer: OfferType | null;
};

export type {
  State,
  AppDispatch,
  UserProcess,
  DataProcess,
  CityProcess,
  FavoriteProcess,
};
