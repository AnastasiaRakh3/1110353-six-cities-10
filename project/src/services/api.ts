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

// Перечисляем код, который будут говорить, что у нас произошла ошибка
const errorStatusCodeSet = new Set([
  // названия в библиотеке StatusCodes
  StatusCodes.BAD_REQUEST, // 400  напрямую связан с клиентом (браузером, к примеру) и намекает на то, что отправленный запрос со стороны пользователя приводит к сбою еще до того, как его обработает сервер
  // Уберем UNAUTHORIZED, так как тоаст выходит дважды и по сути никакой роли не играет
  // StatusCodes.UNAUTHORIZED, // 401
  StatusCodes.NOT_FOUND, // 404 - когда вводим адрес url которого у нас нет
]);

// Функция, которая будет принимать ответ с сервера и возвращать есть ли такой ответ в нашем перечислении, нужно ли нам будет показать ошибку или нет (для этого воспользуемся интерсептером для ответа)
const shouldDisplayError = (response: AxiosResponse) =>
  errorStatusCodeSet.has(response.status);

// axios - библиотека для выполнения запросов (идет уже с CRA)
// AxiosInstance - для типизации
// AxiosRequestConfig- это тип объекта, который можем использовать для переопределения параметров конфигурации запроса axios, таких как headers, timeout, withCredentials и многих других.(в нашем случае переопределим заголовок)

// Конфигурируем экземпляр axios
export const createAPI = (): AxiosInstance => {
  // функция, которая создает экзаемпляр axios, ему передаем объект с настройками
  const api = axios.create({
    // baseURL- базовый url, от него будут стоиться остальные запросы
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // Добавляем перехват запросов
  // Механизм интерсепреты (перехватчики), в них пишем общий код, который будет выполняться при каждой обработке ответа или при каждом оформлении запроса
  // Это промежуточный обратботчик, куда мы можем ввести доп. конфигурацию для запроса.

  // Чтобы воспользоваться к интерсептерам, мы общащаемся к объекту interceptors. У него есть request (для запросов) и response(для ответов).

  // Здесь мы должны передать функцию, которая будет возвращать обновленную конфигурацию.
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    // извлекаем токен из `localStorage`
    const token = getToken();

    if (token) {
      // созадем заголовок 'x-token', как того требует наша спецификация api
      // в него подставляем токен
      config.headers['x-token'] = token;
    }

    return config;
    // Тут получается, когда мы отправляем запрос ex получить offers, то сработает перехватчик interceptor и в этот запрос будут автоматически добавлен заголовок 'x-token'
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Если у нас есть ошибка и если нужно показать инфу об этой ошибке
      if (error.response && shouldDisplayError(error.response)) {
        // error.response.data.error будет undefined у 404, поэтому обработаем ошибку отдельно для случая не нахождении id
        toast.error(error.response.data.error);
      }
      // эту ошибку опрокидываем, чтобы можно было ее поймать и нужном месте обработать
      throw error;
    }
  );

  return api;
};
