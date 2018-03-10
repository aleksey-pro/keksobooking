'use strict';

/**
 * Модуль показа соответсвующего объявления при нажатии на метку
 */

window.showCard = (function () {

  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  map.classList.add('map--faded');
  var mapPins = map.querySelector('.map__pins');


  mapPins.addEventListener('click', function (evt) {
    var activePin = evt.target.parentNode; // при клике реагируем на нажатие на картинку
    window.mapFunctions.activatePin(evt, activePin);
  });

  mapPins.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var activePin = evt.target; // при табе реагируем на нажатие на кнопку
      window.mapFunctions.activatePin(evt, activePin);
    }
  });

})();
