import { createSlice } from '@reduxjs/toolkit';

import { DataProcess } from '../../types/state';
import { NameSpace } from '../../const';
import {
  fetchOffersAction,
  fetchOneOfferAction,
  sendNewComment,
  fetchFavoriteOffersAction,
  toggleFavorite,
} from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  activeOffer: null,
  comments: [],
  nearbyOffers: [],
  isOffersListLoading: false,
  isActiveOfferLoading: false,
  isNewCommentSending: false,
  favoriteOffers: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersListLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersListLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOneOfferAction.pending, (state) => {
        state.isActiveOfferLoading = true;
      })
      .addCase(fetchOneOfferAction.fulfilled, (state, action) => {
        state.isActiveOfferLoading = false;
        state.activeOffer = action.payload.offer;
        state.comments = action.payload.comments;
        state.nearbyOffers = action.payload.nearbyOffers;
      })
      .addCase(sendNewComment.pending, (state) => {
        state.isNewCommentSending = true;
      })
      .addCase(sendNewComment.fulfilled, (state, action) => {
        state.isNewCommentSending = false;
        state.comments = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const offer = action.payload;
        // const {payload : offer} = action;

        // Проверка на то, добавился ли офер в избранное
        if (offer.isFavorite) {
          state.favoriteOffers.push(offer);
        } else {
          // если нет, то обновляем снова массив избранных, убирая наш офер
          state.favoriteOffers = state.favoriteOffers.filter(
            (item) => item.id !== offer.id
          );
        }

        // Находим в хранилище массив со всеми предложениями и выбираем тот, у кого кликаем на кнопку
        const currentOffer = state.offers.find((item) => item.id === offer.id);
        // Необходимая проверка, что currentOffer не undefined, иначе ругается
        if (currentOffer) {
          // Изменяем поле isFavorite на обратное
          currentOffer.isFavorite = !currentOffer.isFavorite;
        }

        // Находим в хранилище массив с предложениями поблизости и выбираем тот, у кого кликаем на кнопку
        const currentNearbyOffer = state.nearbyOffers.find(
          (item) => item.id === offer.id
        );
        if (currentNearbyOffer) {
          currentNearbyOffer.isFavorite = !currentNearbyOffer.isFavorite;
        }

        // Изменяем поле isFavorite на обратное у активного офера(который на room-screen)
        if (offer.id === state.activeOffer?.id) {
          state.activeOffer.isFavorite = !state.activeOffer?.isFavorite;
        }
      });
  },
});
