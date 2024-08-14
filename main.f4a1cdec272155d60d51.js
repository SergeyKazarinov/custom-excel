/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scss/index.scss":
/*!*************************!*\
  !*** ./scss/index.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./components/dashboard/dashboard.functions.ts":
/*!*****************************************************!*\
  !*** ./components/dashboard/dashboard.functions.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTable: () => (/* binding */ createTable),
/* harmony export */   getAllKeys: () => (/* binding */ getAllKeys),
/* harmony export */   toHTML: () => (/* binding */ toHTML)
/* harmony export */ });
/* harmony import */ var _src_helpers_localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/helpers/localStorage */ "./helpers/localStorage.ts");

/**
 * Рендер элемента списка таблиц
 *
 * @param {string} key - ключ таблицы excel
 * @returns {string} - html-строку списка таблиц
 */
var toHTML = function (key) {
    var model = (0,_src_helpers_localStorage__WEBPACK_IMPORTED_MODULE_0__["default"])(key);
    var id = key.split(':')[1];
    if (!model) {
        return '';
    }
    return /* html */ "\n  <li class=\"dashboard__record\">\n      <a href=\"#excel/".concat(id, "\" class=\"dashboard__link\"> ").concat(model.title, " </a>\n      <strong class=\"dashboard__create-date\">\n        ").concat(new Date(model.dateTable).toLocaleDateString(), " ").concat(new Date(model.dateTable).toLocaleTimeString(), "\n      </strong>\n  </li>\n  ");
};
/**
 * Получение всех ключей таблиц Excel
 *
 * @returns {[]} - массив ключей или пустой массив, если таблиц нет в памяти
 */
var getAllKeys = function () {
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key === null || key === void 0 ? void 0 : key.includes('excel')) {
            keys.push(key);
        }
    }
    return keys;
};
/**
 * Создание таблицы списка таблиц excel
 *
 * @returns {string} - html-строку: таблица
 */
var createTable = function () {
    var keys = getAllKeys();
    if (!keys.length) {
        return "\n      <p>\u0422\u0430\u0431\u043B\u0438\u0446\u044B \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442</p>\n      ";
    }
    return "\n  <div class=\"dashboard__list-header\">\n    <span>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</span>\n    <span>\u0414\u0430\u0442\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F</span>\n  </div>\n\n  <ul class=\"dashboard__list\">\n    ".concat(keys.map(toHTML).join(''), "\n  </ul>\n  ");
};


/***/ }),

/***/ "./components/excel/Excel.ts":
/*!***********************************!*\
  !*** ./components/excel/Excel.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/dom/dom */ "./core/dom/dom.ts");
/* harmony import */ var _src_core_observer_Observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/core/observer/Observer */ "./core/observer/Observer.ts");
/* harmony import */ var _src_core_storeSubscriber_StoreSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/core/storeSubscriber/StoreSubscriber */ "./core/storeSubscriber/StoreSubscriber.ts");
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @src/store/actions */ "./store/actions.ts");




var Excel = /** @class */ (function () {
    function Excel(options) {
        this.components = options.components || [];
        this.objectComponents = [];
        this.observer = new _src_core_observer_Observer__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.store = options.store;
        this.subscriber = new _src_core_storeSubscriber_StoreSubscriber__WEBPACK_IMPORTED_MODULE_2__["default"](this.store);
    }
    Excel.prototype.getRoot = function () {
        var $root = _core_dom_dom__WEBPACK_IMPORTED_MODULE_0__["default"].create('div', 'excel');
        var componentOptions = {
            observer: this.observer,
            store: this.store,
        };
        this.objectComponents = this.components.map(function (Component) {
            var $element = _core_dom_dom__WEBPACK_IMPORTED_MODULE_0__["default"].create('div');
            var component = new Component($element, componentOptions);
            $element.html(component.toHTML());
            $root.append($element);
            return component;
        });
        return $root;
    };
    Excel.prototype.init = function () {
        this.store.dispatch((0,_src_store_actions__WEBPACK_IMPORTED_MODULE_3__.updateDate)());
        this.subscriber.subscribeComponents(this.objectComponents);
        this.objectComponents.forEach(function (component) {
            component.init();
        });
    };
    Excel.prototype.destroy = function () {
        this.objectComponents.forEach(function (component) { return component.destroy(); });
        this.subscriber.unsubscribeFromStore();
    };
    return Excel;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Excel);


/***/ }),

/***/ "./components/formula/Formula.ts":
/*!***************************************!*\
  !*** ./components/formula/Formula.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/dom/dom */ "./core/dom/dom.ts");
/* harmony import */ var _src_core_excelComponent_ExcelComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/core/excelComponent/ExcelComponent */ "./core/excelComponent/ExcelComponent.ts");
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/store/actions */ "./store/actions.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var Formula = /** @class */ (function (_super) {
    __extends(Formula, _super);
    function Formula($root, options) {
        var _this = _super.call(this, $root, __assign({ name: 'Formula', listeners: ['input', 'keydown'], subscribes: ['currentText'] }, options)) || this;
        _this.$formula = undefined;
        return _this;
    }
    Formula.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.$formula = this.$root.find('#formula');
        this.$subscribe('table:select', function ($cell) {
            var _a;
            var id = $cell.getId();
            var dataValue = $cell.attr('data-value');
            if (id) {
                _this.$dispatch(_src_store_actions__WEBPACK_IMPORTED_MODULE_2__.changeTextActionCreator({ text: $cell.text(), id: id }));
            }
            if (dataValue) {
                (_a = _this.$formula) === null || _a === void 0 ? void 0 : _a.text(dataValue);
            }
        });
    };
    Formula.prototype.toHTML = function () {
        return "\n    <div class=\"excel__formula formula\">\n      <span class=\"formula__info\">fx</span>\n      <div class=\"formula__input\" contenteditable spellcheck=\"false\" id='formula'></div>\n    </div>\n    ";
    };
    Formula.prototype.onInput = function (event) {
        this.$trigger('formula:input', (0,_core_dom_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(event.target).text());
    };
    Formula.prototype.onKeydown = function (event) {
        var keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$trigger('formula:done');
        }
    };
    Formula.prototype.changeStore = function (changes) {
        var _a;
        (_a = this.$formula) === null || _a === void 0 ? void 0 : _a.text(changes.currentText || '');
    };
    Formula.className = 'excel__formula formula';
    return Formula;
}(_src_core_excelComponent_ExcelComponent__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Formula);


/***/ }),

/***/ "./components/header/Header.ts":
/*!*************************************!*\
  !*** ./components/header/Header.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_consts_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/consts/consts */ "./consts/consts.ts");
/* harmony import */ var _src_core_dom_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/core/dom/dom */ "./core/dom/dom.ts");
/* harmony import */ var _src_core_excelComponent_ExcelComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/core/excelComponent/ExcelComponent */ "./core/excelComponent/ExcelComponent.ts");
/* harmony import */ var _src_core_routes_ActiveRoute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @src/core/routes/ActiveRoute */ "./core/routes/ActiveRoute.ts");
/* harmony import */ var _src_helpers_debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @src/helpers/debounce */ "./helpers/debounce.ts");
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @src/store/actions */ "./store/actions.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};






