import { TCallback, TObserverListeners } from '@src/types/components';
import { TTriggers } from '@src/types/observers';
import { IObserver } from './Observer.types';

class Observer implements IObserver {
  public listeners: TObserverListeners;

  constructor() {
    this.listeners = {};
  }

  trigger(eventName: TTriggers, ...args: any[]) {
    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
  }

  subscribe(event: TTriggers, fn: TCallback): TCallback {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
  }
}

export default Observer;
