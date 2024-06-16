/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startApp: () => (/* binding */ startApp)\n/* harmony export */ });\n/* harmony import */ var _components_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/render */ \"./src/components/render.ts\");\n\nfunction startApp() {\n    console.log('Application started!');\n    (0,_components_render__WEBPACK_IMPORTED_MODULE_0__.renderForm)();\n}\n\n\n//# sourceURL=webpack://task-management-app/./src/app.ts?");

/***/ }),

/***/ "./src/components/render.ts":
/*!**********************************!*\
  !*** ./src/components/render.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderForm: () => (/* binding */ renderForm)\n/* harmony export */ });\n/* harmony import */ var _taskManipulations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskManipulations */ \"./src/components/taskManipulations.ts\");\n\nfunction renderForm() {\n    var root = document.getElementById('root');\n    var form = document.createElement('form');\n    form.classList.add('task-manager__form');\n    form.addEventListener('submit', function (event) {\n        event.preventDefault();\n        (0,_taskManipulations__WEBPACK_IMPORTED_MODULE_0__.addTask)(event);\n    });\n    form.innerHTML =\n        '<input type=\"text\" class=\"task-manager__form-input\" id=\"form-input\" placeholder=\"Enter a task name...\"/>' +\n            '<button class=\"btn waves-effect waves-light\" type=\"submit\" name=\"action\">Add task<i class=\"material-icons right\">add_circle</i></button>';\n    if (root) {\n        root.append(form);\n    }\n}\n\n\n//# sourceURL=webpack://task-management-app/./src/components/render.ts?");

/***/ }),

/***/ "./src/components/taskManipulations.ts":
/*!*********************************************!*\
  !*** ./src/components/taskManipulations.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addTask: () => (/* binding */ addTask)\n/* harmony export */ });\nfunction addTask(event) {\n    console.log(event.target);\n}\n\n\n//# sourceURL=webpack://task-management-app/./src/components/taskManipulations.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.ts\");\n\n(0,_app__WEBPACK_IMPORTED_MODULE_0__.startApp)();\n\n\n//# sourceURL=webpack://task-management-app/./src/index.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;