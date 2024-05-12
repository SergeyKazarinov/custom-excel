import Excel from './components/excel/Excel';
import Formula from './components/formula/Formula';
import Header from './components/header/Header';
import Table from './components/table/Table';
import Toolbar from './components/toolbar/Toolbar';
import { EXCEL_STATE } from './consts/localStorage';
import createStore from './store/createStore';
import localStorageFn from './helpers/localStorage';
import './scss/index.scss';
import rootReducer from './store/rootReducer';
import { initialState } from './store/initialState';

const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  localStorageFn(EXCEL_STATE, state);
});

const excel = new Excel<Header | Toolbar | Formula | Table>('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