var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header($root, options) {
        return _super.call(this, $root, __assign({ name: 'Header', listeners: ['input', 'click'] }, options)) || this;
    }
    Header.prototype.prepare = function () {
        this.onInput = (0,_src_helpers_debounce__WEBPACK_IMPORTED_MODULE_4__["default"])(this.onInput.bind(this), 500);
    };
    Header.prototype.toHTML = function () {
        var _a = this.store.getState().title, title = _a === void 0 ? _src_consts_consts__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TITLE : _a;
        return "\n    <header class=\"excel__header header\">\n      <input type=\"text\" class=\"header__input\" value=\"".concat(title, "\" spellcheck/>\n\n      <div>\n        <button class=\"header__button\" data-button=\"remove\" >\n          <span class=\"material-icons\" data-button=\"remove\"> delete </span>\n        </button>\n        <button class=\"header__button\" data-button=\"exit\">\n          <span class=\"material-icons\" data-button=\"exit\"> logout </span>\n        </button>\n      </div>\n    </header>\n    ");
    };
    Header.prototype.onInput = function (event) {
        var $target = (0,_src_core_dom_dom__WEBPACK_IMPORTED_MODULE_1__["default"])(event.target);
        this.$dispatch((0,_src_store_actions__WEBPACK_IMPORTED_MODULE_5__.changeTitle)($target.text()));
    };
    Header.prototype.onClick = function (event) {
        var _a, _b;
        var $target = (0,_src_core_dom_dom__WEBPACK_IMPORTED_MODULE_1__["default"])(event.target);
        if (((_a = $target.data) === null || _a === void 0 ? void 0 : _a.button) === 'remove') {
            // eslint-disable-next-line
            var decision = confirm('Вы действительно хотите удалить таблицу?');
            if (decision) {
                localStorage.removeItem("excel:".concat(_src_core_routes_ActiveRoute__WEBPACK_IMPORTED_MODULE_3__["default"].param));
                _src_core_routes_ActiveRoute__WEBPACK_IMPORTED_MODULE_3__["default"].navigate('');
            }
        }
        if (((_b = $target.data) === null || _b === void 0 ? void 0 : _b.button) === 'exit') {
            _src_core_routes_ActiveRoute__WEBPACK_IMPORTED_MODULE_3__["default"].navigate('');
        }
    };
    Header.className = 'header';
    return Header;
}(_src_core_excelComponent_ExcelComponent__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);


/***/ }),

/***/ "./components/table/Table.ts":
/*!***********************************!*\
  !*** ./components/table/Table.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/consts/codes */ "./consts/codes.ts");
/* harmony import */ var _src_consts_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/consts/consts */ "./consts/consts.ts");
/* harmony import */ var _src_core_dom_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/core/dom/dom */ "./core/dom/dom.ts");
/* harmony import */ var _src_core_excelComponent_ExcelComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @src/core/excelComponent/ExcelComponent */ "./core/excelComponent/ExcelComponent.ts");
/* harmony import */ var _src_helpers_parseString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @src/helpers/parseString */ "./helpers/parseString.ts");
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @src/store/actions */ "./store/actions.ts");
/* harmony import */ var _helpers_handleMatrix__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/handleMatrix */ "./components/table/helpers/handleMatrix.ts");
/* harmony import */ var _helpers_handleResize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/handleResize */ "./components/table/helpers/handleResize.ts");
/* harmony import */ var _helpers_isCell__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/isCell */ "./components/table/helpers/isCell.ts");
/* harmony import */ var _helpers_nextSelector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/nextSelector */ "./components/table/helpers/nextSelector.ts");
/* harmony import */ var _table_template__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./table.template */ "./components/table/table.template.ts");
/* harmony import */ var _TableSelection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TableSelection */ "./components/table/TableSelection.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table($root, options) {
        var _this = _super.call(this, $root, __assign({ listeners: ['mousedown', 'keydown', 'input'] }, options)) || this;
        _this.selection = new _TableSelection__WEBPACK_IMPORTED_MODULE_11__["default"]();
        return _this;
    }
    Table.prototype.toHTML = function () {
        var state = this.store.getState();
        return (0,_table_template__WEBPACK_IMPORTED_MODULE_10__["default"])({ state: state });
    };
    Table.prototype.selectCell = function ($cell) {
        this.selection.select($cell);
        this.$trigger('table:select', $cell);
        var styles = $cell.getStyles(Object.keys(_src_consts_consts__WEBPACK_IMPORTED_MODULE_1__.initialToolbarState));
        this.$dispatch(_src_store_actions__WEBPACK_IMPORTED_MODULE_5__.getCurrentStyles(styles));
    };
    Table.prototype.resizeTable = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0,_helpers_handleResize__WEBPACK_IMPORTED_MODULE_7__["default"])(event, this.$root)];
                    case 1:
                        data = _a.sent();
                        this.$dispatch(_src_store_actions__WEBPACK_IMPORTED_MODULE_5__.tableResizeActionCreator(data));
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Table.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        var $cell = this.$root.find("[data-id=\"1:1\"]");
        if ($cell) {
            this.selectCell($cell);
        }
        this.$subscribe('formula:input', function (value) {
            var _a;
            (_a = _this.selection.currentCell) === null || _a === void 0 ? void 0 : _a.attr('data-value', value).text((0,_src_helpers_parseString__WEBPACK_IMPORTED_MODULE_4__["default"])(value));
            _this.updateCurrentTextInStore(value);
        });
        this.$subscribe('formula:done', function () {
            var _a;
            (_a = _this.selection.currentCell) === null || _a === void 0 ? void 0 : _a.focus();
        });
        this.$subscribe('toolbar:applyStyle', function (style) {
            _this.selection.applyStyle(style);
            _this.$dispatch(_src_store_actions__WEBPACK_IMPORTED_MODULE_5__.applyStyles({
                ids: _this.selection.selectedIds,
                value: style,
            }));
        });
    };
    Table.prototype.onMousedown = function (event) {
        var _this = this;
        this.resizeTable(event);
        if ((0,_helpers_isCell__WEBPACK_IMPORTED_MODULE_8__["default"])(event) && event.target instanceof HTMLElement) {
            var $target = (0,_src_core_dom_dom__WEBPACK_IMPORTED_MODULE_2__["default"])(event.target);
            if (event.shiftKey) {
                var $cells = (0,_helpers_handleMatrix__WEBPACK_IMPORTED_MODULE_6__["default"])($target, this.selection.currentCell)
                    .map(function (id) { return _this.$root.find("[data-id=\"".concat(id, "\"]")); })
                    .filter(function (item) { return !!item; });
                this.selection.selectGroup($cells);
            }
            else {
                this.selectCell($target);
            }
        }
    };
    Table.prototype.onKeydown = function (event) {
        var _a;
        var keys = Object.values(_src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.KEYBOARDS);
        var key = event.key;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            var currentCell = (_a = this.selection.currentCell) === null || _a === void 0 ? void 0 : _a.getId(true);
            if (currentCell) {
                var $next = this.$root.find((0,_helpers_nextSelector__WEBPACK_IMPORTED_MODULE_9__["default"])(key, currentCell));
                if ($next) {
                    this.selectCell($next);
                }
            }
        }
    };
    Table.prototype.updateCurrentTextInStore = function (text) {
        var _a;
        var id = (_a = this.selection.currentCell) === null || _a === void 0 ? void 0 : _a.getId();
        if (id) {
            this.$dispatch(_src_store_actions__WEBPACK_IMPORTED_MODULE_5__.changeTextActionCreator({
                id: id,
                text: text,
            }));
        }
    };
    Table.prototype.onInput = function (event) {
        this.updateCurrentTextInStore((0,_src_core_dom_dom__WEBPACK_IMPORTED_MODULE_2__["default"])(event.target).text());
    };
    Table.className = 'excel__table table';
    return Table;
}(_src_core_excelComponent_ExcelComponent__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);


/***/ }),

/***/ "./components/table/TableSelection.ts":
/*!********************************************!*\
  !*** ./components/table/TableSelection.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var TableSelection = /** @class */ (function () {
    function TableSelection() {
        this.group = [];
        this.currentCell = null;
    }
    Object.defineProperty(TableSelection.prototype, "selectedIds", {
        get: function () {
            return this.group.map(function ($el) { return $el.getId(); });
        },
        enumerable: false,
        configurable: true
    });
    TableSelection.prototype.clear = function () {
        this.group.forEach(function ($cell) {
            $cell.removeClass(TableSelection.selectedClassName);
        });
        this.group = [];
    };
    TableSelection.prototype.select = function ($el) {
        this.clear();
        this.group.push($el);
        $el.focus().addClass(TableSelection.selectedClassName);
        this.currentCell = $el;
    };
    TableSelection.prototype.selectGroup = function ($group) {
        this.clear();
        this.group = $group;
        this.group.forEach(function ($el) { return $el.addClass(TableSelection.selectedClassName); });
    };
    TableSelection.prototype.applyStyle = function (style) {
        this.group.forEach(function (element) { return element.css(style); });
    };
    TableSelection.selectedClassName = 'table__cell_selected';
    return TableSelection;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableSelection);


/***/ }),

