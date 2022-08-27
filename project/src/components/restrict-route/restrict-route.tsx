import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';


type RedirectToMainRouteProps = {
  children: JSX.Element,
};

function RestrictRoute({ children }: RedirectToMainRouteProps): JSX.Element {

  const authStatus = useAppSelector(getAuthorizationStatus);

  return (
    authStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : children
  );
}

export default RestrictRoute;
