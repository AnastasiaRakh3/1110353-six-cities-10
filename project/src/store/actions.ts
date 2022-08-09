import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer';

// createAction() генерирует создателя операции с указанным типом операции и преобразует переданные аргументы в поле payload:
// ex. { type : "changeCity", payload : {city : "..."}} )
// ex. { type : "loadOffers", payload : {offers : "[{}, {}...]"}} )

// функция createAction принимает Generic тип, описывающий, какой тип данных можеть принимать функция, которую она возвращает

const changeCity = createAction<{ city: string }>('changeCity');
const loadOffers = createAction<OfferType[]>('loadOffers');
const setLoadOffersStatus = createAction<boolean>('loadStatus');

export { changeCity, loadOffers, setLoadOffersStatus };
