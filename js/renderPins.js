'use strict';
(function () {
  // Константы
  // Размер маркера по Y
  var PIN_Y = 46;
  // Переменные
  // Часть шаблона - маркер на карте Токио
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsFragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');

  // Функции
  // Строковые координаты маркера (со смещением по Y)
  var pinStrX = function (x) {
    return x + 'px';
  };
  var pinStrY = function (y) {
    return (y - PIN_Y) + 'px';
  };

  // Функция формирования маркера

  var render = function (elementData, i) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.querySelector('img').src = elementData.author.avatar;
    mapPin.style.left = pinStrX(elementData.location.x);
    mapPin.style.top = pinStrY(elementData.location.y);
    mapPin.dataset.numPin = i;
    this.appendChild(mapPin);
    return this;
  }

  window.map = {
    // Функция добавления маркеров на страницу
    appendPins: function () {
      // Очищаем контейнер с маркерами от предыдущего результата
      var childs = pinsContainer.querySelectorAll('.map__pin');
      [].forEach.call(childs, function (element) {
        if (!element.classList.contains('map__pin--main')) {
          pinsContainer.removeChild(element);
        }
      });
      // Заполняем фрагмент в соответствии с отфильтрованным массивом
      window.mapFilters.filteredData.forEach(render, pinsFragment);
      // Добавляем фрагмент на страницу
      pinsContainer.appendChild(pinsFragment);
    }
  };

})();
