import { createReducer } from '@reduxjs/toolkit';

import { changeCity, loadOffers, setLoadOffersStatus } from './actions';
import { OfferType } from '../types/offer';
import { DEFAULT_CITY_NAME } from '../const';

type initialStateType = {
  city: string;
  offers: OfferType[];
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  city: DEFAULT_CITY_NAME,
  offers: [],
  isDataLoaded: true,
};

// reducer — чистая функция которая будет отвечать за обновление состояния, обновление полей store.

// createReducer() принимает функцию обратного вызова, получающую объект builder в качестве аргумента. "Строитель" предоставляет методы addCase(), addMatcher() и addDefaultCase(), которые могут вызываться для определения действий, выполняемых редуктором.
// Параметры
// initialState - нач. состояние, используемое при 1м вызове редуктора
// builderCallback - колбек, принимающий объект builder для определения редуктора случая путем builder.addCase
// Результатом выполнения редьюсера станет новое состояние

const reducer = createReducer(initialState, (builder) => {
  builder
    // Здесь будет автоматически вызван `changeCity.toString()`(доп.функционал от Redux)
    // При использовании TypeScript, будет правильно предложен тип операции
    .addCase(changeCity, (state, action) => {
      // Метод addCase
      // 1й параметр - тип события
      // 2й параметр - обработчик события changeCity, который принимает state и action
      // action - { type : "changeCity", payload : {city : "..."}}, а в payload объект, который мы передаем при клике на элемент локации, и в списке локаций этот город прописываем в поле city у состояния
      // В компоненте генерирую соыбытие changeCity с нужным городом
      // const handleSelectCity = (name: string) => { dispatch(changeCity({ city: name }));};
      // "мутируем" объект состояния, перезаписывая его поле `city`
      state.city = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setLoadOffersStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export { reducer };
