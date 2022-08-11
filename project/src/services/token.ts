import { AUTH_TOKEN_KEY_NAME } from '../const';

// Токен — это по факту строка и её нужно где-то хранить.
// Один вариантов решения этой задачи — воспользоваться `localStorage`.
// После получения сохраним токен в хранилище, а когда потребуется им воспользоваться — извлечём. Для взаимодействия с `localStorage` создадим отдельный модуль и опишем несколько функций. В будущем это упростит нам написание автоматизированных тестов.

// Оператор нулевого слияния (??) — это логический оператор, возвращающий значение правого операнда, если значение левого операнда содержит null или undefined, в противном случае возвращается значение левого операнда.

type Token = string;

const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export { getToken, saveToken, dropToken };
