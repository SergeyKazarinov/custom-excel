import DashboardPage from '@src/pages/DashboardPage';
import ExcelPage from '@src/pages/ExcelPage';

export interface IRoutesParams {
  dashboard: new (...arg: any[]) => DashboardPage;
  excel: new (...arg: any[]) => ExcelPage;
}

export interface IRouter {
  /**
   * Инициализация роутинга
   * Добавление слушателя события на изменения hash
   */
  init(): void;

  /**
   * Метод рендеринга страницы (компонента)
   */
  changePageHandler(): void;
  /**
   * Метод при размонтировании
   * Удаляет слушатели событий
   */
  destroy(): void;
}
