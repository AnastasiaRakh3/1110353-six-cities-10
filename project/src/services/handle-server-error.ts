import { store } from '../store';
import { setServerError } from '../store/actions';
import { clearServerErrorAction } from '../store/api-actions';

export const handleServerError = (message: string): void => {
  store.dispatch(setServerError(message));
  store.dispatch(clearServerErrorAction());
};
