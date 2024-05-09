export interface ITableResizeActionCreator {
  readonly type: 'TABLE_RESIZE';
  payload: ITableResize;
}

export type TTableActions = ITableResizeActionCreator | { type: 'TEST' } | { type: '__INIT__' };

export type TActions = TTableActions;
