'use strict';

window.mapFunctions = (function () {

  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var articleBlock = map.querySelector('.map__filters-container');
  var parentToArticle = articleBlock.parentNode;

  var removeArticle = function () {
    var article = map.querySelector('article');
    if (article) {
      map.removeChild(article);
    }
  };

  var deactivatePins = function (elems) {
    for (var m = 0; m < elems.length; m++) {
      if (elems[m].classList.contains('map__pin--active')) {
        elems[m].classList.remove('map__pin--active');
      }
    }
  };

  var enableCloseArticle = function () {
    var articleClose = map.querySelector('.popup__close');
    var pins = mapPins.querySelectorAll('.map__pin');
    articleClose.addEventListener('click', function () {
      removeArticle();
      deactivatePins(pins);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        removeArticle();
        deactivatePins(pins);
      }
    });
  };

  return {
    activatePin: function (evt, activePin) {
      if (activePin.classList.contains('map__pin') && !activePin.classList.contains('map__pin--main')) {
        removeArticle();
        var dataIndex = activePin.getAttribute('data-pin');
        window.createData.fillArticle(parentToArticle, articleBlock, dataIndex);
        var pins = mapPins.querySelectorAll('.map__pin');
        deactivatePins(pins);
        activePin.classList.add('map__pin--active');
        enableCloseArticle();
      }
    }
  };

})();

