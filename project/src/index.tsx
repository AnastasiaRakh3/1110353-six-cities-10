import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/app';
import { cities } from './const';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// Нужно обернуть в Provider все приложение
// Через props в Provider передали ссылку на созданное хранилище

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cities={cities}
      />
    </Provider>
  </React.StrictMode>,
);
