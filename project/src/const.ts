enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  NotFound = '*',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
 enum Setting {
  CARDS_ON_PAGE = 4,
  MAX_RATING = 5,
 }

export { AppRoute, AuthorizationStatus, Setting };
