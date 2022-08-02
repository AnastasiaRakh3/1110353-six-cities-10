import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

// configureStore(): обертка для createStore(), упрощающая настройку хранилища с настройками по умол. Позволяет автоматически комбинировать отдельные частичные редукторы (slice reducers), добавлять промежуточные слои или посредников (middlewares), по умолчанию включает redux-thunk (преобразователя), позволяет использовать расширение Redux DevTools (инструменты разработчика Redux)

// cofigureStore() принимает следующий объект:
// функция редуктора, используемая в качестве корневого редуктора,
// или объект с частичными редукторами, автоматически передаваемыми в `combineReducers()`
// reducer: func | object

// Передаем вconfigureStore() наш корневой редуктор в качестве аргумента reducer
// {reducer: rootReducer}. У нас получается - {reducer: reducer}

export const store = configureStore({ reducer });
