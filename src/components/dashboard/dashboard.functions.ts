import localStorageFn from '@src/helpers/localStorage';
import { IRootState } from '@src/store/store.types';

export const toHTML = (key: string) => {
  const model = localStorageFn<IRootState>(key);
  const id = key.split(':')[1];

  if (!model) {
    return '';
  }

  return /* html */ `
  <li class="dashboard__record">
      <a href="#excel/${id}" class="dashboard__link"> ${model.title} </a>
      <strong class="dashboard__create-date">12.06.2023</strong>
  </li>
  `;
};

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
