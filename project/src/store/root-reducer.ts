import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { dataProcess } from './data-process/data-process';
import { cityProcess } from './city-process/city-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.City]: cityProcess.reducer,
});
