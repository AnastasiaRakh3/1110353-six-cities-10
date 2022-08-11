import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { StatusCodes } from 'http-status-codes';

import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { getToken } from './token';
import { handleServerError } from './handle-server-error';

const errorStatusCodeSet = new Set([
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND,
]);

const shouldDisplayError = (response: AxiosResponse) =>
  errorStatusCodeSet.has(response.status);

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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        handleServerError(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