/***/ "./components/table/helpers/handleMatrix.ts":
/*!**************************************************!*\
  !*** ./components/table/helpers/handleMatrix.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./range */ "./components/table/helpers/range.ts");

/**
 * Функция получения массива id ячеек.
 * @param {Dom} target - dom элемент выделенной ячейки
 * @param {Dom | null} current - dom элемент ячейки, по которой произошел клик
 * @returns Массив ID диапазона ячеек
 */
var handleMatrix = function ($target, $current) {
    var target = $target.getId(true);
    var current = $current === null || $current === void 0 ? void 0 : $current.getId(true);
    var cols = [];
    var rows = [];
    if (target && current) {
        cols = (0,_range__WEBPACK_IMPORTED_MODULE_0__["default"])(current.col, target.col);
        rows = (0,_range__WEBPACK_IMPORTED_MODULE_0__["default"])(current.row, target.row);
        var selectedIds = cols.reduce(function (acc, colNumber) {
            rows.forEach(function (rowNumber) { return acc.push("".concat(rowNumber, ":").concat(colNumber)); });
            return acc;
        }, []);
        return selectedIds;
    }
    return [];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleMatrix);


/***/ }),

/***/ "./components/table/helpers/handleResize.ts":
/*!**************************************************!*\
  !*** ./components/table/helpers/handleResize.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_core_dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/core/dom/dom */ "./core/dom/dom.ts");

/**
 * Функция изменения ширины столбцов или высоты строк
 * @param {MouseEvent} event - событие мыши
 * @param $root - dom элемент
 */
var handleResize = function (event, $root) {
    return new Promise(function (resolve) {
        var _a;
        var _b;
        if (event.target instanceof HTMLElement) {
            var resizeAttr_1 = event.target.dataset.resize;
            var $resizer_1 = (0,_src_core_dom_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(event.target);
            var $parent_1 = $resizer_1.closest('[data-type="resizable"]');
            var coords_1 = $parent_1 === null || $parent_1 === void 0 ? void 0 : $parent_1.getCoords();
            var type_1 = (_b = $resizer_1.data) === null || _b === void 0 ? void 0 : _b.resize;
            var sideProperty = type_1 === 'col' ? 'bottom' : 'right';
            var sideValue = type_1 === 'col' ? '-100vh' : '-100vw';
            var value_1;
            if (type_1) {
                $resizer_1.css((_a = {
                        opacity: 1
                    },
                    _a[sideProperty] = sideValue,
                    _a));
            }
            document.onmousemove = function (e) {
                if (coords_1) {
                    if (resizeAttr_1 === 'col') {
                        var delta = e.pageX - coords_1.right;
                        value_1 = coords_1.width + delta;
                        $resizer_1.css({ right: "".concat(-delta, "px") });
                    }
                    else if (resizeAttr_1 === 'row') {
                        var delta = e.pageY - coords_1.bottom;
                        value_1 = coords_1.height + delta;
                        $resizer_1.css({
                            bottom: "".concat(-delta, "px"),
                        });
                    }
                }
            };
            document.onmouseup = function () {
                var _a, _b, _c, _d;
                document.onmousemove = null;
                document.onmouseup = null;
                if (resizeAttr_1 === 'col') {
                    var cells = $root.findAll("[data-col=\"".concat((_a = $parent_1 === null || $parent_1 === void 0 ? void 0 : $parent_1.data) === null || _a === void 0 ? void 0 : _a.col, "\"]"));
                    $parent_1 === null || $parent_1 === void 0 ? void 0 : $parent_1.css({ width: "".concat(value_1, "px") });
                    cells === null || cells === void 0 ? void 0 : cells.forEach(function (element) {
                        if (element instanceof HTMLElement) {
                            element.style.width = "".concat(value_1, "px");
                        }
                    });
                }
                else if (resizeAttr_1 === 'row') {
                    $parent_1 === null || $parent_1 === void 0 ? void 0 : $parent_1.css({ height: "".concat(value_1, "px") });
                }
                var id = type_1 === 'col' ? (_b = $parent_1 === null || $parent_1 === void 0 ? void 0 : $parent_1.data) === null || _b === void 0 ? void 0 : _b.col : (_c = $parent_1 === null || $parent_1 === void 0 ? void 0 : $parent_1.data) === null || _c === void 0 ? void 0 : _c.row;
                if (id && (resizeAttr_1 === 'row' || resizeAttr_1 === 'col')) {
                    resolve({
                        value: value_1,
                        type: resizeAttr_1,
                        id: id,
                    });
                }
                if (type_1) {
                    $resizer_1.css({
                        opacity: 0,
                        bottom: 0,
                        right: 0,
                    });
                }
                return {
                    value: value_1,
                    id: type_1 === 'col' ? (_d = $parent_1 === null || $parent_1 === void 0 ? void 0 : $parent_1.data) === null || _d === void 0 ? void 0 : _d.col : null,
                };
            };
        }
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleResize);


/***/ }),

/***/ "./components/table/helpers/isCell.ts":
/*!********************************************!*\
  !*** ./components/table/helpers/isCell.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Функция проверки, является ли элемент, на который нажали - ячейкой таблицы
 * @param {Event} event - событие клика
 * @returns {Boolean} true или false
 */
var isCell = function (event) { return event.target instanceof HTMLElement && event.target.dataset.type === 'cell'; };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isCell);


/***/ }),

/***/ "./components/table/helpers/nextSelector.ts":
/*!**************************************************!*\
  !*** ./components/table/helpers/nextSelector.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/consts/codes */ "./consts/codes.ts");

/**
 * Функция для изменения data-id ячейки, в зависимости от нажатия клавиш навигации
 * @param {string} key - нажатая клавиша
 * @param {object} id - объект текущей ячейки
 * @returns {string} параметр атрибута для поиска в dom-дереве
 */
var nextSelector = function (key, id) {
    switch (key) {
        case _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.KEYBOARDS.Enter:
        case _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.KEYBOARDS.ArrowDown:
            id.row++;
            break;
        case _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.KEYBOARDS.Tab:
        case _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.KEYBOARDS.ArrowRight:
            id.col++;
            break;
        case _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.KEYBOARDS.ArrowLeft:
            id.col--;
            break;
        case _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.KEYBOARDS.ArrowUp:
            id.row--;
            break;
        default:
    }
    return "[data-id=\"".concat(id.row, ":").concat(id.col, "\"]");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nextSelector);


/***/ }),

/***/ "./components/table/helpers/range.ts":
/*!*******************************************!*\
  !*** ./components/table/helpers/range.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Метод получения диапазона чисел.
 * @param {number} start - Начальное значение
 * @param {number} end - конечное значение
 * @returns {Array} Массив чисел диапазона
 */
var range = function (start, end) {
    var _a;
    if (start > end) {
        _a = [start, end], end = _a[0], start = _a[1];
    }
    return new Array(end - start + 1).fill('').map(function (_, index) { return start + index; });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (range);


/***/ }),

/***/ "./components/table/table.template.ts":
/*!********************************************!*\
  !*** ./components/table/table.template.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/consts/codes */ "./consts/codes.ts");
/* harmony import */ var _src_consts_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/consts/table */ "./consts/table.ts");
/* harmony import */ var _src_helpers_toChar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/helpers/toChar */ "./helpers/toChar.ts");
/* harmony import */ var _src_consts_consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @src/consts/consts */ "./consts/consts.ts");
/* harmony import */ var _helpers_toInlineStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers/toInlineStyles */ "./helpers/toInlineStyles.ts");
/* harmony import */ var _helpers_parseString__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../helpers/parseString */ "./helpers/parseString.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};






/**
 * Создает значение ширины столбца
 *
 * @param {Record<string, number>} colState - объект типа "ключ/значение" размеров ширины столбцов
 * @param {number} index - индекс столбца
 * @returns {string} ширину столбца
 */
var getWidth = function (colState, index) { return "".concat(colState[index] || _src_consts_table__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WIDTH, "px"); };
/**
 * Создает значение высоты строки
 *
 * @param {Record<string, number>} colState - объект типа "ключ/значение" размеров высоты строк
 * @param {number} index - индекс строки
 * @returns {string} высоту строки
 */
