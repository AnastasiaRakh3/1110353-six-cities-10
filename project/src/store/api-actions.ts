import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { StateAction } from './action-types';
import { OfferType } from '../types/offer';
import { CommentType, CommentData } from '../types/comment';
import { State, AppDispatch } from '../types/state';
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';
import { ApiRoute, AppRoute } from '../const';
import { redirectToRoute } from './actions';

type ThunkApiConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

const fetchOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  ThunkApiConfigType
>(StateAction.Data.LoadOffers, async (_arg, { extra: api }) => {
  const { data } = await api.get(ApiRoute.Offers);
  return data;
});

const fetchOneOfferAction = createAsyncThunk<
  { offer: OfferType; comments: CommentType[]; nearbyOffers: OfferType[] },
  string,
  ThunkApiConfigType
>(StateAction.Data.LoadOffer, async (id, { extra: api }) => {
  const { data: offer } = await api.get<OfferType>(`${ApiRoute.Offers}/${id}`);
  const { data: comments } = await api.get<CommentType[]>(
    `${ApiRoute.Comments}/${id}`
  );
  const { data: nearbyOffers } = await api.get<OfferType[]>(
    `${ApiRoute.Offers}/${id}/nearby`
  );
  return { offer, comments, nearbyOffers };
});

const sendNewComment = createAsyncThunk<
  CommentType[],
  CommentData,
  ThunkApiConfigType
>(
  StateAction.Data.SendNewComment,
  async ({ roomId, comment, rating }, { extra: api }) => {
    const { data } = await api.post(`${ApiRoute.Comments}/${roomId}`, {
      comment,
      rating,
    });
    return data;
  }
);

const checkAuthAction = createAsyncThunk<string, undefined, ThunkApiConfigType>(
  StateAction.User.CheckAuth,
  async (_arg, { extra: api }) => {
    const {
      data: { email: userName },
    } = await api.get(ApiRoute.Login);
    return userName;
  }
);

const loginAction = createAsyncThunk<string, AuthData, ThunkApiConfigType>(
  StateAction.User.Login,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token, email: userName },
    } = await api.post(ApiRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
    toast.success('You successfully login');
    return userName;
  }
);

const logoutAction = createAsyncThunk<void, undefined, ThunkApiConfigType>(
  StateAction.User.Logout,
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);

const fetchFavoriteOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  ThunkApiConfigType
>(StateAction.Data.LoadFavorites, async (_arg, { extra: api }) => {
  const { data } = await api.get(ApiRoute.Favorite);
  return data;
});

const toggleFavorite = createAsyncThunk<
  OfferType,
  { id: number; status: number },
  ThunkApiConfigType
>(StateAction.Data.ToggleFavorite, async ({ id, status }, { extra: api }) => {
  const { data } = await api.post(`${ApiRoute.Favorite}/${id}/${status}`);
  return data;
});

export {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOneOfferAction,
  sendNewComment,
  fetchFavoriteOffersAction,
  toggleFavorite,
};
