import $, { Dom } from '../dom/dom';
import ActiveRoute from './ActiveRoute';
import Page from './Page';
import { IRouter, IRoutesParams } from './Router.types';

class Router implements IRouter {
  private $placeholder: Dom;

  private routes: IRoutesParams;

  private page: null | Page;

  constructor(selector: string, routes: IRoutesParams) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    this.$placeholder.clear();
    if (this.page) {
      this.page.destroy();
    }
    const PageClass = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard;
    this.page = new PageClass(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}

export default Router;
