'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var mapPins = map.querySelector('.map__pins');
  var formFields = form.querySelectorAll('fieldset');
  var mainButton = document.querySelector('.map__pin--main');
  var activeElement;
  var activeImg;
  var offsetX = 0;
  var offsetY = 0;

  mainButton.addEventListener('mousedown', function (evt) {
    activeImg = evt.target;
    activeElement = activeImg.parentNode;
    // activeImg.draggable = true;
    offsetX = evt.offsetX;
    offsetY = evt.offsetY;
  });

  mainButton.addEventListener('mousemove', function (evt) {
    if (activeElement) {
      activeElement.style.top = (evt.clientY - offsetY) + 'px';
      activeElement.style.left = (evt.clientX - offsetX) + 'px';
    }
  });

  var filled = false; // Предотвратить повторное появление пустых пинов

  mainButton.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    if (!filled) {
      window.createData.fillPoints(mapPins);
    }
    filled = true;
    form.classList.remove('notice__form--disabled');
    for (var h = 0; h < formFields.length; h++) {
      formFields[h].disabled = false;
    }
    activeElement = null;
    // activeImg.draggable = false;
  });

})();


