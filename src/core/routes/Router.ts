import DashboardPage from '@src/pages/DashboardPage';
import ExcelPage from '@src/pages/ExcelPage';
import $, { Dom } from '../dom/dom';

interface IRoutesParams {
  dashboard: new (...arg: any[]) => DashboardPage;
  excel: new (...arg: any[]) => ExcelPage;
}

interface IRouter {
  /**
   * Инициализация роутинга
   * Добавление слушателя события на изменения hash
   */
  init(): void;
  changePageHandler(): void;
  /**
   * Метод при размонтировании
   * Удаляет слушатели событий
   */
  destroy(): void;
}

class Router implements IRouter {
  private $placeholder: Dom;

  private routes: IRoutesParams;

  constructor(selector: string, routes: IRoutesParams) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    const Page = this.routes.excel;

    const page = new Page();
    this.$placeholder.append(page.getRoot());
    page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}

export default Router;
