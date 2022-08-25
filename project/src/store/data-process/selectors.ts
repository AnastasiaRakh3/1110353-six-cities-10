import { State } from '../../types/state';
import { NameSpace } from '../../const';

const getOffers = (state: State) => state[NameSpace.Data].offers;

const getActiveOffer = (state: State) => state[NameSpace.Data].activeOffer;

const getIsActiveOfferError = (state: State) =>
  state[NameSpace.Data].isActiveOfferError;

const getComments = (state: State) => state[NameSpace.Data].comments;

const getNearbyOffers = (state: State) => state[NameSpace.Data].nearbyOffers;

const getIsOffersListLoading = (state: State) =>
  state[NameSpace.Data].isOffersListLoading;

const getIsActiveOfferLoading = (state: State) =>
  state[NameSpace.Data].isActiveOfferLoading;

const getIsNewCommentSending = (state: State) =>
  state[NameSpace.Data].isNewCommentSending;

const getFavoriteOffers = (state: State) =>
  state[NameSpace.Data].favoriteOffers;

export {
  getOffers,
  getActiveOffer,
  getIsActiveOfferError,
  getComments,
  getNearbyOffers,
  getIsOffersListLoading,
  getIsActiveOfferLoading,
  getIsNewCommentSending,
  getFavoriteOffers,
};
