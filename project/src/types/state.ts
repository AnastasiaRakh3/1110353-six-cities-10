import { store } from '../store';

import { OfferType } from './offer';
import { CommentType } from './comment';
import { AuthorizationStatus } from '../const';

// ReturnType означает «Тип возвращаемого значения функции»
// typeof определяет тип
// store.getState - это функция, которая возвращает объект состояния

// Передача действий с потоками данных происходит через вызов метода dispatch() в хранилище
// store.dispatch(addItem('Something'))

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
  isNewCommentSending: boolean;
  favoriteOffers: OfferType[],
};

type CityProcess = {
  city: string;
};

export type { State, AppDispatch, UserProcess, DataProcess, CityProcess };
