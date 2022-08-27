import { State } from '../../types/state';
import { NameSpace } from '../../const';

// Селектор — обычная функция, которая возвращает значение нужного поля хранилища
// Создаем файл, чтобы в случае изменений в сторе, мы сделали изменения только в этом месте

const getAuthorizationStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus;

const getUserName = (state: State) => state[NameSpace.User].userName;

export { getAuthorizationStatus, getUserName };
