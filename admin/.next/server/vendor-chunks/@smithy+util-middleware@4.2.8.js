"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@smithy+util-middleware@4.2.8";
exports.ids = ["vendor-chunks/@smithy+util-middleware@4.2.8"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-cjs/index.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-cjs/index.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar types = __webpack_require__(/*! @smithy/types */ \"(rsc)/./node_modules/.pnpm/@smithy+types@4.12.0/node_modules/@smithy/types/dist-es/index.js\");\n\nconst getSmithyContext = (context) => context[types.SMITHY_CONTEXT_KEY] || (context[types.SMITHY_CONTEXT_KEY] = {});\n\nconst normalizeProvider = (input) => {\n    if (typeof input === \"function\")\n        return input;\n    const promisified = Promise.resolve(input);\n    return () => promisified;\n};\n\nexports.getSmithyContext = getSmithyContext;\nexports.normalizeProvider = normalizeProvider;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLW1pZGRsZXdhcmVANC4yLjgvbm9kZV9tb2R1bGVzL0BzbWl0aHkvdXRpbC1taWRkbGV3YXJlL2Rpc3QtY2pzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxrSEFBZTs7QUFFbkMsa0hBQWtIOztBQUVsSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCLHlCQUF5QiIsInNvdXJjZXMiOlsiL1VzZXJzL2RlZXBhay9wcm9qZWN0cy96ZW5wZW9wbGUvemVucGVvcGxlLXdlYi9hZG1pbi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLW1pZGRsZXdhcmVANC4yLjgvbm9kZV9tb2R1bGVzL0BzbWl0aHkvdXRpbC1taWRkbGV3YXJlL2Rpc3QtY2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHR5cGVzID0gcmVxdWlyZSgnQHNtaXRoeS90eXBlcycpO1xuXG5jb25zdCBnZXRTbWl0aHlDb250ZXh0ID0gKGNvbnRleHQpID0+IGNvbnRleHRbdHlwZXMuU01JVEhZX0NPTlRFWFRfS0VZXSB8fCAoY29udGV4dFt0eXBlcy5TTUlUSFlfQ09OVEVYVF9LRVldID0ge30pO1xuXG5jb25zdCBub3JtYWxpemVQcm92aWRlciA9IChpbnB1dCkgPT4ge1xuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIGNvbnN0IHByb21pc2lmaWVkID0gUHJvbWlzZS5yZXNvbHZlKGlucHV0KTtcbiAgICByZXR1cm4gKCkgPT4gcHJvbWlzaWZpZWQ7XG59O1xuXG5leHBvcnRzLmdldFNtaXRoeUNvbnRleHQgPSBnZXRTbWl0aHlDb250ZXh0O1xuZXhwb3J0cy5ub3JtYWxpemVQcm92aWRlciA9IG5vcm1hbGl6ZVByb3ZpZGVyO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-cjs/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSmithyContext: () => (/* binding */ getSmithyContext)\n/* harmony export */ });\n/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/types */ \"(rsc)/./node_modules/.pnpm/@smithy+types@4.12.0/node_modules/@smithy/types/dist-es/middleware.js\");\n\nconst getSmithyContext = (context) => context[_smithy_types__WEBPACK_IMPORTED_MODULE_0__.SMITHY_CONTEXT_KEY] || (context[_smithy_types__WEBPACK_IMPORTED_MODULE_0__.SMITHY_CONTEXT_KEY] = {});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLW1pZGRsZXdhcmVANC4yLjgvbm9kZV9tb2R1bGVzL0BzbWl0aHkvdXRpbC1taWRkbGV3YXJlL2Rpc3QtZXMvZ2V0U21pdGh5Q29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFtRDtBQUM1Qyw4Q0FBOEMsNkRBQWtCLGNBQWMsNkRBQWtCLE1BQU0iLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZWVwYWsvcHJvamVjdHMvemVucGVvcGxlL3plbnBlb3BsZS13ZWIvYWRtaW4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzbWl0aHkrdXRpbC1taWRkbGV3YXJlQDQuMi44L25vZGVfbW9kdWxlcy9Ac21pdGh5L3V0aWwtbWlkZGxld2FyZS9kaXN0LWVzL2dldFNtaXRoeUNvbnRleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU01JVEhZX0NPTlRFWFRfS0VZIH0gZnJvbSBcIkBzbWl0aHkvdHlwZXNcIjtcbmV4cG9ydCBjb25zdCBnZXRTbWl0aHlDb250ZXh0ID0gKGNvbnRleHQpID0+IGNvbnRleHRbU01JVEhZX0NPTlRFWFRfS0VZXSB8fCAoY29udGV4dFtTTUlUSFlfQ09OVEVYVF9LRVldID0ge30pO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/index.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/index.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSmithyContext: () => (/* reexport safe */ _getSmithyContext__WEBPACK_IMPORTED_MODULE_0__.getSmithyContext),\n/* harmony export */   normalizeProvider: () => (/* reexport safe */ _normalizeProvider__WEBPACK_IMPORTED_MODULE_1__.normalizeProvider)\n/* harmony export */ });\n/* harmony import */ var _getSmithyContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getSmithyContext */ \"(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js\");\n/* harmony import */ var _normalizeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normalizeProvider */ \"(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js\");\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLW1pZGRsZXdhcmVANC4yLjgvbm9kZV9tb2R1bGVzL0BzbWl0aHkvdXRpbC1taWRkbGV3YXJlL2Rpc3QtZXMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFtQztBQUNDIiwic291cmNlcyI6WyIvVXNlcnMvZGVlcGFrL3Byb2plY3RzL3plbnBlb3BsZS96ZW5wZW9wbGUtd2ViL2FkbWluL25vZGVfbW9kdWxlcy8ucG5wbS9Ac21pdGh5K3V0aWwtbWlkZGxld2FyZUA0LjIuOC9ub2RlX21vZHVsZXMvQHNtaXRoeS91dGlsLW1pZGRsZXdhcmUvZGlzdC1lcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9nZXRTbWl0aHlDb250ZXh0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9ub3JtYWxpemVQcm92aWRlclwiO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   normalizeProvider: () => (/* binding */ normalizeProvider)\n/* harmony export */ });\nconst normalizeProvider = (input) => {\n    if (typeof input === \"function\")\n        return input;\n    const promisified = Promise.resolve(input);\n    return () => promisified;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLW1pZGRsZXdhcmVANC4yLjgvbm9kZV9tb2R1bGVzL0BzbWl0aHkvdXRpbC1taWRkbGV3YXJlL2Rpc3QtZXMvbm9ybWFsaXplUHJvdmlkZXIuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2RlZXBhay9wcm9qZWN0cy96ZW5wZW9wbGUvemVucGVvcGxlLXdlYi9hZG1pbi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLW1pZGRsZXdhcmVANC4yLjgvbm9kZV9tb2R1bGVzL0BzbWl0aHkvdXRpbC1taWRkbGV3YXJlL2Rpc3QtZXMvbm9ybWFsaXplUHJvdmlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVByb3ZpZGVyID0gKGlucHV0KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgY29uc3QgcHJvbWlzaWZpZWQgPSBQcm9taXNlLnJlc29sdmUoaW5wdXQpO1xuICAgIHJldHVybiAoKSA9PiBwcm9taXNpZmllZDtcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+util-middleware@4.2.8/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js\n");

/***/ })

};
;