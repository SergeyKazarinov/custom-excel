/**
 * Функция проверки, является ли элемент, на который нажали - ячейкой таблицы
 * @param {Event} event - событие клика
 * @returns {Boolean} true или false
 */
const isCell = (event: Event) => event.target instanceof HTMLElement && event.target.dataset.type === 'cell';

export default isCell;
