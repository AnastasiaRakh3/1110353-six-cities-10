import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/app';
import { offersList } from './mocks/offers';
import { Setting } from './const';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// Для использование store в компоненте вам необходимо передавать его в пропсы:
// И после использовать в компоненте: this.props.state. Для этого react-redux предостовляет метод Provider:
// Нужно обернуть в Provider все приложение

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cardsOnPage={Setting.CARDS_ON_PAGE}
        offersList={offersList}
      />
    </Provider>
  </React.StrictMode>,
);
