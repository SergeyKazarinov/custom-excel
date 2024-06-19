import { IToolbarState } from '@src/types/state';

type TRootReducer<S, A> = (state: S, action: A) => S;

export interface IReturnCreateStore<S, A> {
  subscribe(fn: (state: S) => void): { unsubscribe(): void };
  dispatch(action: A): void;
  getState(): S;
}

export type TCreateStore<S, A> = (rootReducer: TRootReducer<S, A>, initialState: S) => IReturnCreateStore<S, A>;

export interface IRootState {
  colState: Record<string, number>;
  rowState: Record<string, number>;
  stylesState: Record<string, IToolbarState>;
  dataState: Record<string, string>;
  currentText: string;
  currentStyles: IToolbarState;
  title: string;
  dateTable: string;
}
