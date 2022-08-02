import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { State, AppDispatch } from '../types/state';

// Файл нужен в основном, чтобы типизировать хуки

// useDispatch - хук, возвращающий dispatch метод из редакса, с помощью которого можно диспатчить экшены(отправлять).
// useSelector - хук, принимающая на вход селектор - метод, который принимает redux state и возвращает из него необходимые данные.
// TypedUseSelectorHook - это просто переопределение машинописного текста. Наш useTypedSelector равен useSelector.

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
