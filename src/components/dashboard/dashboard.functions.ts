export const toHTML = () => /* html */ `
  <li class="dashboard__record">
      <a href="#" class="dashboard__link"> Таблица №1 </a>
      <strong class="dashboard__create-date">12.06.2023</strong>
  </li>
  `;

export const getAllKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.includes('excel')) {
      keys.push(key);
    }
  }
  return keys;
};

export const createTable = () => {
  const keys = getAllKeys();

  if (!keys.length) {
    return `
      <p>Таблицы отсутствуют</p>
      `;
  }

  return `
  <div class="dashboard__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
  </div>

  <ul class="dashboard__list">
    ${keys.map(toHTML).join('')}
  </ul>
  `;
};
