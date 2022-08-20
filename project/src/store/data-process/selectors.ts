import { State } from '../../types/state';
import { NameSpace } from '../../const';

const getOffers = (state: State) => state[NameSpace.Data].offers;

const getActiveOffer = (state: State) => state[NameSpace.Data].activeOffer;

const getComments = (state: State) => state[NameSpace.Data].comments;

const getNearbyOffers = (state: State) => state[NameSpace.Data].nearbyOffers;

const getIsOffersListLoading = (state: State) =>
  state[NameSpace.Data].isOffersListLoading;

const getIsActiveOfferLoading = (state: State) =>
  state[NameSpace.Data].isActiveOfferLoading;

const getIsNewCommentSending = (state: State) =>
  state[NameSpace.Data].isNewCommentSending;

export {
  getOffers,
  getActiveOffer,
  getComments,
  getNearbyOffers,
  getIsOffersListLoading,
  getIsActiveOfferLoading,
  getIsNewCommentSending,
};
