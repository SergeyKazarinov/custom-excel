# Custom Excel

<img src='./public/assets/Custom-Excel.gif' width="100%">

Проект представляет собой аналог Google-Excel таблицы.

- Проект написан на Vanilla JS: самописный фреймворк с роутингом страниц и компонентами.
- В проекте используется самописный аналог [Redux](/src/store/createStore.ts) и аналог [JQuery](/src/core/dom/).
- Все методы и функции задокументированы при помощи [TSDoc](https://tsdoc.org/).
- Для хранения данных используется localStorage.

Ссылка на проект: https://sergeykazarinov.github.io/custom-excel/

## Содержание

- [Этапы разработки](/docs/developments.md)
- [Быстрый старт](#start)
- [Скрипты](#scripts)
- [Stack](#stack)

## <a id="start" ></a>Быстрый старт

1. Склонировать проект на свой компьютер

```bash
git clone https://github.com/SergeyKazarinov/custom-excel.git
```

2. установить зависимости

```bash
npm install
```

3. Запустить проект

```bash
npm run start
```

## <a id="scripts" ></a>Скрипты

- `npm run dev` - Запуск проекта на webpack dev server
- `npm run build:dev` - Сборка проекта в dev-режиме
- `npm run build:prod` - Сборка проекта в prod-режиме
- `npm run deploy` - Деплой проекта на GH-Pages

## <a id="stack" ></a>Stack

- Node v.20
- Vanilla JS
- TS
- TSDoc
