import { rootReducer } from '../root-reducer';
import { Middleware } from '@reduxjs/toolkit';

import { browserHistory } from '../../browser-history';
import { StateAction } from '../action-types';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action) => {
    if (action.type === StateAction.User.RedirectToRoute) {
      browserHistory.push(action.payload);
    }
    return next(action);
  };
