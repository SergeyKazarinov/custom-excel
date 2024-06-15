import Excel from './components/excel/Excel';
import Formula from './components/formula/Formula';
import Header from './components/header/Header';
import Table from './components/table/Table';
import Toolbar from './components/toolbar/Toolbar';
import { EXCEL_STATE } from './consts/localStorage';
import debounce from './helpers/debounce';
import localStorageFn from './helpers/localStorage';
import './scss/index.scss';
import createStore from './store/createStore';
import { initialState } from './store/initialState';
import rootReducer from './store/rootReducer';

const store = createStore(rootReducer, initialState);

const stateListener = debounce(<S>(state: S) => {
  console.info(state);
  localStorageFn(EXCEL_STATE, state);
}, 500);

store.subscribe(stateListener);

const excel = new Excel<Header | Toolbar | Formula | Table>('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
