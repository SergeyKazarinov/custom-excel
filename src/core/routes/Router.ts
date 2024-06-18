import $, { Dom } from '../dom/dom';
import ActiveRoute from './ActiveRoute';

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

  private routes: any;

  constructor(selector: string, routes: any) {
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
    console.info(ActiveRoute.path);

    this.$placeholder.html(`<h1>${ActiveRoute.path}</h1>`);
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}

export default Router;
