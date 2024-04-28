## Описание

На этой странице описаны этапы разработки и работы, которые реализованы в проекте, какие инструменты и методы использованы.

##

#### Webpack

- Подключен [_webpack_](https://webpack.js.org/). Настроен _[tsconfig.json](../tsconfig.json)_
- Настроен [webpack-dev-server](https://webpack.js.org/configuration/dev-server/). Настроены переменные окружения для сборки
- Настроен webpack для [scss](https://sass-scss.ru).
- Подключены плагины:
  - `ProgressPlugin` - позволяет настроить отображение прогресса во время компиляции.
  - `HTMLWebpackPlugin` - упрощает создание HTML-файлов для обслуживания webpack. Это особенно полезно для webpack, которые включают в имя файла хеш, который меняется при каждой компиляции.
  - `MiniCssExtractPlugin` - Этот плагин извлекает CSS в отдельные файлы. Он создает файл CSS для каждого файла JS, который содержит CSS.
  - `CopyWebpackPlugin` - Копирует отдельные файлы или целые каталоги в каталог сборки.
- настроен [`ts-loader`](https://webpack.js.org/guides/typescript/) для интеграции TS с Webpack
- настроен [sass-loader](https://www.npmjs.com/package/sass-loader) для компиляции scss в css
- настроены `alias`
- настроен [babel/present-env](https://babeljs.io/docs/babel-preset-env) для перевода js для поддержки браузеров

#### Eslint и Prettier

- настроен `eslint` с надстройкой [arbnb-ts](https://www.npmjs.com/package/eslint-config-airbnb-typescript).
- настроен `prettier` для соблюдения code style

#### HTML и CSS

- Реализованы [два базовых шаблона](/src/assets/excel.html) для дальнейшей работы
- Добавлены [scss стили](/src/scss/index.scss) для соответствующих страниц. Реализован [миксин](/src/scss/_mixins.scss) для работы с кнопками

#### JS

- Добавлен метод рендеринга на страницу
- Добавлены методы добавления и удаления слушателей событий
- Добавлен класс [dom](/src/core/dom/dom.ts) - аналог JQuery
- Реализован [шаблон](/src/components/table/Table.ts) таблицы
