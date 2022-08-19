import { State } from '../types/state';

// Селектор это функция, которая извлекает данные из хранилища
// Создаем файл, чтобы в случае изменений в сторе, мы сделали изменения только в этом месте

const getCity = (state: State) => state.city;
const getOffers = (state: State) => state.offers;
const getActiveOffer = (state: State) => state.activeOffer;
const getComments = (state: State) => state.comments;
const getNearbyOffers = (state: State) => state.nearbyOffers;
const getIsOffersListLoading = (state: State) => state.isOffersListLoading;
const getIsActiveOfferLoading = (state: State) => state.isActiveOfferLoading;
const getIsNewCommentSending = (state: State) => state.isNewCommentSending;
const getAuthorizationStatus = (state: State) => state.authorizationStatus;
const getUserName = (state: State) => state.userName;

export {
  getCity,
  getOffers,
  getActiveOffer,
  getComments,
  getNearbyOffers,
  getIsOffersListLoading,
  getIsActiveOfferLoading,
  getIsNewCommentSending,
  getAuthorizationStatus,
  getUserName,
};
