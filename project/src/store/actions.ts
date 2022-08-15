import { createAction } from '@reduxjs/toolkit';

import { OfferType } from '../types/offer';
import { CommentType } from '../types/comment';
import { StateAction } from './action-types';
import { AuthorizationStatus, AppRoute } from '../const';

// createAction() генерирует создателя операции с указанным типом операции и преобразует переданные аргументы в поле payload:
// ex. { type : "changeCity", payload : {city : "..."}} )
// ex. { type : "loadOffers", payload : {offers : "[{}, {}...]"}} )

// функция createAction принимает Generic тип, описывающий, какой тип данных можеть принимать функция, которую она возвращает

const changeCity = createAction<{ city: string }>(StateAction.City.ChangeCity);

const loadOffers = createAction<OfferType[]>(StateAction.Offer.LoadOffers);
const setLoadOffersStatus = createAction<boolean>(StateAction.Offer.LoadStatus);
const loadOffer = createAction<OfferType>(StateAction.Offer.LoadOffer);
const loadNearbyOffers = createAction<OfferType[]>(StateAction.Offer.LoadNearbyOffers);

const loadComments = createAction<CommentType[]>(StateAction.Comment.LoadComments);

const requireAuthorization = createAction<AuthorizationStatus>(StateAction.User.RequireAuth);
const setUserName = createAction<string>(StateAction.User.SetUserName);
const redirectToRoute = createAction<AppRoute>(StateAction.User.RedirectToRoute);

const setServerError = createAction<string | null>(StateAction.Error.SetServerError);

export { changeCity, loadOffers, setLoadOffersStatus, requireAuthorization, setServerError, redirectToRoute, loadComments, loadNearbyOffers, loadOffer, setUserName};
