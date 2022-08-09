import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './reducer';
import { createAPI } from '../services/api';

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
      thunk: {
        extraArgument: api,
      },
    }),
});

// Когда мы будем описывать ассинхронные действия (в api-actions), у нас у action 3м параметром extraArgument передаем настроенный экзампляр axios (api), соответсвенно actions смогут обращаться к axios  и выполнять какие-то действия
