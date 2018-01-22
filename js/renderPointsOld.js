'use strict';

(function () {

  // Ограничим количество выодимых пинов при рендеринге

  var TOTAL_POINTS = 5;

  // Отрисуем один указатель

  var renderPoint = function (obj, idx) {
    var pointsTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPoint = pointsTemplate.cloneNode(true);
    mapPoint.classList.add('map__pin');
    mapPoint.setAttribute('data-pin', idx);
    mapPoint.style.left = obj.location.x + 'px';
    mapPoint.style.top = obj.location.y + 'px';
    mapPoint.style.transform = 'translate(-50%, -100%)';
    mapPoint.querySelector('img').src = obj.author.avatar;

    return mapPoint;
  };


  //  Отрисуем все указатели исходя из полученного массива данных

  window.renderPoints = function (data) {
    var map = document.querySelector('.map');
    var mapPins = map.querySelector('.map__pins');
    var pin = map.querySelectorAll('.map__pin');
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < pin.length; j++) {
      if (!pin[j].classList.contains('map__pin--main')) {
        mapPins.removeChild(pin[j]);
      }
    }
    var takeNumber = data.length > TOTAL_POINTS ? TOTAL_POINTS : data.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPoint(data[i], i));
    }
    fragment.appendChild(renderPoint(data));
    mapPins.appendChild(fragment);
  };

})();
