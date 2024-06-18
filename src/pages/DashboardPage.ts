import { createTable } from '@src/components/dashboard/dashboard.functions';
import $, { Dom } from '@src/core/dom/dom';
import Page from '@src/core/routes/Page';

class DashboardPage extends Page {
  getRoot(): Dom {
    const newId = Date.now().toString();
    const nodeElement = $.create('div', 'dashboard').html(/* html */ `
      <header class="dashboard__header">
          <h1>Excel Dashboard</h1>
        </header>
        <div class="dashboard__new">
          <div class="dashboard__view">
            <a href="#excel/${newId}" class="dashboard__create">Новая таблица</a>
          </div>
        </div>

        <div class="dashboard__table dashboard__view">
          ${createTable()}
        </div>
      `);
    return nodeElement as Dom;
  }
}

export default DashboardPage;
