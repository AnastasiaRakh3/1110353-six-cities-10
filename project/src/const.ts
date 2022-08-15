type Dictionary = {
  [key: string]: string;
};

enum ApiRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

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
// основной адрес сервера (URL). Он будет использоваться для всех относительных адресов
const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
// Если ответ не будет получен в течение 5 сек, то соединение с сервером закроется
const REQUEST_TIMEOUT = 5000;
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
};

const iconUrl = {
  Default: 'img/pin.svg',
  Active: 'img/pin-active.svg',
};

export {
  AppRoute,
  ApiRoute,
  AuthorizationStatus,
  Setting,
  MapType,
  PlaceType,
  PLACES_LIST_CLASSES,
  DEFAULT_CITY_NAME,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_KEY_NAME,
  CITIES,
  SortType,
  iconUrl,
};
