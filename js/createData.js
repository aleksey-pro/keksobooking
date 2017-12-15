'use strict';

// Создаем массив карточек и пинов исходя из полученных с сервера данных

window.createData = (function () {

  // Экспортируем из полученных данных массив с объявлениями при успешной загрузке

  var onLoad = function (resp) {
     window.announces = resp;
     return window.announces;
  };

  // Выводим текст и статус ошибки в элемент формы

  var onError = function (err) {
    var form = document.querySelector('.notice__form');
    var errMes = form.querySelector('.err-message');
    errMes.textContent = err;
  };

  // Вызываем метод из модуля загрузки данных

  window.backend.load(onLoad, onError);
})();
