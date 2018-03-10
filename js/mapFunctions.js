'use strict';

/**
 * Модуль событий карты
 * @returns {Function} activatePin
 */

window.mapFunctions = (function () {

  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var articleBlock = map.querySelector('.map__filters-container');
  var parentToArticle = articleBlock.parentNode;
  
  /**
   * Функция удаления объявления
   */
  
  var removeArticle = function () {
    var article = map.querySelector('article');
    if (article) {
      map.removeChild(article);
    }
  };
  
  /**
   * Функция деактивации меток
   * @param {NodeList} elems
   */

  var deactivatePins = function (elems) {
    for (var m = 0; m < elems.length; m++) {
      if (elems[m].classList.contains('map__pin--active')) {
        elems[m].classList.remove('map__pin--active');
      }
    }
  };
  
  /**
   * Функция вызова событий при нажатии кнопки закрытия объявления или кнопки Escape
   */

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
  
    /**
     * Функция открытия объявления
     * @param {MouseEvent} evt
     * @param {Element} activePin
     * @param {Array} data
     */
    activatePin: function (evt, activePin, data) {
      if (activePin.classList.contains('map__pin') && !activePin.classList.contains('map__pin--main')) {
        removeArticle();
        var dataIndex = activePin.getAttribute('data-num-pin');
        window.fillArticle(parentToArticle, articleBlock, dataIndex);
        var pins = mapPins.querySelectorAll('.map__pin');
        deactivatePins(pins);
        activePin.classList.add('map__pin--active');
        enableCloseArticle();
      }
    }
  };

})();