var getHeight = function (rowState, index) { return "".concat(rowState[index] || _src_consts_table__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_HEIGHT, "px"); };
/**
 * Обновляет объект колонки, задает ширину столбца
 *
 * @param {IRootState} state - глобальный store
 * @returns {(colName: string, index: number) => ICreateCol} - Название ячейки, индекс и значение ширины столбца
 */
var withWidthFrom = function (state) {
    return function (colName, index) { return ({
        colName: colName,
        index: index,
        colWidth: getWidth(state.colState, index),
    }); };
};
/**
 * Создание ячейки таблицы
 * @returns {HTMLElement} - ячейку таблицы
 */
var createCell = function (rowNumber, state) { return function (_, colNumber) {
    var width = getWidth(state.colState, colNumber);
    var cellId = "".concat(rowNumber, ":").concat(colNumber + 1);
    var data = state.dataState[cellId];
    var styles = (0,_helpers_toInlineStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(__assign(__assign({}, _src_consts_consts__WEBPACK_IMPORTED_MODULE_3__.initialToolbarState), state.stylesState[cellId]));
    var datValue = data || '';
    return /* html */ "\n    <div\n      class=\"table__cell\"\n      style=\"".concat(styles, "; width: ").concat(width, "\"\n      data-type=\"cell\"\n      data-col=\"").concat(colNumber, "\"\n      data-value=\"").concat(datValue, "\"\n      data-id=\"").concat(cellId, "\"\n      contenteditable\n    >").concat((0,_helpers_parseString__WEBPACK_IMPORTED_MODULE_5__["default"])(data) || '', "</div>\n    ");
}; };
/**
 * Создание заголовка таблицы
 * @param {object} param0
 * @property {string} colName - содержимое ячейки
 * @property {number} index - номер колонки
 * @property {string} colWidth - ширина колонки в px
 * @returns {HTMLElement} ячейку заголовка таблицы
 */
var createCol = function (_a) {
    var colName = _a.colName, index = _a.index, colWidth = _a.colWidth;
    return "\n    <div class=\"table__column\" data-type=\"resizable\" data-col=".concat(index, " style=\"width: ").concat(colWidth, "\">\n      ").concat(colName, "\n      <div class=\"table__col-resize\" data-resize=\"col\"></div>\n    </div>\n  ");
};
/**
 * Функция создает строку таблицы
 * @property {string} children - вложенный объект в строке (ячейка)
 * @property {string} rowName - название строки
 * @returns {HTMLElement} строку таблицы
 */
var createRow = function (_a) {
    var _b = _a.children, children = _b === void 0 ? '' : _b, _c = _a.rowName, rowName = _c === void 0 ? '' : _c, rowState = _a.rowState;
    var resize = rowName && /* html */ "<div class=\"table__row-resize\" data-resize=\"row\"></div>";
    var height = rowState ? getHeight(rowState, Number(rowName)) : "".concat(_src_consts_table__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_HEIGHT, "px");
    return /* html */ "\n    <div class=\"table__row\" ".concat(rowName && "data-type=\"resizable\"", " data-row=").concat(rowName, " style=\"height: ").concat(height, "\">\n      <div class=\"table__row_info\">").concat(rowName, "\n        ").concat(resize, "\n      </div>\n      <div class=\"table__row_data\">\n        ").concat(children, "\n      </div>\n    </div>\n  ");
};
/**
 * Создание таблицы (Dom-элумента)
 *
 * @param {ICreateTable} param0
 * @param {ICreateTable} [param0.rowsCount=100] - Число столбцов, которые будут отрендерены
 * @param {ICreateTable} param0.state - глобальный store
 * @returns {string} - html-элемент таблицы
 */
var createTable = function (_a) {
    var _b = _a.rowsCount, rowsCount = _b === void 0 ? 100 : _b, state = _a.state;
    var colsCount = _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.CHART_CODES.Z - _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.CHART_CODES.A + 1;
    var rows = [];
    var cols = Array.from({ length: colsCount }).map(_src_helpers_toChar__WEBPACK_IMPORTED_MODULE_2__["default"]).map(withWidthFrom(state)).map(createCol).join('');
    var cells = function (rowNumber) { return Array.from({ length: colsCount }).map(createCell(rowNumber, state)).join(''); };
    rows.push(createRow({ children: cols, rowState: state.rowState }));
    Array.from({ length: rowsCount }).forEach(function (_, rowNumber) {
        return rows.push(createRow({ children: cells(rowNumber + 1), rowName: String(rowNumber + 1), rowState: state.rowState }));
    });
    return "\n    <div class=\"excel__table table\">\n      ".concat(rows.join(''), "\n    </div>\n  ");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTable);


/***/ }),

/***/ "./components/toolbar/Toolbar.ts":
/*!***************************************!*\
  !*** ./components/toolbar/Toolbar.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_core_dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/core/dom/dom */ "./core/dom/dom.ts");
/* harmony import */ var _src_core_excelStateComponent_ExcelStateComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/core/excelStateComponent/ExcelStateComponent */ "./core/excelStateComponent/ExcelStateComponent.ts");
/* harmony import */ var _src_consts_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/consts/consts */ "./consts/consts.ts");
/* harmony import */ var _toolbar_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toolbar.template */ "./components/toolbar/toolbar.template.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar($root, options) {
        return _super.call(this, $root, __assign({ name: 'Toolbar', listeners: ['click'], subscribe: ['currentStyles'] }, options)) || this;
    }
    Toolbar.prototype.prepare = function () {
        this.initState(_src_consts_consts__WEBPACK_IMPORTED_MODULE_2__.initialToolbarState);
    };
    Object.defineProperty(Toolbar.prototype, "template", {
        get: function () {
            return (0,_toolbar_template__WEBPACK_IMPORTED_MODULE_3__["default"])(this.state);
        },
        enumerable: false,
        configurable: true
    });
    Toolbar.prototype.onClick = function (event) {
        var _a;
        if (event.target instanceof HTMLElement) {
            var $target = (0,_src_core_dom_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(event.target);
            if (((_a = $target.data) === null || _a === void 0 ? void 0 : _a.type) === 'button') {
                var style = JSON.parse($target.data.style);
                this.$trigger('toolbar:applyStyle', style);
            }
        }
    };
    Toolbar.prototype.toHTML = function () {
        return this.template;
    };
    Toolbar.prototype.changeStore = function (changes) {
        this.setState(changes.currentStyles);
    };
    Toolbar.className = 'excel__toolbar toolbar';
    return Toolbar;
}(_src_core_excelStateComponent_ExcelStateComponent__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toolbar);


/***/ }),

/***/ "./components/toolbar/toolbar.template.ts":
/*!************************************************!*\
  !*** ./components/toolbar/toolbar.template.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Создание HTML-элемента кнопки toolbar
 *
 * @param {IButton} button - option кнопки
 * @returns {string} - HTML-элемент кнопки
 */
var createButton = function (button) { /* html */ return "\n<button\n  class=\"toolbar__button ".concat(button.isActive ? 'active' : '', "\"\n  data-type=\"button\"\n  data-style='").concat(JSON.stringify(button.style), "'\n  >\n  <span\n    class=\"material-icons\"\n    data-type=\"button\"\n    data-style='").concat(JSON.stringify(button.style), "'\n  > ").concat(button.icon, " </span>\n</button>"); };
/**
 * Создание HTML-элемента toolbar
 *
 * @param {IToolbarState} state - стили кнопок тулбара
 * @returns {string} - HTML-элемент
 */
