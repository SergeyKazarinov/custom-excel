import Router from './core/routes/Router';
import DashboardPage from './pages/DashboardPage';
import ExcelPage from './pages/ExcelPage';
import './scss/index.scss';

// eslint-disable-next-line
new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
