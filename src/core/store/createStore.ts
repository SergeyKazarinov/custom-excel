import { IRootState, TAction } from '@src/store/store.types';
import { TCallback } from '@src/types/components';

export type TRootReducer<S, A> = (state: S, action: A) => S;

export interface IReturnCreateStore<S, A> {
  subscribe(fn: (state: S) => void): { unsubscribe(): void };
  dispatch(action: A): void;
  getState(): S;
}

export type TCreateStore<S, A> = (rootReducer: TRootReducer<S, A>, initialState?: S) => IReturnCreateStore<S, A>;

const createStore: TCreateStore<IRootState, TAction> = (rootReducer, initialState = {}) => {
  let state = rootReducer({ ...initialState }, { type: '__INIT__' });
  let listeners: TCallback[] = [];

  return {
    subscribe(fn: TCallback) {
      listeners.push(fn);

      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn);
        },
      };
    },
    dispatch(action: TAction) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },

    getState() {
      return state;
    },
  };
};

export default createStore;
