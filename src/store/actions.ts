import { IChangeTextActionCreator, ITableResizeActionCreator } from './action.types';

export const tableResizeActionCreator = (data: ITableResize): ITableResizeActionCreator => ({
  type: 'TABLE_RESIZE',
  payload: data,
});

export const changeTextActionCreator = (data: IChangeTextPayload): IChangeTextActionCreator => ({
  type: 'CHANGE_TEXT',
  payload: data,
});
