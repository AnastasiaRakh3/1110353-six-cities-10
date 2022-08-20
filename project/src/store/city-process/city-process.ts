import { createSlice } from '@reduxjs/toolkit';

import { CityProcess } from '../../types/state';
import { DEFAULT_CITY_NAME, NameSpace } from '../../const';

const initialState: CityProcess = {
  city: DEFAULT_CITY_NAME,
};

// createSlice(): принимает объект, содержащий редуктор, название части состояния (state slice), начальное значение состояния, и автоматически генерирует частичный редуктор с соответствующими создателями и типами операции

// createSlice() анализирует функции, определенные в поле reducers, создает редуктор для каждого случая и генерирует создателя, использующего название редуктора в качестве типа операции. Таким образом, редуктор changeCity становится типом операции city/changeCity, а создатель changeCity() возвращает операцию с этим типом.

// Сначала, мы определяем редуктор и создателей с помощью `createSlice()
export const cityProcess = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload.city;
    },
  },
});

// Деструктурируем и экспортируем обычного создателя
export const { changeCity } = cityProcess.actions;
