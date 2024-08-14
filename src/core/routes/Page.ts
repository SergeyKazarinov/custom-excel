import { Dom } from '../dom/dom';
import { IPage } from './Page.type';

class Page implements IPage {
  protected params: string | undefined;

  constructor(params?: string) {
    this.params = params;
  }

  getRoot(): Dom {
    throw new Error('error page');
  }

  afterRender(): void {}

  destroy(): void {}
}

export default Page;
