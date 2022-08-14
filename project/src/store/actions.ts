import { createAction } from '@reduxjs/toolkit';

import { OfferType } from '../types/offer';
import { StateAction } from './action-types';
import { AuthorizationStatus, AppRoute } from '../const';

// createAction() генерирует создателя операции с указанным типом операции и преобразует переданные аргументы в поле payload:
// ex. { type : "changeCity", payload : {city : "..."}} )
// ex. { type : "loadOffers", payload : {offers : "[{}, {}...]"}} )

// функция createAction принимает Generic тип, описывающий, какой тип данных можеть принимать функция, которую она возвращает

const changeCity = createAction<{ city: string }>(StateAction.ChangeCity);
const loadOffers = createAction<OfferType[]>(StateAction.LoadOffers);
const setLoadOffersStatus = createAction<boolean>(StateAction.LoadStatus);
const requireAuthorization = createAction<AuthorizationStatus>(StateAction.RequireAuth);
const setServerError = createAction<string | null>(StateAction.SetServerError);
const redirectToRoute = createAction<AppRoute>(StateAction.RedirectToRoute);

export { changeCity, loadOffers, setLoadOffersStatus, requireAuthorization, setServerError, redirectToRoute };
