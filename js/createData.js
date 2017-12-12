'use strict';

// Создаем массив карточек и пинов исходя из полученных с сервера данных

window.createData = (function () {

  var onLoad = function (data) {
     window.announces = data;
     return window.announces
  };

  var onError = function (err) {
    var form = document.querySelector('.notice__form');
    var errMes = form.querySelector('.err-message');
    errMes.textContent = err;
  };

  window.backend.load('https://1510.dump.academy/keksobooking/data', onLoad, onError);
})();
