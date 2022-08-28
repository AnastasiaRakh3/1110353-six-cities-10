import { createSlice } from '@reduxjs/toolkit';

import { CityProcess } from '../../types/state';
import { DEFAULT_CITY_NAME, NameSpace } from '../../const';

const initialState: CityProcess = {
  city: DEFAULT_CITY_NAME,
};

export const cityProcess = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload.city;
    },
  },
});

export const { changeCity } = cityProcess.actions;
