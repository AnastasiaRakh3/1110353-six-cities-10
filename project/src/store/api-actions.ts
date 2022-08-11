import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ApiRoute, AuthorizationStatus } from '../const';
import {
  loadOffers,
  setLoadOffersStatus,
  requireAuthorization,
} from './actions';
import { saveToken, dropToken } from '../services/token';
import { StateAction } from './action-types';
import { OfferType } from '../types/offer';
import { State, AppDispatch } from '../types/state';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

// Модуль в котором опишем асинхронные действия. В этих действиях будем выполнять запросы к серверу

// createAsyncThunk() упрощает процесс выполнения асинхронных запросов - мы передаем ему тип операции и колбек создателя полезной нагрузки (payload), выполняющего реальную асинхронную логику и возвращающего промис с результатом.

// createAsyncThunk() принимает три параметра: значение type, колбек payloadCreator и объект options.
// payloadCreator() принимает два аргумента:
// arg: простое значение, содержащее первый параметр, переданный thunk при его отправке. Это может быть полезным для отправки идентификаторов, включаемых в запрос.
// thunkAPI: объект, содержащий все параметры, обычно передаваемый в thunk, а также дополнительные опции:например:
// dispatch: метод dispatch хранилища Redux

// Сигнатура типов createAsyncThunk:
// function createAsyncThunk<Returned, ThunkArg = void, ThunkApiConfig extends AsyncThunkConfig = {}>

// 1й аргумент дженерика Returned - это то что будет возвращать fetchOffersAction
// 2й аргумент дженерика ThunkArg = void - это тип аргумента(назвала _arg`), так как он не важен мы ему пишем `void, потому что не будем использовать.
// 3й аргумент дженерика ThunkApiConfig extends AsyncThunkConfig = {} - это тип конфига, который лежит вторым аргументом в payloadCreator тоесть это объект из которого ты достаешь extra назвав его api и протипизировав в дженерике как AxiosInstance

// Для загрузки офферов
export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(StateAction.LoadOffers, async (_arg, { dispatch, extra: api }) => {
  // api добавляли при создании хранилища
  const { data } = await api.get<OfferType[]>(ApiRoute.Offers);
  dispatch(loadOffers(data));
  dispatch(setLoadOffersStatus(true));
});

// Проверки наличия авторизации
export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(StateAction.CheckAuth, async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(ApiRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

// Отправка данных для прохождения аутентификации
export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  StateAction.Login,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

// Отправка запроса на выход из приложения.
export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(StateAction.Logout, async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
