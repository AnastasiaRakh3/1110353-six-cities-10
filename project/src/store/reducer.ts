import { createReducer } from '@reduxjs/toolkit';

import { changeCity, loadOffers } from './actions';
import { offersList } from '../mocks/offers';
import { DEFAULT_CITY_NAME } from '../const';

const initialState = {
  city: DEFAULT_CITY_NAME,
  offers: offersList,
};

// reducer — чистая функция которая будет отвечать за обновление состояния, обновление полей store.
// Функция принимает значение текущего состояния и обьект события (action).
// Обьект события содержит два свойства — это тип события (action.type) и значение события (action.value).
// { type: "ACTION_1", value: "Здесь значение поля формы"}

// createReducer() принимает функцию обратного вызова, получающую объект builder в качестве аргумента. "Строитель" предоставляет методы addCase(), addMatcher() и addDefaultCase(), которые могут вызываться для определения действий, выполняемых редуктором.
// Параметры
// initialState - нач. состояние, используемое при 1м вызове редуктора
// builderCallback - колбек, принимающий объект builder для определения редуктора случая путем builder.addCase

// Для именования функций-редьюсеров применяются существительные (у нас reducer)
// Результатом выполнения редьюсера станет новое состояние

const reducer = createReducer(initialState, (builder) => {
  builder
    // Здесь будет автоматически вызван `changeCity.toString()`(доп.функционал от Redux)
    // При использовании TypeScript, будет правильно предложен (предположен) тип операции
    .addCase(changeCity, (state, action) => {
      const { city } = action.payload;
      state.city = city;
    })
    .addCase(loadOffers, (state, action) => {
      const { offers } = action.payload;
      state.offers = offers;
    });
});

export { reducer };