var createToolbar = function (state) {
    var toolbarButtons = [
        {
            icon: 'format_align_left',
            isActive: state.textAlign === 'left' || !state.textAlign,
            style: {
                textAlign: 'left',
            },
        },
        {
            icon: 'format_align_center',
            isActive: state.textAlign === 'center',
            style: {
                textAlign: 'center',
            },
        },
        {
            icon: 'format_align_right',
            isActive: state.textAlign === 'right',
            style: {
                textAlign: 'right',
            },
        },
        {
            icon: 'format_bold',
            isActive: state.fontWeight === 'bold',
            style: {
                fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold',
            },
        },
        {
            icon: 'format_italic',
            isActive: state.fontStyle === 'italic',
            style: {
                fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic',
            },
        },
        {
            icon: 'format_underline',
            isActive: state.textDecoration === 'underline',
            style: {
                textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline',
            },
        },
    ];
    return /* html */ "\n  <div class=\"excel__toolbar toolbar\">\n    ".concat(toolbarButtons.map(createButton), "\n  </div>\n");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createToolbar);


/***/ }),

/***/ "./consts/codes.ts":
/*!*************************!*\
  !*** ./consts/codes.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHART_CODES: () => (/* binding */ CHART_CODES),
/* harmony export */   KEYBOARDS: () => (/* binding */ KEYBOARDS)
/* harmony export */ });
var CHART_CODES = Object.freeze({
    A: 65,
    Z: 90,
});
var KEYBOARDS = Object.freeze({
    Enter: 'Enter',
    ArrowDown: 'ArrowDown',
    ArrowRight: 'ArrowRight',
    ArrowLeft: 'ArrowLeft',
    ArrowUp: 'ArrowUp',
    Tab: 'Tab',
});


/***/ }),

/***/ "./consts/consts.ts":
/*!**************************!*\
  !*** ./consts/consts.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_TITLE: () => (/* binding */ DEFAULT_TITLE),
/* harmony export */   initialToolbarState: () => (/* binding */ initialToolbarState)
/* harmony export */ });
// eslint-disable-next-line
var initialToolbarState = {
    textAlign: 'left',
    fontWeight: 'normal',
    textDecoration: 'none',
    fontStyle: 'normal',
};
var DEFAULT_TITLE = 'Новая таблица';


/***/ }),

/***/ "./consts/localStorage.ts":
/*!********************************!*\
  !*** ./consts/localStorage.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXCEL_STATE: () => (/* binding */ EXCEL_STATE)
/* harmony export */ });
// eslint-disable-next-line
var EXCEL_STATE = 'excel-state';


/***/ }),

/***/ "./consts/table.ts":
/*!*************************!*\
  !*** ./consts/table.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_HEIGHT: () => (/* binding */ DEFAULT_HEIGHT),
/* harmony export */   DEFAULT_WIDTH: () => (/* binding */ DEFAULT_WIDTH)
/* harmony export */ });
var DEFAULT_WIDTH = 120;
var DEFAULT_HEIGHT = 20;


/***/ }),

/***/ "./core/domListener/DomListener.ts":
/*!*****************************************!*\
  !*** ./core/domListener/DomListener.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_helpers_getNameWithPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/helpers/getNameWithPrefix */ "./helpers/getNameWithPrefix.ts");

var DomListener = /** @class */ (function () {
    function DomListener($root, options) {
        if (!$root) {
            throw new Error('No $root provided for DomListener');
        }
        this.$root = $root;
        this.listeners = options.listeners || [];
        this.name = options.name || '';
    }
    DomListener.prototype.initDomListeners = function () {
        var _this = this;
        this.listeners.forEach(function (listener) {
            var _a;
            var method = (0,_src_helpers_getNameWithPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])(listener);
            // @ts-ignore
            if (!_this[method]) {
                var name_1 = _this.name || '';
                throw new Error("Method ".concat(method, " os not implemented in ").concat(name_1, " Component"));
            }
            // @ts-ignore
            _this[method] = (_a = _this[method]) === null || _a === void 0 ? void 0 : _a.bind(_this);
            // @ts-ignore
            _this.$root.on(listener, _this[method]);
        });
    };
    DomListener.prototype.removeDomListeners = function () {
        var _this = this;
        this.listeners.forEach(function (listener) {
            var method = (0,_src_helpers_getNameWithPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])(listener);
            // @ts-ignore
            if (!_this[method]) {
                var name_2 = _this.name || '';
                throw new Error("Method ".concat(method, " os not implemented in ").concat(name_2, " Component"));
            }
            // @ts-ignore
            _this.$root.off(listener, _this[method]);
        });
    };
    return DomListener;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomListener);


/***/ }),

/***/ "./core/dom/dom.ts":
/*!*************************!*\
  !*** ./core/dom/dom.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dom: () => (/* binding */ Dom),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Dom = /** @class */ (function () {
    function Dom(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    }
    Object.defineProperty(Dom.prototype, "data", {
        /**
         * getter получения data-атрибутов элемента
         */
        get: function () {
            if (this.$el instanceof HTMLElement) {
                return this.$el.dataset;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Dom.prototype.html = function (html) {
        var _a;
        if (typeof html === 'string') {
            if (this.$el) {
                this.$el.innerHTML = html;
                return this;
            }
        }
        return (_a = this.$el) === null || _a === void 0 ? void 0 : _a.outerHTML.trim();
    };
    Dom.prototype.text = function (text) {
        var _a, _b, _c;
        if (typeof text !== 'undefined') {
            if (this.$el)
                this.$el.textContent = String(text);
            return this;
        }
        if (((_a = this.$el) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === 'input' && this.$el instanceof HTMLInputElement) {
            return this.$el.value.trim();
        }
        return (_c = (_b = this.$el) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim();
    };
    Dom.prototype.clear = function () {
        this.html('');
        return this;
    };
    Dom.prototype.on = function (eventType, callback) {
        var _a;
        (_a = this.$el) === null || _a === void 0 ? void 0 : _a.addEventListener(eventType, callback);
    };
    Dom.prototype.off = function (eventType, callback) {
        var _a;
        (_a = this.$el) === null || _a === void 0 ? void 0 : _a.removeEventListener(eventType, callback);
    };
    Dom.prototype.append = function (node) {
        var _a;
        var nodeElement;
        if (node instanceof Dom) {
            nodeElement = node.$el;
        }
        else {
            nodeElement = node;
        }
        if (nodeElement) {
            (_a = this.$el) === null || _a === void 0 ? void 0 : _a.append(nodeElement);
        }
        return this;
    };
    Dom.prototype.closest = function (selector) {
        var _a;
        var nodeElement = (_a = this.$el) === null || _a === void 0 ? void 0 : _a.closest(selector);
        if (nodeElement && nodeElement instanceof HTMLElement) {
            // eslint-disable-next-line
            return $(nodeElement);
        }
        return null;
    };
    Dom.prototype.getCoords = function () {
        var _a;
        return (_a = this.$el) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    };
    Dom.prototype.getId = function (parse) {
        var _a, _b;
        if (parse) {
            var parsed = (_a = this.getId(false)) === null || _a === void 0 ? void 0 : _a.split(':');
            return parsed
                ? {
                    row: Number(parsed[0]),
                    col: Number(parsed[1]),
                }
                : undefined;
        }
        return (_b = this.data) === null || _b === void 0 ? void 0 : _b.id;
    };
    Dom.prototype.find = function (selector) {
        var _a;
        var element = (_a = this.$el) === null || _a === void 0 ? void 0 : _a.querySelector(selector);
        if (element && element instanceof HTMLElement) {
            // eslint-disable-next-line
            return $(element);
        }
        return undefined;
    };
    Dom.prototype.findAll = function (selector) {
        var _a;
        return (_a = this.$el) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selector);
    };
    Dom.prototype.focus = function () {
        var _a;
        if (this.$el instanceof HTMLElement)
            (_a = this.$el) === null || _a === void 0 ? void 0 : _a.focus();
        return this;
    };
    Dom.prototype.css = function (styles) {
        var _this = this;
        Object.entries(styles).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (_this.$el instanceof HTMLElement) {
                _this.$el.style[key] = String(value);
            }
        });
    };
    Dom.prototype.getStyles = function (styles) {
        var _this = this;
        return styles.reduce(function (acc, styleProp) {
            var _a;
            // @ts-ignore
            acc[styleProp] = (_a = _this.$el) === null || _a === void 0 ? void 0 : _a.style[styleProp];
            return acc;
        }, {});
    };
    Dom.prototype.addClass = function (className) {
        var _a;
        (_a = this.$el) === null || _a === void 0 ? void 0 : _a.classList.add(className);
        return this;
    };
    Dom.prototype.removeClass = function (className) {
        var _a;
        (_a = this.$el) === null || _a === void 0 ? void 0 : _a.classList.remove(className);
        return this;
    };
    Dom.prototype.attr = function (name, value) {
        var _a, _b, _c;
        if (typeof value === 'string') {
            (_a = this.$el) === null || _a === void 0 ? void 0 : _a.setAttribute(name, value);
            return this;
        }
        if ((_b = this.$el) === null || _b === void 0 ? void 0 : _b.hasAttribute(name)) {
            var att = (_c = this.$el) === null || _c === void 0 ? void 0 : _c.getAttribute(name);
            return att;
        }
        return '';
    };
    return Dom;
}());

var $ = function (selector) { return new Dom(selector); };
/**
 * Создание dom-элемента
 *
 * @param tagName - тип html-тэга
 * @param classes - список классов, которые необходимо добавить создаваемому dom-элементу
 * @returns dom-элемент
 */
$.create = function (tagName, classes) {
    if (classes === void 0) { classes = ''; }
    var el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($);


/***/ }),

/***/ "./core/excelComponent/ExcelComponent.ts":
/*!***********************************************!*\
  !*** ./core/excelComponent/ExcelComponent.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_core_domListener_DomListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/core/domListener/DomListener */ "./core/domListener/DomListener.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var ExcelComponent = /** @class */ (function (_super) {
    __extends(ExcelComponent, _super);
    // private storeSub: ReturnType<typeof this.store.subscribe> | null;
    function ExcelComponent($root, options) {
        if (options === void 0) { options = {}; }
        var _a, _b;
        var _this = _super.call(this, $root, options) || this;
        _this.observer = (_a = options.observer) !== null && _a !== void 0 ? _a : null;
        _this.subscribes = options.subscribes || [];
        _this.store = options.store;
        _this.name = (_b = options.name) !== null && _b !== void 0 ? _b : '';
        _this.unsubscribers = [];
        _this.prepare();
        return _this;
        // this.storeSub = null;
    }
    ExcelComponent.prototype.prepare = function () { };
    ExcelComponent.prototype.toHTML = function () {
        return '';
    };
    ExcelComponent.prototype.init = function () {
        this.initDomListeners();
    };
    ExcelComponent.prototype.$trigger = function (event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.trigger.apply(_a, __spreadArray([event], args, false));
    };
    ExcelComponent.prototype.$subscribe = function (event, fn) {
        var _a;
        var unsub = (_a = this.observer) === null || _a === void 0 ? void 0 : _a.subscribe(event, fn);
        if (unsub)
            this.unsubscribers.push(unsub);
    };
    ExcelComponent.prototype.$dispatch = function (action) {
        this.store.dispatch(action);
    };
    // eslint-disable-next-line
    ExcelComponent.prototype.changeStore = function (changes) { };
    ExcelComponent.prototype.isWatching = function (key) {
        return this.subscribes.includes(key);
    };
    ExcelComponent.prototype.destroy = function () {
        this.removeDomListeners();
        this.unsubscribers.forEach(function (unsub) { return unsub(); });
        // this.storeSub?.unsubscribe();
    };
    return ExcelComponent;
}(_src_core_domListener_DomListener__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExcelComponent);


/***/ }),

