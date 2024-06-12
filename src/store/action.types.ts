import { ITableResize, IChangeTextPayload } from '@src/types/global';
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
  payload: IToolbarState;
}
export interface ICurrentStyles {
  readonly type: 'CURRENT_STYLES';
  payload: IToolbarState;
}

export type TTableActions =
  | ITableResizeActionCreator
  | IChangeTextActionCreator
  | IApplyStyle
  | ICurrentStyles
  | { type: '__INIT__'; payload: any };

export type TActions = TTableActions;
