import { createAction } from '@reduxjs/toolkit';

import { StateAction } from './action-types';
import { AppRoute } from '../const';

const redirectToRoute = createAction<AppRoute>(
  StateAction.User.RedirectToRoute
);

export { redirectToRoute };