/***/ "./core/excelStateComponent/ExcelStateComponent.ts":
/*!*********************************************************!*\
  !*** ./core/excelStateComponent/ExcelStateComponent.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _excelComponent_ExcelComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../excelComponent/ExcelComponent */ "./core/excelComponent/ExcelComponent.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var ExcelStateComponent = /** @class */ (function (_super) {
    __extends(ExcelStateComponent, _super);
    // eslint-disable-next-line
    function ExcelStateComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // @ts-ignore
        var _this = _super.apply(this, args) || this;
        _this.state = {};
        return _this;
    }
    Object.defineProperty(ExcelStateComponent.prototype, "template", {
        get: function () {
            return JSON.stringify(this.state, null, 2);
        },
        enumerable: false,
        configurable: true
    });
    ExcelStateComponent.prototype.initState = function (initialState) {
        this.state = initialState;
    };
    ExcelStateComponent.prototype.setState = function (newState) {
        this.state = __assign(__assign({}, this.state), newState);
        this.$root.html(this.template);
    };
    return ExcelStateComponent;
}(_excelComponent_ExcelComponent__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExcelStateComponent);


/***/ }),

/***/ "./core/observer/Observer.ts":
/*!***********************************!*\
  !*** ./core/observer/Observer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Observer = /** @class */ (function () {
    function Observer() {
        this.listeners = {};
    }
    Observer.prototype.trigger = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.listeners[eventName].forEach(function (listener) {
            listener.apply(void 0, args);
        });
    };
    Observer.prototype.subscribe = function (event, fn) {
        var _this = this;
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return function () {
            _this.listeners[event] = _this.listeners[event].filter(function (listener) { return listener !== fn; });
        };
    };
    return Observer;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Observer);


/***/ }),

/***/ "./core/routes/ActiveRoute.ts":
/*!************************************!*\
  !*** ./core/routes/ActiveRoute.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ActiveRoute = /** @class */ (function () {
    function ActiveRoute() {
    }
    Object.defineProperty(ActiveRoute, "path", {
        /**
         * Геттер получения текущего адреса
         *
         * @static
         * @readonly
         * @type {string}
         */
        get: function () {
            return window.location.hash.slice(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActiveRoute, "param", {
        /**
         * Геттер получения параметра таблицы
         *
         * @static
         * @readonly
         * @type {string}
         */
        get: function () {
            return ActiveRoute.path.split('/')[1];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Перенаправляет на заданный адрес
     *
     * @static
     * @param {string} path - необходимый адрес
     */
    ActiveRoute.navigate = function (path) {
        window.location.hash = path;
    };
    return ActiveRoute;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActiveRoute);


/***/ }),

/***/ "./core/routes/Page.ts":
/*!*****************************!*\
  !*** ./core/routes/Page.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Page = /** @class */ (function () {
    function Page(params) {
        this.params = params;
    }
    Page.prototype.getRoot = function () {
        throw new Error('error page');
    };
    Page.prototype.afterRender = function () { };
    Page.prototype.destroy = function () { };
    return Page;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Page);


/***/ }),

/***/ "./core/routes/Router.ts":
/*!*******************************!*\
  !*** ./core/routes/Router.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/dom */ "./core/dom/dom.ts");
/* harmony import */ var _ActiveRoute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActiveRoute */ "./core/routes/ActiveRoute.ts");


var Router = /** @class */ (function () {
    function Router(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router');
        }
        this.$placeholder = (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(selector);
        this.routes = routes;
        this.page = null;
        this.changePageHandler = this.changePageHandler.bind(this);
        this.init();
    }
    Router.prototype.init = function () {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    };
    Router.prototype.changePageHandler = function () {
        this.$placeholder.clear();
        if (this.page) {
            this.page.destroy();
        }
        var PageClass = _ActiveRoute__WEBPACK_IMPORTED_MODULE_1__["default"].path.includes('excel') ? this.routes.excel : this.routes.dashboard;
        this.page = new PageClass(_ActiveRoute__WEBPACK_IMPORTED_MODULE_1__["default"].param);
        this.$placeholder.append(this.page.getRoot());
        this.page.afterRender();
    };
    Router.prototype.destroy = function () {
        window.removeEventListener('hashchange', this.changePageHandler);
    };
    return Router;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);


/***/ }),

/***/ "./core/storeSubscriber/StoreSubscriber.ts":
/*!*************************************************!*\
  !*** ./core/storeSubscriber/StoreSubscriber.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_helpers_isEqual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/helpers/isEqual */ "./helpers/isEqual.ts");

