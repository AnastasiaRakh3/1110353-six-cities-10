import axios, { AxiosInstance } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';

// axios - библиотека для выполнения запросов (идет уже с CRA)
// AxiosInstance - для типизации

// функция, которая создает экзаемпляр axios
export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
