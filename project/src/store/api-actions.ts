import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ApiRoute } from '../const';
import { OfferType } from '../types/offer';
import { State, AppDispatch } from '../types/state';
import { loadOffers, setLoadOffersStatus } from './actions';
import { StateAction } from './action-types';

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
// 2й аргумент дженерика ThunkArg = void - это тип аргумента(ты его назвала _arg`), так как он на не важен мы ему пишем `void, потому что не будем использовать.
// 3й аргумент дженерика ThunkApiConfig extends AsyncThunkConfig = {} - это тип конфига, который лежит вторым аргументом в payloadCreator тоесть это объект из которого ты достаешь extra назвав его api и протипизировав в дженерике как AxiosInstance

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
