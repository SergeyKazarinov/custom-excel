import { TCallback, TObserverListeners } from '@src/types/components';

class Observer {
  public listeners: TObserverListeners;

  constructor() {
    this.listeners = {};
  }

  /**
   * Уведомляем слушатель, если он есть
   * @param eventName
   * @param args
   */
  trigger(eventName: string, ...args: any[]) {
    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
  }

  /**
   * Подписываемся на уведомление. Метод добавления нового слушателя
   * @param event
   * @param fn
   */
  subscribe(event: string, fn: TCallback): TCallback {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
  }
}

export default Observer;
