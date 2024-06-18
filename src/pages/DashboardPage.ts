import $, { Dom } from '@src/core/dom/dom';
import Page from '@src/core/routes/Page';

class DashboardPage extends Page {
  getRoot(): Dom {
    const nodeElement = $.create('div', 'dashboard').html(/* html */ `
      <header class="dashboard__header">
          <h1>Excel Dashboard</h1>
        </header>
        <div class="dashboard__new">
          <div class="dashboard__view">
            <a href="#" class="dashboard__create">Новая таблица</a>
          </div>
        </div>

        <div class="dashboard__table dashboard__view">
          <div class="dashboard__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
          </div>

          <ul class="dashboard__list">
            <li class="dashboard__record">
              <a href="#" class="dashboard__link"> Таблица №1 </a>
              <strong class="dashboard__create-date">12.06.2023</strong>
            </li>
          </ul>
        </div>
      `);
    return nodeElement as Dom;
  }
}

export default DashboardPage;
