import { Route, Routes } from 'react-router-dom';

import HistoryRouter from '../history-router/history-router';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PrivateRoute from '../private-route/private-route';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import Loading from '../loading/loading';
import { withMap } from '../../hocs/with-map';
import { AppRoute, CITIES } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { browserHistory } from '../../browser-history';

type AppProps = {
  cities: typeof CITIES;
};

const MainScreenWithMap = withMap(MainScreen);
const RoomScreenWithMap = withMap(RoomScreen);

export default function App({ cities }: AppProps): JSX.Element {

  // Определяем city, чтобы на странице MainScreen отфильтровать предложения этого города
  const { isDataLoaded, offers, city, authorizationStatus } = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainScreenWithMap
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
            <PrivateRoute authStatus={authorizationStatus}>
              <FavoritesScreen offersList={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Room}/:id`}
          element={<RoomScreenWithMap />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}