var StoreSubscriber = /** @class */ (function () {
    function StoreSubscriber(store) {
        this.store = store;
        this.storeSub = null;
        this.prevState = {};
    }
    StoreSubscriber.prototype.subscribeComponents = function (components) {
        var _this = this;
        this.prevState = this.store.getState();
        this.storeSub = this.store.subscribe(function (state) {
            Object.keys(state).forEach(function (key) {
                var keyState = key;
                if (!(0,_src_helpers_isEqual__WEBPACK_IMPORTED_MODULE_0__["default"])(_this.prevState[keyState], state[keyState])) {
                    components.forEach(function (component) {
                        var _a;
                        if (component.isWatching(keyState)) {
                            var changes = (_a = {}, _a[keyState] = state[keyState], _a);
                            component.changeStore(changes);
                        }
                    });
                }
            });
            _this.prevState = _this.store.getState();
        });
    };
    StoreSubscriber.prototype.unsubscribeFromStore = function () {
        var _a;
        (_a = this.storeSub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    };
    return StoreSubscriber;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StoreSubscriber);


/***/ }),

/***/ "./helpers/capitalize.ts":
/*!*******************************!*\
  !*** ./helpers/capitalize.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Возвращает строку, но первая буква будет заглавная
 *
 * @param {TListeners} string - Строка, которую необходимо изменить
 * @returns {TUpperListeners} - ту же строку, но с большой буквы
 */
var capitalize = function (string) {
    var upperString = (string.charAt(0).toUpperCase() + string.slice(1));
    return upperString;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (capitalize);


/***/ }),

/***/ "./helpers/debounce.ts":
/*!*****************************!*\
  !*** ./helpers/debounce.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Выполнить код с задержкой
 *
 * @template {any[]} TArgs - тип аргументов, передаваемые в колбэк-функцию
 * @param {(...args: TArgs) => void} fn - колбэк-функция, которую необходимо выполнить
 * @param {number} wait - время задержки
 * @returns {void, wait: number) => (...args: TArgs) => void} - коблбэк-функция
 */
var debounce = function (fn, wait) {
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            clearTimeout(timeout);
            fn.apply(void 0, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (debounce);


/***/ }),

/***/ "./helpers/getNameWithPrefix.ts":
/*!**************************************!*\
  !*** ./helpers/getNameWithPrefix.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalize */ "./helpers/capitalize.ts");

/**
 * Переводит полученную строку в camelCase формат с префиксом 'on'
 *
 * @param {TListeners} eventName - название слушателя
 * @returns {TMethods} - строку с префиксом on в формате camelCase
 */
var getNameWithPrefix = function (eventName) { return "on".concat((0,_capitalize__WEBPACK_IMPORTED_MODULE_0__["default"])(eventName)); };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getNameWithPrefix);


/***/ }),

/***/ "./helpers/isEqual.ts":
/*!****************************!*\
  !*** ./helpers/isEqual.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Метод сравнения предыдущего состояния и текущего store
 *
 * @param {*} prevState - предыдущее состояние
 * @param {*} state - текущее состояние
 * @returns {boolean}
 */
var isEqual = function (prevState, state) {
    if (typeof prevState === 'object' && typeof state === 'object') {
        return JSON.stringify(prevState) === JSON.stringify(state);
    }
    return prevState === state;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEqual);


/***/ }),

/***/ "./helpers/localStorage.ts":
/*!*********************************!*\
  !*** ./helpers/localStorage.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Функция получения данных из localStorage или сохранения данных
 * @param {string}key - ключ, по которому устанавливается значение либо получает
 * @param {unknown} data - данные, которые необходимо поместить в localStorage
 * @returns данные из localStorage
 */
var localStorageFn = function (key, data) {
    if (!data) {
        var localStorageData = localStorage.getItem(key);
        return localStorageData ? JSON.parse(localStorageData) : undefined;
    }
    localStorage.setItem(key, JSON.stringify(data));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localStorageFn);


/***/ }),

/***/ "./helpers/parseString.ts":
/*!********************************!*\
  !*** ./helpers/parseString.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Парсит строку и выполняет JS код, если строка является формулой в Excel
 *
 * @param {string} [value=''] - строка, заполненная в ячейке
 * @returns {string} - результат вычисления или введенная строка
 */
var parseString = function (value) {
    if (value === void 0) { value = ''; }
    if (value.startsWith('=')) {
        try {
            // eslint-disable-next-line
            return eval(value.slice(1));
        }
        catch (e) {
            return value;
        }
    }
    return value;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseString);


/***/ }),

/***/ "./helpers/toChar.ts":
/*!***************************!*\
  !*** ./helpers/toChar.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_consts_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/consts/codes */ "./consts/codes.ts");

/**
 * Функция перевода из CharCode в символ, начиная с 65 кода
 * @param {unknown} _ - элемент массива
 * @param {number} index - индекс
 * @returns символ в виде строки
 */
var toChar = function (_, index) { return String.fromCharCode(_src_consts_codes__WEBPACK_IMPORTED_MODULE_0__.CHART_CODES.A + index); };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toChar);


/***/ }),

/***/ "./helpers/toInlineStyles.ts":
/*!***********************************!*\
  !*** ./helpers/toInlineStyles.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var camelToDashCase = function (str) { return str.replace(/([A-Z])/g, function (g) { return "-".concat(g[0].toLowerCase()); }); };
/**
 * Установка инлайновых стилей
 *
 * @template {TCSSStyles} T
 * @param {T} styles - свойство CSS
 * @returns {*}
 */
var toInlineStyles = function (styles) {
    return Object.keys(styles)
        .map(function (key) { return "".concat(camelToDashCase(key), ": ").concat(styles[key]); })
        .join('; ');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toInlineStyles);


/***/ }),

/***/ "./pages/DashboardPage.ts":
/*!********************************!*\
  !*** ./pages/DashboardPage.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_components_dashboard_dashboard_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/components/dashboard/dashboard.functions */ "./components/dashboard/dashboard.functions.ts");
/* harmony import */ var _src_core_dom_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/core/dom/dom */ "./core/dom/dom.ts");
/* harmony import */ var _src_core_routes_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/core/routes/Page */ "./core/routes/Page.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var DashboardPage = /** @class */ (function (_super) {
    __extends(DashboardPage, _super);
    function DashboardPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardPage.prototype.getRoot = function () {
        var newId = Date.now().toString();
        var nodeElement = _src_core_dom_dom__WEBPACK_IMPORTED_MODULE_1__["default"].create('div', 'dashboard').html(/* html */ "\n      <header class=\"dashboard__header\">\n          <h1>Excel Dashboard</h1>\n        </header>\n        <div class=\"dashboard__new\">\n          <div class=\"dashboard__view\">\n            <a href=\"#excel/".concat(newId, "\" class=\"dashboard__create\">\u041D\u043E\u0432\u0430\u044F \u0442\u0430\u0431\u043B\u0438\u0446\u0430</a>\n          </div>\n        </div>\n\n        <div class=\"dashboard__table dashboard__view\">\n          ").concat((0,_src_components_dashboard_dashboard_functions__WEBPACK_IMPORTED_MODULE_0__.createTable)(), "\n        </div>\n      "));
        return nodeElement;
    };
    return DashboardPage;
}(_src_core_routes_Page__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DashboardPage);


/***/ }),

/***/ "./pages/ExcelPage.ts":
/*!****************************!*\
  !*** ./pages/ExcelPage.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_components_excel_Excel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/components/excel/Excel */ "./components/excel/Excel.ts");
/* harmony import */ var _src_components_formula_Formula__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/components/formula/Formula */ "./components/formula/Formula.ts");
/* harmony import */ var _src_components_header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/components/header/Header */ "./components/header/Header.ts");
/* harmony import */ var _src_components_table_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @src/components/table/Table */ "./components/table/Table.ts");
/* harmony import */ var _src_components_toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @src/components/toolbar/Toolbar */ "./components/toolbar/Toolbar.ts");
/* harmony import */ var _src_core_routes_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @src/core/routes/Page */ "./core/routes/Page.ts");
/* harmony import */ var _src_helpers_debounce__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @src/helpers/debounce */ "./helpers/debounce.ts");
/* harmony import */ var _src_helpers_localStorage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @src/helpers/localStorage */ "./helpers/localStorage.ts");
/* harmony import */ var _src_store_createStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @src/store/createStore */ "./store/createStore.ts");
/* harmony import */ var _src_store_initialState__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @src/store/initialState */ "./store/initialState.ts");
/* harmony import */ var _src_store_rootReducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @src/store/rootReducer */ "./store/rootReducer.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();











