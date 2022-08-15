import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './components/app/app';
import { CITIES } from './const';
import { store } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// проверка на наличие авторизации
store.dispatch(checkAuthAction());
// Вызов действия для загрузки офферов
store.dispatch(fetchOffersAction());

// Нужно обернуть в Provider все приложение
// Через props в Provider передали ссылку на созданное хранилище

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        cities={CITIES}
      />
    </Provider>
  </React.StrictMode>,
);
