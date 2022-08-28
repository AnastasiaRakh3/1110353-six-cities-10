import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { getToken } from './token';

const errorStatusCodeSet = new Set([
  StatusCodes.BAD_REQUEST,
  StatusCodes.NOT_FOUND,
]);

const shouldDisplayError = (response: AxiosResponse) =>
  errorStatusCodeSet.has(response.status);

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

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
        toast.error(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
