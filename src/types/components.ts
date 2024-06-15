import Observer from '@src/core/observer/Observer';
import { IRootState } from '@src/store/store.types';

export interface IComponentOptions {
  observer?: Observer;
  store?: any;
}

export type TCallback = (...args: any[]) => void;

export type TObserverListeners = Record<string, TCallback[]>;

export type TChanges = Partial<Record<keyof IRootState, IRootState[keyof IRootState]>>;
