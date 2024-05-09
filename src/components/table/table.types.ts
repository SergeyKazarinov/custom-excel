import { IRootState } from '@src/store/store.types';

export interface ICreateTable {
  rowsCount?: number;
  state: IRootState;
}

export interface ICreateCol {
  colName: string;
  index: number;
  colWidth: string;
}
