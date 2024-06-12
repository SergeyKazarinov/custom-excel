import { IToolbarState } from '@src/types/state';
import { ITableResize, IChangeTextPayload, IApplyStylePayload } from '@src/types/global';
import { IApplyStyle, IChangeTextActionCreator, ICurrentStyles, ITableResizeActionCreator } from './action.types';

export const tableResizeActionCreator = (data: ITableResize): ITableResizeActionCreator => ({
  type: 'TABLE_RESIZE',
  payload: data,
});

export const changeTextActionCreator = (data: IChangeTextPayload): IChangeTextActionCreator => ({
  type: 'CHANGE_TEXT',
  payload: data,
});

export const getCurrentStyles = (data: IToolbarState): ICurrentStyles => ({
  type: 'CURRENT_STYLES',
  payload: data,
});

export const applyStyles = (data: IApplyStylePayload): IApplyStyle => ({
  type: 'APPLY_STYLE',
  payload: data,
});
