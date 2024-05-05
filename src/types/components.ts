import Observer from '@src/core/observer/Observer';

export interface IComponentOptions {
  observer?: Observer;
  store?: any;
}

export type TCallback = (...args: any[]) => void;

export type TObserverListeners = Record<string, TCallback[]>;
