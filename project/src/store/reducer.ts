import { createReducer } from '@reduxjs/toolkit';

import { OfferType } from '../types/offer';
import { CommentType } from '../types/comment';
import { DEFAULT_CITY_NAME, AuthorizationStatus } from '../const';
import {
  changeCity,
  loadOffers,
  setLoadOffersStatus,
  requireAuthorization,
  loadOffer,
  loadNearbyOffers,
  loadComments,
  setUserName,
  setLoadActiveOfferStatus,
  setSendNewCommentStatus,
} from './actions';

type initialStateType = {
  city: string;
  offers: OfferType[];
  activeOffer: OfferType | null;
  comments: CommentType[];
  nearbyOffers: OfferType[];
  isOffersListLoading: boolean;
  isActiveOfferLoading: boolean;
  isNewCommentSending: boolean;
  authorizationStatus: AuthorizationStatus;
  userName: string;
};

const initialState: initialStateType = {
  city: DEFAULT_CITY_NAME,
  offers: [],
  activeOffer: null,
  comments: [],
  nearbyOffers: [],
  isOffersListLoading: false,
  isActiveOfferLoading: false,
  isNewCommentSending: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userName: '',
};

// reducer — чистая функция которая будет отвечать за обновление состояния, обновление полей store.

// createReducer() принимает функцию обратного вызова, получающую объект builder в качестве аргумента. "Строитель" предоставляет методы addCase(), addMatcher() и addDefaultCase(), которые могут вызываться для определения действий, выполняемых редуктором.
// Параметры
// initialState - нач. состояние, используемое при 1м вызове редуктора
// builderCallback - колбек, принимающий объект builder для определения редуктора случая путем builder.addCase
// Результатом выполнения редьюсера станет новое состояние

const reducer = createReducer(initialState, (builder) => {
  builder
    // Здесь будет автоматически вызван `changeCity.toString()`(доп.функционал от Redux)
    // При использовании TypeScript, будет правильно предложен тип операции
    .addCase(changeCity, (state, action) => {
      // Метод addCase
      // 1й параметр - тип события
      // 2й параметр - обработчик события changeCity, который принимает state и action
      // action - { type : "changeCity", payload : {city : "..."}}, а в payload объект, который мы передаем при клике на элемент локации, и в списке локаций этот город прописываем в поле city у состояния
      // В компоненте генерирую соыбытие changeCity с нужным городом
      // const handleSelectCity = (name: string) => { dispatch(changeCity({ city: name }));};
      // "мутируем" объект состояния, перезаписывая его поле `city`
      state.city = action.payload.city;
    })

    // offer
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setLoadOffersStatus, (state, action) => {
      state.isOffersListLoading = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(setLoadActiveOfferStatus, (state, action) => {
      state.isActiveOfferLoading = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })

    // comment
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setSendNewCommentStatus, (state, action) => {
      state.isNewCommentSending = action.payload;
    })

    // user
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserName, (state, action) => {
      state.userName = action.payload;
    });
});

export { reducer };
