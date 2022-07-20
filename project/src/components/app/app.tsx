import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PrivateRoute from '../private-route/private-route';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';

type AppProps = {
  cardsOnPage: number;
  offersList: Offer[];
};

export default function App({ cardsOnPage, offersList }: AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainScreen
              cardsOnPage={cardsOnPage}
              offersList={offersList}
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
              <FavoritesScreen offersList={offersList} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Room}/:id`}
          element={<RoomScreen offersList={offersList} />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}
