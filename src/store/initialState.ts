import { DEFAULT_TITLE, initialToolbarState } from '@src/consts/consts';
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
  title: DEFAULT_TITLE,
  dateTable: new Date().toJSON(),
};

const localStorageState = localStorageFn<IRootState>(EXCEL_STATE);

export const initialState = localStorageState || structuredClone(defaultState);

const normalize = <S>(state: S) => ({
  ...state,
  currentStyle: initialToolbarState,
  currentText: '',
});

export const normalizeInitialState = <S>(state?: S) => (state ? normalize<S>(state) : structuredClone(defaultState));
