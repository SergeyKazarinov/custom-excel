import { IApplyStylePayload, IChangeTextPayload, ITableResize } from '@src/types/global';
import { IToolbarState } from '@src/types/state';

export interface ITableResizeActionCreator {
  readonly type: 'TABLE_RESIZE';
  payload: ITableResize;
}

export interface IChangeTextActionCreator {
  readonly type: 'CHANGE_TEXT';
  payload: IChangeTextPayload;
}
export interface IApplyStyle {
  readonly type: 'APPLY_STYLE';
  payload: IApplyStylePayload;
}
export interface ICurrentStyles {
  readonly type: 'CURRENT_STYLES';
  payload: IToolbarState;
}
export interface IChangeTitle {
  readonly type: 'CHANGE_TITLE';
  payload: string;
}

export interface IUpdateDate {
  readonly type: 'UPDATE_DATE';
}

export type TTableActions =
  | ITableResizeActionCreator
  | IChangeTextActionCreator
  | IApplyStyle
  | ICurrentStyles
  | IChangeTitle
  | IUpdateDate
  | { type: '__INIT__'; payload: any };

export type TActions = TTableActions;
