export interface IExcelStateComponent<S> {
  /**
   * Инициализация стора
   * @param initialState - начальное состояния store
   */
  initState(initialState: S): void;

  /**
   * Установка нового состояния
   *
   * @param {S} newState
   */
  setState(newState: S): void;
}

export interface IToolbarState {
  textAlign: 'left';
  fontWeight: 'normal';
  textDecoration: 'none';
  fontStyle: 'normal';
}

export type State = { [key: string]: any };
