'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var mapPins = map.querySelector('.map__pins');
  var formFields = form.querySelectorAll('fieldset');
  var dragButton = document.querySelector('.map__pin--main');
  var dragImage = dragButton.querySelector('img');
  var filled = false; // Предотвратить повторное появление пустых пинов


  dragImage.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var getAddrCoords = function () {
      var adrField = form.elements.address;
      adrField.value = 'x: ' + evt.clientX + ' y: ' + evt.clientY;
      adrField.setAttribute('readonly', 'readonly');
    };

    var startCoords = {
      x: evt.clientX + evt.offsetWidth / 2,
      y: evt.clientY + evt.offsetHeight + 22 + 'px'
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dragButton.style.top = (dragButton.offsetTop - shift.y) + 'px';
      dragButton.style.left = (dragButton.offsetLeft - shift.x) + 'px';

      if (moveEvt.clientY > 500) {
        dragButton.style.top = 500 + 'px';
      } else if (moveEvt.clientY < 100) {
        dragButton.style.top = 100 + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      map.classList.remove('map--faded');
      if (!filled) {
        window.createData.fillPoints(mapPins);
      }
      filled = true;
      form.classList.remove('notice__form--disabled');
      for (var h = 0; h < formFields.length; h++) {
        formFields[h].disabled = false;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', getAddrCoords);

  });

})();
