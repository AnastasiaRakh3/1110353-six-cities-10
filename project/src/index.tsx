import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/app';
import { offersList } from './mocks/offers';
import { Setting, cities } from './const';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// Через props в Provider передали ссылку на созданное хранилище
// И после использовать в компоненте: this.props.state. Для этого react-redux предостовляет метод Provider:
// Нужно обернуть в Provider все приложение

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cardsOnPage={Setting.CARDS_ON_PAGE}
        offersList={offersList}
        cities={cities}
      />
    </Provider>
  </React.StrictMode>,
);
