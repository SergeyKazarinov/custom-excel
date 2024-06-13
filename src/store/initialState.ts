import { initialToolbarState } from '@src/consts/consts';
import { EXCEL_STATE } from '@src/consts/localStorage';
import localStorageFn from '@src/helpers/localStorage';
import { IRootState } from './store.types';

export const defaultState: IRootState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: initialToolbarState,
  title: 'Новая таблица',
};

const localStorageState = localStorageFn<IRootState>(EXCEL_STATE);

export const initialState = localStorageState || defaultState;

export default initialState;
