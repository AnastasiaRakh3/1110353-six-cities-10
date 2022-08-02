import { store } from '../store';

// ReturnType означает «Тип возвращаемого значения функции»
// typeof определяет тип
// store.getState - это функция, которая возвращает объект состояния

// Передача действий с потоками данных происходит через вызов метода dispatch() в хранилище
// store.dispatch(addItem('Something'))

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
