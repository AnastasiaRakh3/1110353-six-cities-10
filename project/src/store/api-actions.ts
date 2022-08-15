import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { StateAction } from './action-types';
import { OfferType } from '../types/offer';
import { CommentType } from '../types/comment';
import { State, AppDispatch } from '../types/state';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';
import { ApiRoute, AuthorizationStatus, AppRoute } from '../const';
import {
  loadOffers,
  setLoadOffersStatus,
  requireAuthorization,
  redirectToRoute,
  loadComments,
  loadNearbyOffers,
  loadOffer,
} from './actions';

type ThunkApiConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

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
const fetchOffersAction = createAsyncThunk<void, undefined, ThunkApiConfigType>(
  StateAction.Offer.LoadOffers,
  async (_arg, { dispatch, extra: api }) => {
    // api добавляли при создании хранилища
    // делаем запрос к серверу, у axios есть метод get, который равносилен методу GET, и указываем куда этот запрос нужно отправить
    const { data } = await api.get<OfferType[]>(ApiRoute.Offers);
    // Диспатчим действие loadOffers, передаем loadOffers данные, которые пришли от сервера, затем сработает редьсер, в нем нужный кейс (у нас StateAction.Offer.LoadOffers), и данный будут помещены в поле offers, запишутся в стор
    dispatch(loadOffers(data));
    dispatch(setLoadOffersStatus(true));
  }
);

const fetchOneOfferAction = createAsyncThunk<void, number, ThunkApiConfigType>(
  StateAction.Offer.LoadOffer,
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferType>(`${ApiRoute.Offers}/${id}`);
    dispatch(loadOffer(data));
  }
);

const fetchNearbyOffersAction = createAsyncThunk<
  void,
  number,
  ThunkApiConfigType
>(StateAction.Offer.LoadNearbyOffers, async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferType[]>(`${ApiRoute.Offers}/${id}/nearby`);
  dispatch(loadNearbyOffers(data));
});

const fetchCommentsAction = createAsyncThunk<void, number, ThunkApiConfigType>(
  StateAction.Comment.LoadComments,
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<CommentType[]>(`${ApiRoute.Comments}/${id}`);
    dispatch(loadComments(data));
  }
);

// Проверки наличия авторизации
const checkAuthAction = createAsyncThunk<void, undefined, ThunkApiConfigType>(
  StateAction.User.CheckAuth,
  async (_arg, { dispatch, extra: api }) => {
    try {
      // по этому адресу /login проверяется статус авторизации (по тех заданию), дает ответ либо 200 либо 401
      await api.get(ApiRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

// Отправка данных для прохождения аутентификации
const loginAction = createAsyncThunk<void, AuthData, ThunkApiConfigType>(
  StateAction.User.Login,
  // Присваиваем таким синтаксисом значение из поля login переменной email, так как сервер ждет объект с полями email и password
  async ({ login: email, password }, { dispatch, extra: api }) => {
    // В качестве данных передаем { email, password }
    const {
      // сохранили токен в переменную
      data: { token },
      // когда мы передаем запрос мы передаем параметр типа, у нас UserData, UserData -это тот тип объекта, который нам должен вернуть сервер. Мы это делаем для того, чтобы могли использовать преимущества TS
    } = await api.post<UserData>(ApiRoute.Login, { email, password });
    // сохарнили токен в хранилище
    saveToken(token);
    // диспатчим, что мы авторизованы
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    toast.success('You successfully login');
  }
);

// Отправка запроса на выход из приложения.
const logoutAction = createAsyncThunk<void, undefined, ThunkApiConfigType>(
  StateAction.User.Logout,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoute.Logout);
    // удаляем токен из локал сторидж
    dropToken();
    // диспатчим, что мы не авторизованы
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOneOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
};
