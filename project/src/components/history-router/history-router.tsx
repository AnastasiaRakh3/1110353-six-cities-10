import { BrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';

type HistoryRouterProps = {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}

function HistoryRouter({ history, basename, children }: HistoryRouterProps): JSX.Element {

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  // Как и хук useEffect, хук useLayoutEffect позволяет выполнять дополнительные эффекты, такие как вызовы API, настройку подписок и манипулирование DOM вручную в функциональном компоненте.
  // useLayoutEffect(callback, [dependencies])
  // Главное же отличие заключается в том, что useLayoutEffect вызывается синхронно, после всех изменений в DOM.
  // Хук useLayoutEffect можно использовать в случаях, когда необходимо произвести какие-то вычисления либо замеры в реальном DOM или провести синхронно мутацию (изменения).

  // Можем прослушивать изменения в текущем местоположении, используя history.listen:
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    // Для того чтобы можно было использовать историю в роутере нам понадобиться <Router/>
    // Router будет храниться вся логика нашего роутинга
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
