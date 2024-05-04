import Observer from '@src/core/observer/Observer';

export interface IComponentOptions {
  observer?: Observer;
}

export type TCallback = (...args: any[]) => void;

export type TObserverListeners = Record<string, TCallback[]>;
