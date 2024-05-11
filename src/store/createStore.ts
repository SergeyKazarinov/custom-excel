import { IRootState, TCreateStore } from '@src/store/store.types';
import { TCallback } from '@src/types/components';
import { TActions } from './action.types';

const createStore: TCreateStore<IRootState, TActions> = (rootReducer, initialState) => {
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
    dispatch(action: TActions) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },

    getState() {
      return state;
    },
  };
};

export default createStore;
