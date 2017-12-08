'use strict';

(function () {

  window.renderPoints = function (obj, idx) {
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

})();
