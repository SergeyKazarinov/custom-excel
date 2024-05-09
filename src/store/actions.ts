import { ITableResizeActionCreator } from './action.types';
// eslint-disable-next-line
export const tableResizeActionCreator = (data: ITableResize): ITableResizeActionCreator => ({
  type: 'TABLE_RESIZE',
  payload: data,
});
