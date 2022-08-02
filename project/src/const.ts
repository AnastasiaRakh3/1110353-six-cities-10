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

enum MapType {
  Cities = 'cities',
  Property = 'property',
}

enum PlaceType {
  Cities = 'cities',
  NearPlaces = 'near-places',
}

const PLACES_LIST_CLASSES: Dictionary = {
  'cities': 'cities__places-list tabs__content',
  'near-places': 'near-places__list',
};

const DEFAULT_CITY_NAME = 'Paris';

const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export {
  AppRoute,
  AuthorizationStatus,
  Setting,
  MapType,
  PlaceType,
  PLACES_LIST_CLASSES,
  DEFAULT_CITY_NAME,
  cities,
};
