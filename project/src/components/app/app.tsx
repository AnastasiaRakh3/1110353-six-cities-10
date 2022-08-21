import { Route, Routes } from 'react-router-dom';

import HistoryRouter from '../history-router/history-router';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PrivateRoute from '../private-route/private-route';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import Loading from '../loading/loading';
import RestrictRoute from '../restrict-route/restrict-route';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { getIsOffersListLoading } from '../../store/data-process/selectors';
import { browserHistory } from '../../browser-history';

export default function App(): JSX.Element {

  const isOffersListLoading = useAppSelector(getIsOffersListLoading);

  if (isOffersListLoading) {
    return (
      <Loading />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={
            <RestrictRoute>
              <LoginScreen />
            </RestrictRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Room}/:id`}
          element={<RoomScreen />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}
