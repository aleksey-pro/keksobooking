'use strict';


/**
 * Модуль создания точек на карте
 */

window.createData = (function () {
  
  /**
   * Функция экспорта отфильтрованных данных в массив с объявлениями
   * @param {String} data
   */

  var onLoad = function (data) {
    window.mapFilters.transferData(data);
  };
  
  /**
   * Функция вывода ошибки в DOM-элемент
   * @param {String} err
   */

  var onError = function (err) {
    var form = document.querySelector('.notice__form');
    var errMes = form.querySelector('.err-message');
    errMes.textContent = err;
  };
  
  /**
   * Вызываем метод из модуля загрузки данных
   * @external ./backend
   */
  
  window.backend.load(onLoad, onError);
})();
