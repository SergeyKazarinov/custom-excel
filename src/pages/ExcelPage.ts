import Excel from '@src/components/excel/Excel';
import Formula from '@src/components/formula/Formula';
import Header from '@src/components/header/Header';
import Table from '@src/components/table/Table';
import Toolbar from '@src/components/toolbar/Toolbar';
import { Dom } from '@src/core/dom/dom';
import Page from '@src/core/routes/Page';
import debounce from '@src/helpers/debounce';
import localStorageFn from '@src/helpers/localStorage';
import createStore from '@src/store/createStore';
import { normalizeInitialState } from '@src/store/initialState';
import rootReducer from '@src/store/rootReducer';
import { IRootState } from '@src/store/store.types';

type TExcelGeneric = Header | Toolbar | Formula | Table;

const storageName = (param: string | undefined) => `excel:${param}`;

class ExcelPage extends Page {
  private excel: Excel<Header | Toolbar | Formula | Table> | null;

  constructor(params: string) {
    super(params);
    this.excel = null;
  }

  getRoot(): Dom {
    const params = this.params ?? Date.now().toString();
    const localState = localStorageFn<IRootState>(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState<IRootState>(localState));

    const stateListener = debounce(<S>(state: S) => {
      localStorageFn(storageName(params), state);
    }, 500);

    store.subscribe(stateListener);

    this.excel = new Excel<TExcelGeneric>({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender(): void {
    this.excel?.init();
  }

  destroy(): void {
    this.excel?.destroy();
  }
}

export default ExcelPage;
