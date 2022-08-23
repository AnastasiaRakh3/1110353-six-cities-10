// Модуль в котором опишем асинхронные действия, запросы к серверу

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

// createAsyncThunk() упрощает процесс выполнения асинхронных запросов - мы передаем ему тип операции и колбек создателя полезной нагрузки (payload)

// createAsyncThunk() принимает 3 параметра: значение type, колбек payloadCreator и объект options.
// payloadCreator() принимает два аргумента:
// arg: простое значение, содержащее первый параметр, переданный thunk при его отправке. Это может быть полезным для отправки идентификаторов, включаемых в запрос.
// thunkAPI: объект, содержащий все параметры, обычно передаваемый в thunk, а также дополнительные опции:например: dispatch: метод dispatch хранилища Redux

// Сигнатура типов createAsyncThunk:
// function createAsyncThunk<Returned, ThunkArg = void, ThunkApiConfig extends AsyncThunkConfig = {}>

// 1й аргумент дженерика Returned - это то что будет возвращать fetchOffersAction
// 2й аргумент дженерика ThunkArg = void - это тип аргумента(назвала _arg`), так как он не важен мы ему пишем `void, потому что не будем использовать.
// 3й аргумент дженерика ThunkApiConfig - это тип конфига, который лежит вторым аргументом в payloadCreator тоесть это объект из которого достаем extra, назвав его api и протипизировав в дженерике как AxiosInstance

// Для загрузки офферов
const fetchOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  ThunkApiConfigType
>(StateAction.Data.LoadOffers, async (_arg, { extra: api }) => {
  try {
    const { data } = await api.get(ApiRoute.Offers);
    return data;
  } catch (err) {
    // условие для типизации ошибки, иначе ругается
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
});

const fetchOneOfferAction = createAsyncThunk<
  { offer: OfferType; comments: CommentType[]; nearbyOffers: OfferType[] } | undefined,
  string,
  ThunkApiConfigType
>(StateAction.Data.LoadOffer, async (id, { dispatch, extra: api }) => {
  try {
    const { data: offer } = await api.get<OfferType>(`${ApiRoute.Offers}/${id}`);
    const { data: comments } = await api.get<CommentType[]>(
      `${ApiRoute.Comments}/${id}`
    );
    const { data: nearbyOffers } = await api.get<OfferType[]>(
      `${ApiRoute.Offers}/${id}/nearby`
    );
    return { offer, comments, nearbyOffers };
  } catch {
    dispatch(redirectToRoute(AppRoute.NotFound));
  }
});

const sendNewComment = createAsyncThunk<
  CommentType[],
  CommentData,
  ThunkApiConfigType
>(
  StateAction.Data.SendNewComment,
  async ({ roomId, comment, rating }, { extra: api }) => {
    try {
      const { data } = await api.post(`${ApiRoute.Comments}/${roomId}`, {
        comment,
        rating,
      });
      return data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

// Проверки наличия авторизации
const checkAuthAction = createAsyncThunk<string, undefined, ThunkApiConfigType>(
  StateAction.User.CheckAuth,
  async (_arg, { extra: api }) => {
    try {
      const {
        data: { email: userName },
      } = await api.get(ApiRoute.Login);
      return userName;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

// Отправка данных для прохождения аутентификации
const loginAction = createAsyncThunk<string, AuthData, ThunkApiConfigType>(
  StateAction.User.Login,
  // Таким синтаксисом присваиваем значение из поля login переменной email, так как сервер ждет объект с полями email и password
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      // В качестве данных передаем { email, password }
      const {
        // Согласно тз запрос на этот путь возвращает объект, а нам нужно 2 поля: токен и имейл для имени
        data: { token, email: userName },
      } = await api.post(ApiRoute.Login, { email, password });
      // сохарнили токен в хранилище
      saveToken(token);
      dispatch(redirectToRoute(AppRoute.Main));
      toast.success('You successfully login');
      return userName;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

// Отправка запроса на выход из приложения
const logoutAction = createAsyncThunk<void, undefined, ThunkApiConfigType>(
  StateAction.User.Logout,
  async (_arg, { extra: api }) => {
    try {
      await api.delete(ApiRoute.Logout);
      // удаляем токен из локал сторидж
      dropToken();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

const fetchFavoriteOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  ThunkApiConfigType
>(StateAction.Data.LoadFavorites, async (_arg, { extra: api }) => {
  try {
    const { data } = await api.get(ApiRoute.Favorite);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
});

const toggleFavorite = createAsyncThunk<
  OfferType,
  { id: number; status: number },
  ThunkApiConfigType
>(StateAction.Data.ToggleFavorite, async ({ id, status }, { extra: api }) => {
  try {
    const { data } = await api.post(`${ApiRoute.Favorite}/${id}/${status}`);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
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
