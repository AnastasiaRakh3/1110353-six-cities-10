import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer';

// createAction() генерирует создателя операции с указанным типом операции и преобразует переданные аргументы в поле payload:
// ex. { type : "changeCity", payload : {city : "..."}} )
// ex. { type : "loadOffers", payload : {cityOffers : "[{}, {}...]"}} )

const changeCity = createAction<{ city: string }>('changeCity');
const loadOffers = createAction<{ cityOffers: OfferType[] }>('loadOffers');

export { changeCity, loadOffers };
