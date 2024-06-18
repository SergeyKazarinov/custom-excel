import Excel from '@src/components/excel/Excel';
import Formula from '@src/components/formula/Formula';
import Header from '@src/components/header/Header';
import Table from '@src/components/table/Table';
import Toolbar from '@src/components/toolbar/Toolbar';
import { EXCEL_STATE } from '@src/consts/localStorage';
import { Dom } from '@src/core/dom/dom';
import Page from '@src/core/routes/Page';
import debounce from '@src/helpers/debounce';
import localStorageFn from '@src/helpers/localStorage';
import createStore from '@src/store/createStore';
import initialState from '@src/store/initialState';
import rootReducer from '@src/store/rootReducer';

type TExcelGeneric = Header | Toolbar | Formula | Table;

class ExcelPage extends Page {
  private excel: Excel<Header | Toolbar | Formula | Table> | null;

  constructor() {
    super();
    this.excel = null;
  }

  getRoot(): Dom {
    const store = createStore(rootReducer, initialState);

    const stateListener = debounce(<S>(state: S) => {
      localStorageFn(EXCEL_STATE, state);
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
