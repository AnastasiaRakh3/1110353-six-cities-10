import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCity = (state: State) => state[NameSpace.City].city;
