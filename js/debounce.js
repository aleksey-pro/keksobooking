'use strict';

/**
 * Модуль оптимизации кликов (прорежение прослушки)
 */

(function () {
  
  /**
   * @const {number}
   */
  
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;
  
  /**
   * Функция задержки прослушки кликов по элементу
   * @param {Function} callback
   */
  
  window.debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };
})();
