import { State } from '../../types/state';
import { NameSpace } from '../../const';

const getAuthorizationStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus;

const getUserName = (state: State) => state[NameSpace.User].userName;

export { getAuthorizationStatus, getUserName };
