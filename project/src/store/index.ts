import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';

// configureStore(): обертка для createStore(), упрощающая настройку хранилища с настройками по умол. Позволяет автоматически комбинировать отдельные частичные редукторы (slice reducers), добавлять промежуточные слои или посредников (middlewares), по умолчанию включает redux-thunk (преобразователя), позволяет использовать расширение Redux DevTools (инструменты разработчика Redux)

// configureStore() принимает следующий объект:
// функция редуктора, используемая в качестве корневого редуктора,
// или объект с частичными редукторами, автоматически передаваемыми в `combineReducers()`
// reducer: func | object

// Передаем в configureStore() наш корневой редуктор в качестве аргумента reducer
// {reducer: rootReducer}. У нас получается - {reducer: reducer}

export const api = createAPI();

// Инициализация нового хранилища
// Cконфигурируем хранилище. Подключим `redux-thunk` в список middlewares.
// Аргументом для `thunk` передадим сконфигурированный экземпляр `axios`, чтобы была возможность обратиться к нему из действия.

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Санки позволяют нам писать в виде дейсвий, какие то функции, и в них уще писать нужный код
      thunk: {
        // чтобы наши экшены могли получить доступ, передаем наш экземпляр через extraArgument
        extraArgument: api,
      },
    }).concat(redirect),
  // Поскольку результатом должен быть массив, мы можем добавить список собственных middleware с помощью concat
});

// Когда мы будем описывать ассинхронные действия (в api-actions), у нас у action 3м параметром extraArgument передаем настроенный экзампляр axios (api), соответсвенно actions смогут обращаться к axios  и выполнять какие-то действия
