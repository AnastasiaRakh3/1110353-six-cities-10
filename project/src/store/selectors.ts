import { State } from '../types/state';
import { NameSpace } from '../const';

// Селектор — обычная функция, которая возвращает значение нужного поля хранилища
// Создаем файл, чтобы в случае изменений в сторе, мы сделали изменения только в этом месте

const getCity = (state: State) => state[NameSpace.City].city;
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
const getAuthorizationStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus;
const getUserName = (state: State) => state[NameSpace.User].userName;

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
