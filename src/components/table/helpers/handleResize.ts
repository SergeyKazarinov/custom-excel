import $, { Dom } from '@src/core/dom/dom';

/**
 * Функция изменения ширины столбцов или высоты строк
 * @param {MouseEvent} event - событие мыши
 * @param $root - dom элемент
 */
const handleResize = (event: MouseEvent, $root: Dom): Promise<ITableResize> =>
  new Promise((resolve) => {
    if (event.target instanceof HTMLElement) {
      const resizeAttr = event.target.dataset.resize;

      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent?.getCoords();
      const type = $resizer.data?.resize;
      const sideProperty = type === 'col' ? 'bottom' : 'right';
      const sideValue = type === 'col' ? '-100vh' : '-100vw';
      let value: number;
      if (type) {
        $resizer.css({
          opacity: 1,
          [sideProperty]: sideValue,
        });
      }

      document.onmousemove = (e) => {
        if (coords) {
          if (resizeAttr === 'col') {
            const delta = e.pageX - coords.right;
            value = coords.width + delta;

            $resizer.css({ right: `${-delta}px` });
          } else if (resizeAttr === 'row') {
            const delta = e.pageY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({
              bottom: `${-delta}px`,
            });
          }
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (resizeAttr === 'col') {
          const cells = $root.findAll(`[data-col="${$parent?.data?.col}"]`);

          $parent?.css({ width: `${value}px` });
          cells?.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.width = `${value}px`;
            }
          });
        } else if (resizeAttr === 'row') {
          $parent?.css({ height: `${value}px` });
        }
        const id = type === 'col' ? $parent?.data?.col : null;

        if (id) {
          resolve({
            value,
            id,
          });
        }

        if (type) {
          $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0,
          });
        }

        return {
          value,
          id: type === 'col' ? $parent?.data?.col : null,
        };
      };
    }
  });

export default handleResize;
