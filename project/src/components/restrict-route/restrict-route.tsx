import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type RedirectToMainRouteProps = {
  children: JSX.Element,
  authStatus: AuthorizationStatus,
};

function RestrictRoute({ children, authStatus }: RedirectToMainRouteProps): JSX.Element {
  return (
    authStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : children
  );
}

export default RestrictRoute;
