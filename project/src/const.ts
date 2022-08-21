type Dictionary = {
  [key: string]: string;
};

enum NameSpace {
  User = 'User',
  Data = 'Data',
  City = 'City',
  Favorite = 'Favorite',
}

enum ApiRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
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

enum MapType {
  Cities = 'cities',
  Property = 'property',
}

enum PlaceType {
  Cities = 'cities',
  NearPlaces = 'near-places',
}

enum FavoriteButtonScreen {
  PlaceCard = 'place-card',
  Property = 'property',
}

enum NewCommentLength {
  Max = 300,
  Min = 50,
}

const MAX_RATING = 5;
const STAR_WIDTH = 20;
const MAX_GALERY_LENGTH = 6;
const MAX_COMMENTS = 10;

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

const DEFAULT_CITIES = [
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
  NameSpace,
  AppRoute,
  ApiRoute,
  AuthorizationStatus,
  NewCommentLength,
  MapType,
  PlaceType,
  FavoriteButtonScreen,
  MAX_RATING,
  STAR_WIDTH,
  MAX_GALERY_LENGTH,
  MAX_COMMENTS,
  PLACES_LIST_CLASSES,
  DEFAULT_CITY_NAME,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_KEY_NAME,
  DEFAULT_CITIES,
  SortType,
  iconUrl,
};
