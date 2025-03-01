/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCart: () => (/* binding */ addToCart),
/* harmony export */   checkout: () => (/* binding */ checkout),
/* harmony export */   getCartTotal: () => (/* binding */ getCartTotal),
/* harmony export */   getTotalItems: () => (/* binding */ getTotalItems),
/* harmony export */   products: () => (/* binding */ products),
/* harmony export */   state: () => (/* binding */ state),
/* harmony export */   toggleCart: () => (/* binding */ toggleCart),
/* harmony export */   updateQuantity: () => (/* binding */ updateQuantity)
/* harmony export */ });
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var products = [{
  id: 0,
  name: 'Jorts',
  price: 0.99,
  image: 'http://placehold.co/150x150?text=Jorts'
}, {
  id: 1,
  name: 'Jean',
  price: 3.14,
  image: 'http://placehold.co/150x150?text=Jean'
}, {
  id: 2,
  name: 'Nyancat',
  price: 2.73,
  image: 'http://placehold.co/150x150?text=Nyancat'
}];
var state = {
  cart: {},
  isCartVisible: false
};
var addToCart = function addToCart(productIndex) {
  if (!state.cart[productIndex]) {
    state.cart[productIndex] = 0;
  }
  state.cart[productIndex]++;
};
var updateQuantity = function updateQuantity(productIndex, quantity) {
  var newQuantity = parseInt(quantity);
  if (newQuantity > 0) {
    state.cart[productIndex] = newQuantity;
  } else {
    delete state.cart[productIndex];
  }
};
var checkout = function checkout() {
  state.cart = {};
  state.isCartVisible = false;
};
var toggleCart = function toggleCart() {
  state.isCartVisible = !state.isCartVisible;
};
var getCartTotal = function getCartTotal() {
  var total = 0;
  for (var _i = 0, _Object$entries = Object.entries(state.cart); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      productIndex = _Object$entries$_i[0],
      quantity = _Object$entries$_i[1];
    var index = parseInt(productIndex);
    var product = products[index];
    if (product) {
      total += product.price * quantity;
    }
  }
  return total;
};
var getTotalItems = function getTotalItems() {
  var sum = 0;
  for (var _i2 = 0, _Object$values = Object.values(state.cart); _i2 < _Object$values.length; _i2++) {
    var quantity = _Object$values[_i2];
    sum += quantity;
  }
  return sum;
};


/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCart: () => (/* binding */ renderCart),
/* harmony export */   renderProducts: () => (/* binding */ renderProducts)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var renderProducts = function renderProducts() {
  var container = document.querySelector('.products-container');
  container.innerHTML = _model__WEBPACK_IMPORTED_MODULE_0__.products.map(function (product) {
    return "\n        <div class=\"product-card\">\n            <img class=\"product-image\" src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n            <h2 class=\"product-name\">").concat(product.name, "</h2>\n            <p class=\"product-price\">$").concat(product.price, "</p>\n            <button class=\"product-add\" data-product-id=\"").concat(product.id, "\"> \n                Add to Cart\n            </button>\n        </div>\n    ");
  }).join('');
};
var renderCart = function renderCart() {
  var totalItems = (0,_model__WEBPACK_IMPORTED_MODULE_0__.getTotalItems)();
  var cartContainer = document.querySelector('.cart-section');
  if (!_model__WEBPACK_IMPORTED_MODULE_0__.state.isCartVisible) {
    cartContainer.innerHTML = "\n            <button class=\"view-cart\">View Cart".concat(totalItems > 0 ? "(".concat(totalItems, ")") : '', "</button>\n        ");
    return;
  }
  var cartItems = Object.entries(_model__WEBPACK_IMPORTED_MODULE_0__.state.cart).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      productIndex = _ref2[0],
      quantity = _ref2[1];
    var index = parseInt(productIndex);
    var product = _model__WEBPACK_IMPORTED_MODULE_0__.products[index];
    var total = (product.price * quantity).toFixed(2);
    return "\n            <div class=\"cart-item\">\n                <img class=\"item-image\" src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n                <span class=\"item-name\">").concat(product.name, "</span>\n                <label class=\"item-label\" for=\"quantity\">\n                    <span class=\"label-name\">Quantity: </span>\n                    <input class=\"label-input\" type=\"number\" min=\"0\" value=\"").concat(quantity, "\" name=\"quantity\" id=\"quantity\" data-product-id=\"").concat(productIndex, "\">\n                </label>\n                <span class=\"item-total\">Total: $").concat(total, "</span>\n            </div>\n        ");
  }).join('');
  cartContainer.innerHTML = "\n        <div class=\"cart-content\">\n            <h2 class=\"cart-title\">Shopping Cart</h2>\n            ".concat(cartItems.length ? cartItems : '<p class="nothing">Nothing in the cart</p>', "\n            <button class=\"hide-cart\">Hide Cart</button>\n            ").concat(cartItems.length ? "\n                <span class=\"cart-total\">Total: $".concat((0,_model__WEBPACK_IMPORTED_MODULE_0__.getCartTotal)().toFixed(2), "</span>\n                <button class=\"cart-checkout\">Checkout</button>\n            ") : '', "            \n        </div>\n    ");
};


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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");


document.querySelector('.products-container').addEventListener('click', function (e) {
  if (e.target.classList.contains('product-add')) {
    var productIndex = e.target.dataset.productId;
    (0,_model__WEBPACK_IMPORTED_MODULE_0__.addToCart)(productIndex);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
  }
});
document.querySelector('.cart-section').addEventListener('click', function (e) {
  if (e.target.classList.contains('view-cart') || e.target.classList.contains('hide-cart')) {
    (0,_model__WEBPACK_IMPORTED_MODULE_0__.toggleCart)();
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
  }
  if (e.target.classList.contains('cart-checkout')) {
    (0,_model__WEBPACK_IMPORTED_MODULE_0__.checkout)();
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
  }
});
document.querySelector('.cart-section').addEventListener('change', function (e) {
  if (e.target.classList.contains('label-input')) {
    var productIndex = e.target.dataset.productId;
    (0,_model__WEBPACK_IMPORTED_MODULE_0__.updateQuantity)(productIndex, e.target.value);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
  }
});
(0,_view__WEBPACK_IMPORTED_MODULE_1__.renderProducts)();
(0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map