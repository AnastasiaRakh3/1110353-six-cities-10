type Dictionary = {
  [key: string]: string;
};

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

const PLACES_LIST_CLASSES: Dictionary = {
  'cities': 'cities__places-list tabs__content',
  'near-places': 'near-places__list',
};

export { AppRoute, AuthorizationStatus, Setting, PLACES_LIST_CLASSES };
