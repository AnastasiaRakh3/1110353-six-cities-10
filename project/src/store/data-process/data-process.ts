import { createSlice } from '@reduxjs/toolkit';

import { DataProcess } from '../../types/state';
import { NameSpace } from '../../const';
import {
  fetchOffersAction,
  fetchOneOfferAction,
  sendNewComment,
  fetchFavoriteOffersAction,
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
      });
  },
});
