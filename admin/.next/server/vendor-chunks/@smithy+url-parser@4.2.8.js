"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@smithy+url-parser@4.2.8";
exports.ids = ["vendor-chunks/@smithy+url-parser@4.2.8"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/@smithy+url-parser@4.2.8/node_modules/@smithy/url-parser/dist-cjs/index.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+url-parser@4.2.8/node_modules/@smithy/url-parser/dist-cjs/index.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar querystringParser = __webpack_require__(/*! @smithy/querystring-parser */ \"(rsc)/./node_modules/.pnpm/@smithy+querystring-parser@4.2.8/node_modules/@smithy/querystring-parser/dist-es/index.js\");\n\nconst parseUrl = (url) => {\n    if (typeof url === \"string\") {\n        return parseUrl(new URL(url));\n    }\n    const { hostname, pathname, port, protocol, search } = url;\n    let query;\n    if (search) {\n        query = querystringParser.parseQueryString(search);\n    }\n    return {\n        hostname,\n        port: port ? parseInt(port) : undefined,\n        protocol,\n        path: pathname,\n        query,\n    };\n};\n\nexports.parseUrl = parseUrl;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1cmwtcGFyc2VyQDQuMi44L25vZGVfbW9kdWxlcy9Ac21pdGh5L3VybC1wYXJzZXIvZGlzdC1janMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsd0JBQXdCLG1CQUFPLENBQUMsd0pBQTRCOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQTZDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IiLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZWVwYWsvcHJvamVjdHMvemVucGVvcGxlL3plbnBlb3BsZS13ZWIvYWRtaW4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzbWl0aHkrdXJsLXBhcnNlckA0LjIuOC9ub2RlX21vZHVsZXMvQHNtaXRoeS91cmwtcGFyc2VyL2Rpc3QtY2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHF1ZXJ5c3RyaW5nUGFyc2VyID0gcmVxdWlyZSgnQHNtaXRoeS9xdWVyeXN0cmluZy1wYXJzZXInKTtcblxuY29uc3QgcGFyc2VVcmwgPSAodXJsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlVXJsKG5ldyBVUkwodXJsKSk7XG4gICAgfVxuICAgIGNvbnN0IHsgaG9zdG5hbWUsIHBhdGhuYW1lLCBwb3J0LCBwcm90b2NvbCwgc2VhcmNoIH0gPSB1cmw7XG4gICAgbGV0IHF1ZXJ5O1xuICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeXN0cmluZ1BhcnNlci5wYXJzZVF1ZXJ5U3RyaW5nKHNlYXJjaCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGhvc3RuYW1lLFxuICAgICAgICBwb3J0OiBwb3J0ID8gcGFyc2VJbnQocG9ydCkgOiB1bmRlZmluZWQsXG4gICAgICAgIHByb3RvY29sLFxuICAgICAgICBwYXRoOiBwYXRobmFtZSxcbiAgICAgICAgcXVlcnksXG4gICAgfTtcbn07XG5cbmV4cG9ydHMucGFyc2VVcmwgPSBwYXJzZVVybDtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+url-parser@4.2.8/node_modules/@smithy/url-parser/dist-cjs/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@smithy+url-parser@4.2.8/node_modules/@smithy/url-parser/dist-es/index.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+url-parser@4.2.8/node_modules/@smithy/url-parser/dist-es/index.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   parseUrl: () => (/* binding */ parseUrl)\n/* harmony export */ });\n/* harmony import */ var _smithy_querystring_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/querystring-parser */ \"(rsc)/./node_modules/.pnpm/@smithy+querystring-parser@4.2.8/node_modules/@smithy/querystring-parser/dist-es/index.js\");\n\nconst parseUrl = (url) => {\n    if (typeof url === \"string\") {\n        return parseUrl(new URL(url));\n    }\n    const { hostname, pathname, port, protocol, search } = url;\n    let query;\n    if (search) {\n        query = (0,_smithy_querystring_parser__WEBPACK_IMPORTED_MODULE_0__.parseQueryString)(search);\n    }\n    return {\n        hostname,\n        port: port ? parseInt(port) : undefined,\n        protocol,\n        path: pathname,\n        query,\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1cmwtcGFyc2VyQDQuMi44L25vZGVfbW9kdWxlcy9Ac21pdGh5L3VybC1wYXJzZXIvZGlzdC1lcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUE4RDtBQUN2RDtBQUNQO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQTZDO0FBQ3pEO0FBQ0E7QUFDQSxnQkFBZ0IsNEVBQWdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2RlZXBhay9wcm9qZWN0cy96ZW5wZW9wbGUvemVucGVvcGxlLXdlYi9hZG1pbi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1cmwtcGFyc2VyQDQuMi44L25vZGVfbW9kdWxlcy9Ac21pdGh5L3VybC1wYXJzZXIvZGlzdC1lcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwYXJzZVF1ZXJ5U3RyaW5nIH0gZnJvbSBcIkBzbWl0aHkvcXVlcnlzdHJpbmctcGFyc2VyXCI7XG5leHBvcnQgY29uc3QgcGFyc2VVcmwgPSAodXJsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlVXJsKG5ldyBVUkwodXJsKSk7XG4gICAgfVxuICAgIGNvbnN0IHsgaG9zdG5hbWUsIHBhdGhuYW1lLCBwb3J0LCBwcm90b2NvbCwgc2VhcmNoIH0gPSB1cmw7XG4gICAgbGV0IHF1ZXJ5O1xuICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgcXVlcnkgPSBwYXJzZVF1ZXJ5U3RyaW5nKHNlYXJjaCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGhvc3RuYW1lLFxuICAgICAgICBwb3J0OiBwb3J0ID8gcGFyc2VJbnQocG9ydCkgOiB1bmRlZmluZWQsXG4gICAgICAgIHByb3RvY29sLFxuICAgICAgICBwYXRoOiBwYXRobmFtZSxcbiAgICAgICAgcXVlcnksXG4gICAgfTtcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+url-parser@4.2.8/node_modules/@smithy/url-parser/dist-es/index.js\n");

/***/ })

};
;