import { Dom } from '../dom/dom';

interface IPage {
  getRoot(): Dom;
  afterRender(): void;
  destroy(): void;
}

class Page implements IPage {
  private params: any;

  constructor(params?: any) {
    this.params = params;
  }

  /**
   * Метод выбрасывает ошибку, если не реализован в классах наследников
   *
   * @returns {Element}
   */
  getRoot(): Dom {
    throw new Error('error page');
  }

  afterRender(): void {}

  destroy(): void {}
}

export default Page;
