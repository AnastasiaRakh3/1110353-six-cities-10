import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer';

import { StateAction } from '../const';

// createAction() генерирует создателя операции с указанным типом операции и преобразует переданные аргументы в поле payload:
// ex. { type : "changeCity", payload : {city : "..."}} )
// ex. { type : "loadOffers", payload : {offers : "[{}, {}...]"}} )

// функция createAction принимает Generic тип, описывающий, какой тип данных можеть принимать функция, которую она возвращает

const changeCity = createAction<{ city: string }>(StateAction.ChangeCity);
const loadOffers = createAction<OfferType[]>(StateAction.LoadOffers);
const setLoadOffersStatus = createAction<boolean>(StateAction.LoadStatus);

export { changeCity, loadOffers, setLoadOffersStatus };
