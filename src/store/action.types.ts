export interface ITableResizeActionCreator {
  readonly type: 'TABLE_RESIZE';
  payload: ITableResize;
}

export interface IChangeTextActionCreator {
  readonly type: 'CHANGE_TEXT';
  payload: IChangeTextPayload;
}

export type TTableActions = ITableResizeActionCreator | IChangeTextActionCreator | { type: '__INIT__' };

export type TActions = TTableActions;
