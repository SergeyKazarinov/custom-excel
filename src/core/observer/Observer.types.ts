import { TCallback } from '@src/types/components';
import { TTriggers } from '@src/types/observers';

export interface IObserver {
  /**
   * Уведомляем слушатель, если он есть
   *
   * @param {TTriggers} eventName
   * @param {...any[]} args
   */
  trigger(eventName: TTriggers, ...args: any[]): void;

  /**
   * Подписываемся на уведомление. Метод добавления нового слушателя
   *
   * @param {TTriggers} event - Название слушателя
   * @param {TCallback} fn
   * @returns {TCallback}
   */
  subscribe(event: TTriggers, fn: TCallback): TCallback;
}
