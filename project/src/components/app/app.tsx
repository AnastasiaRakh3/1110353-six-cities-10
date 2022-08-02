import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PrivateRoute from '../private-route/private-route';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/index';

type AppProps = {
  cities: string[];
};

export default function App({ cities }: AppProps): JSX.Element {

  const { offers, city } = useAppSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainScreen
              offersList={offers}
              city={city}
              cities={cities}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={AuthorizationStatus.NoAuth}>
              <FavoritesScreen offersList={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Room}/:id`}
          element={<RoomScreen offersList={offers} />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}