var storageName = function (param) { return "excel:".concat(param); };
var ExcelPage = /** @class */ (function (_super) {
    __extends(ExcelPage, _super);
    function ExcelPage(params) {
        var _this = _super.call(this, params) || this;
        _this.excel = null;
        return _this;
    }
    ExcelPage.prototype.getRoot = function () {
        var _a;
        var params = (_a = this.params) !== null && _a !== void 0 ? _a : Date.now().toString();
        var localState = (0,_src_helpers_localStorage__WEBPACK_IMPORTED_MODULE_7__["default"])(storageName(params));
        var store = (0,_src_store_createStore__WEBPACK_IMPORTED_MODULE_8__["default"])(_src_store_rootReducer__WEBPACK_IMPORTED_MODULE_10__["default"], (0,_src_store_initialState__WEBPACK_IMPORTED_MODULE_9__.normalizeInitialState)(localState));
        var stateListener = (0,_src_helpers_debounce__WEBPACK_IMPORTED_MODULE_6__["default"])(function (state) {
            (0,_src_helpers_localStorage__WEBPACK_IMPORTED_MODULE_7__["default"])(storageName(params), state);
        }, 500);
        store.subscribe(stateListener);
        this.excel = new _src_components_excel_Excel__WEBPACK_IMPORTED_MODULE_0__["default"]({
            components: [_src_components_header_Header__WEBPACK_IMPORTED_MODULE_2__["default"], _src_components_toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_4__["default"], _src_components_formula_Formula__WEBPACK_IMPORTED_MODULE_1__["default"], _src_components_table_Table__WEBPACK_IMPORTED_MODULE_3__["default"]],
            store: store,
        });
        return this.excel.getRoot();
    };
    ExcelPage.prototype.afterRender = function () {
        var _a;
        (_a = this.excel) === null || _a === void 0 ? void 0 : _a.init();
    };
    ExcelPage.prototype.destroy = function () {
        var _a;
        (_a = this.excel) === null || _a === void 0 ? void 0 : _a.destroy();
    };
    return ExcelPage;
}(_src_core_routes_Page__WEBPACK_IMPORTED_MODULE_5__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExcelPage);


/***/ }),

/***/ "./store/actions.ts":
/*!**************************!*\
  !*** ./store/actions.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyles: () => (/* binding */ applyStyles),
/* harmony export */   changeTextActionCreator: () => (/* binding */ changeTextActionCreator),
/* harmony export */   changeTitle: () => (/* binding */ changeTitle),
/* harmony export */   getCurrentStyles: () => (/* binding */ getCurrentStyles),
/* harmony export */   tableResizeActionCreator: () => (/* binding */ tableResizeActionCreator),
/* harmony export */   updateDate: () => (/* binding */ updateDate)
/* harmony export */ });
var tableResizeActionCreator = function (data) { return ({
    type: 'TABLE_RESIZE',
    payload: data,
}); };
var changeTextActionCreator = function (data) { return ({
    type: 'CHANGE_TEXT',
    payload: data,
}); };
var getCurrentStyles = function (data) { return ({
    type: 'CURRENT_STYLES',
    payload: data,
}); };
var applyStyles = function (data) { return ({
    type: 'APPLY_STYLE',
    payload: data,
}); };
var changeTitle = function (data) { return ({
    type: 'CHANGE_TITLE',
    payload: data,
}); };
var updateDate = function () { return ({
    type: 'UPDATE_DATE',
}); };


/***/ }),

/***/ "./store/createStore.ts":
/*!******************************!*\
  !*** ./store/createStore.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var createStore = function (rootReducer, initialState) {
    var state = rootReducer(__assign({}, initialState), { type: '__INIT__', payload: '' });
    var listeners = [];
    return {
        subscribe: function (fn) {
            listeners.push(fn);
            return {
                unsubscribe: function () {
                    listeners = listeners.filter(function (listener) { return listener !== fn; });
                },
            };
        },
        dispatch: function (action) {
            state = rootReducer(state, action);
            listeners.forEach(function (listener) { return listener(state); });
        },
        getState: function () {
            return structuredClone(state);
        },
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStore);


/***/ }),

/***/ "./store/initialState.ts":
/*!*******************************!*\
  !*** ./store/initialState.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultState: () => (/* binding */ defaultState),
/* harmony export */   initialState: () => (/* binding */ initialState),
/* harmony export */   normalizeInitialState: () => (/* binding */ normalizeInitialState)
/* harmony export */ });
/* harmony import */ var _src_consts_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/consts/consts */ "./consts/consts.ts");
/* harmony import */ var _src_consts_localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/consts/localStorage */ "./consts/localStorage.ts");
/* harmony import */ var _src_helpers_localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/helpers/localStorage */ "./helpers/localStorage.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: _src_consts_consts__WEBPACK_IMPORTED_MODULE_0__.initialToolbarState,
    title: _src_consts_consts__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TITLE,
    dateTable: new Date().toJSON(),
};
var localStorageState = (0,_src_helpers_localStorage__WEBPACK_IMPORTED_MODULE_2__["default"])(_src_consts_localStorage__WEBPACK_IMPORTED_MODULE_1__.EXCEL_STATE);
var initialState = localStorageState || structuredClone(defaultState);
var normalize = function (state) { return (__assign(__assign({}, state), { currentStyle: _src_consts_consts__WEBPACK_IMPORTED_MODULE_0__.initialToolbarState, currentText: '' })); };
var normalizeInitialState = function (state) { return (state ? normalize(state) : structuredClone(defaultState)); };


/***/ }),

/***/ "./store/rootReducer.ts":
/*!******************************!*\
  !*** ./store/rootReducer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var getValue = function (state, field, action, payloadValue) {
    var _a;
    var val = state[field] || {};
    // @ts-ignore
    val[(_a = action.payload) === null || _a === void 0 ? void 0 : _a.id] = payloadValue;
    return val;
};
var rootReducer = function (state, action) {
    var _a, _b;
    var prevState;
    var field;
    var val;
    switch (action.type) {
        case 'TABLE_RESIZE':
            field = action.payload.type === 'col' ? 'colState' : 'rowState';
            return __assign(__assign({}, state), (_a = {}, _a[field] = getValue(state, field, action, action.payload.value), _a));
        case 'CHANGE_TEXT':
            field = 'dataState';
            prevState = state.dataState || {};
            prevState[action.payload.id] = action.payload.text;
            return __assign(__assign({}, state), { currentText: action.payload.text, 
                // @ts-ignore
                dataState: getValue(state, field, action.payload, action.payload.text) });
        case 'CURRENT_STYLES':
            return __assign(__assign({}, state), { currentStyles: action.payload });
        case 'APPLY_STYLE':
            field = 'stylesState';
            val = state[field] || {};
            action.payload.ids.forEach(function (id) {
                if (id) {
                    val[id] = __assign(__assign({}, val[id]), action.payload.value);
                }
            });
            return __assign(__assign({}, state), (_b = {}, _b[field] = val, _b.currentStyles = __assign(__assign({}, state.currentStyles), action.payload.value), _b));
        case 'CHANGE_TITLE':
            return __assign(__assign({}, state), { title: action.payload });
        case 'UPDATE_DATE':
            return __assign(__assign({}, state), { dateTable: new Date().toJSON() });
        default:
            return state;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rootReducer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_routes_Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/routes/Router */ "./core/routes/Router.ts");
/* harmony import */ var _pages_DashboardPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/DashboardPage */ "./pages/DashboardPage.ts");
/* harmony import */ var _pages_ExcelPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/ExcelPage */ "./pages/ExcelPage.ts");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scss/index.scss */ "./scss/index.scss");




// eslint-disable-next-line
new _core_routes_Router__WEBPACK_IMPORTED_MODULE_0__["default"]('#app', {
    dashboard: _pages_DashboardPage__WEBPACK_IMPORTED_MODULE_1__["default"],
    excel: _pages_ExcelPage__WEBPACK_IMPORTED_MODULE_2__["default"],
});

})();

/******/ })()
;