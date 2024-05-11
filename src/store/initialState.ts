import { EXCEL_STATE } from '@src/consts/localStorage';
import localStorageFn from '@src/helpers/localStorage';
import { IRootState } from './store.types';

export const defaultState: IRootState = {
  colState: {},
  rowState: {},
};

const localStorageState = localStorageFn<IRootState>(EXCEL_STATE);

export const initialState = localStorageState || defaultState;

export default initialState;
