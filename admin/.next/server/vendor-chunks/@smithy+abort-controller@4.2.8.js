"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@smithy+abort-controller@4.2.8";
exports.ids = ["vendor-chunks/@smithy+abort-controller@4.2.8"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/@smithy+abort-controller@4.2.8/node_modules/@smithy/abort-controller/dist-es/AbortController.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+abort-controller@4.2.8/node_modules/@smithy/abort-controller/dist-es/AbortController.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AbortController: () => (/* binding */ AbortController)\n/* harmony export */ });\n/* harmony import */ var _AbortSignal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbortSignal */ \"(rsc)/./node_modules/.pnpm/@smithy+abort-controller@4.2.8/node_modules/@smithy/abort-controller/dist-es/AbortSignal.js\");\n\nclass AbortController {\n    signal = new _AbortSignal__WEBPACK_IMPORTED_MODULE_0__.AbortSignal();\n    abort() {\n        this.signal.abort();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSthYm9ydC1jb250cm9sbGVyQDQuMi44L25vZGVfbW9kdWxlcy9Ac21pdGh5L2Fib3J0LWNvbnRyb2xsZXIvZGlzdC1lcy9BYm9ydENvbnRyb2xsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNEM7QUFDckM7QUFDUCxpQkFBaUIscURBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZWVwYWsvcHJvamVjdHMvemVucGVvcGxlL3plbnBlb3BsZS13ZWIvYWRtaW4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzbWl0aHkrYWJvcnQtY29udHJvbGxlckA0LjIuOC9ub2RlX21vZHVsZXMvQHNtaXRoeS9hYm9ydC1jb250cm9sbGVyL2Rpc3QtZXMvQWJvcnRDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFib3J0U2lnbmFsIH0gZnJvbSBcIi4vQWJvcnRTaWduYWxcIjtcbmV4cG9ydCBjbGFzcyBBYm9ydENvbnRyb2xsZXIge1xuICAgIHNpZ25hbCA9IG5ldyBBYm9ydFNpZ25hbCgpO1xuICAgIGFib3J0KCkge1xuICAgICAgICB0aGlzLnNpZ25hbC5hYm9ydCgpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+abort-controller@4.2.8/node_modules/@smithy/abort-controller/dist-es/AbortController.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@smithy+abort-controller@4.2.8/node_modules/@smithy/abort-controller/dist-es/AbortSignal.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+abort-controller@4.2.8/node_modules/@smithy/abort-controller/dist-es/AbortSignal.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AbortSignal: () => (/* binding */ AbortSignal)\n/* harmony export */ });\nclass AbortSignal {\n    onabort = null;\n    _aborted = false;\n    constructor() {\n        Object.defineProperty(this, \"_aborted\", {\n            value: false,\n            writable: true,\n        });\n    }\n    get aborted() {\n        return this._aborted;\n    }\n    abort() {\n        this._aborted = true;\n        if (this.onabort) {\n            this.onabort(this);\n            this.onabort = null;\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSthYm9ydC1jb250cm9sbGVyQDQuMi44L25vZGVfbW9kdWxlcy9Ac21pdGh5L2Fib3J0LWNvbnRyb2xsZXIvZGlzdC1lcy9BYm9ydFNpZ25hbC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvZGVlcGFrL3Byb2plY3RzL3plbnBlb3BsZS96ZW5wZW9wbGUtd2ViL2FkbWluL25vZGVfbW9kdWxlcy8ucG5wbS9Ac21pdGh5K2Fib3J0LWNvbnRyb2xsZXJANC4yLjgvbm9kZV9tb2R1bGVzL0BzbWl0aHkvYWJvcnQtY29udHJvbGxlci9kaXN0LWVzL0Fib3J0U2lnbmFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBYm9ydFNpZ25hbCB7XG4gICAgb25hYm9ydCA9IG51bGw7XG4gICAgX2Fib3J0ZWQgPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2Fib3J0ZWRcIiwge1xuICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgYWJvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fib3J0ZWQ7XG4gICAgfVxuICAgIGFib3J0KCkge1xuICAgICAgICB0aGlzLl9hYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMub25hYm9ydCkge1xuICAgICAgICAgICAgdGhpcy5vbmFib3J0KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbmFib3J0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+abort-controller@4.2.8/node_modules/@smithy/abort-controller/dist-es/AbortSignal.js\n");

/***/ })

};
;