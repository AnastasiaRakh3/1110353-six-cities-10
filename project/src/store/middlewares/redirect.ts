import { reducer } from '../reducer';
import { Middleware } from '@reduxjs/toolkit';

import { browserHistory } from '../../browser-history';
import { StateAction } from '../action-types';

type Reducer = ReturnType<typeof reducer>;

// Синтаксис для создания своего Middleware
// Наша функция должна возвращать другую функцию, а та должна возвращать ещё одну функцию. Через параметры этих функций мы сможем получить доступ к хранилищу, действию и возможность диспатчнуть действие.

// параметр next - обычно его так называют, он выполняет действие и передаёт результат дальше, следующему middleware
export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action) => {
    if (action.type === StateAction.RedirectToRoute) {
      browserHistory.push(action.payload);
    }
    return next(action);
  };
