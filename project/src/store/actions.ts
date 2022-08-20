import { createAction } from '@reduxjs/toolkit';

import { StateAction } from './action-types';
import { AppRoute } from '../const';

// createAction() генерирует создателя операции с указанным типом операции и преобразует переданные аргументы в поле payload:
// ex. { type : "changeCity", payload : {city : "..."}} )
// ex. { type : "loadOffers", payload : {offers : "[{}, {}...]"}} )

// функция createAction принимает Generic тип, описывающий, какой тип данных можеть принимать функция, которую она возвращает

const redirectToRoute = createAction<AppRoute>(
  StateAction.User.RedirectToRoute
);

export { redirectToRoute };
