import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { getToken } from './token';

// axios - библиотека для выполнения запросов (идет уже с CRA)
// AxiosInstance - для типизации
// AxiosRequestConfig- это тип объекта, который можем использовать для переопределения параметров конфигурации запроса axios, таких как headers, timeout, withCredentials и многих других.

// функция, которая создает экзаемпляр axios
export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // Добавим извлечение токена из `localStorage` и вставим его в заголовки. Для этого нам потребуется воспользоваться перехватчиками, а именно перехватчиком запроса.

  // Добавляем перехват запросов
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};
