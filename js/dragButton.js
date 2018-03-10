'use strict';

/**
 * Модуль перетаскивания кнопки-гамбургера
 */

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var mapPins = map.querySelector('.map__pins');
  var dragButton = document.querySelector('.map__pin--main');
  var dragImage = dragButton.querySelector('img');
  var filled = false; // Предотвратить повторное появление пустых пинов
  

  dragImage.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
  
    /**
     * Помещаем координаты элемента в инпут формы
     */
    
    var getAddrCoords = function () {
      var adrField = form.elements.address;
      adrField.value = 'x: ' + evt.clientX + ' y: ' + evt.clientY;
      adrField.setAttribute('readonly', 'readonly');
    };
  
    /**
     *Получаем начальные координаты элемента в окне
     * @type {{x: number, y: string}}
     */

    var startCoords = {
      x: evt.clientX + evt.offsetWidth / 2,
      y: evt.clientY + evt.offsetHeight + 22 + 'px'
    };
  
    /**
     * Функция премещения элемента
     * @param {MouseEvent} moveEvt
     */

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
  
      /**
       * Величина сдвига относительно предыдущей точки
       * @type {{x: number, y: number}}
       */

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
  
      /**
       * Обновляем координаты элемента
       * @type {{x: number, y: number}}
       */

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      
      /**
       * Задаем координаты элементы через css-свойства
       * @type {string}
       */

      dragButton.style.top = (dragButton.offsetTop - shift.y) + 'px';
      dragButton.style.left = (dragButton.offsetLeft - shift.x) + 'px';
  
      /**
       * Задание границ передвижения элемента
       */
  
      if (moveEvt.clientY > 500) {
        dragButton.style.top = 500 + 'px';
      } else if (moveEvt.clientY < 100) {
        dragButton.style.top = 100 + 'px';
      }
    };
  
    /**
     * Функция по окончанию перемещения показывает метки на карте и активирует форму
     * @param {MouseEvent} upEvt
     */

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      map.classList.remove('map--faded');
      if (!filled) {
        window.map.appendPins();
      }
      filled = true;
      window.activateForm();
  
      window.setFormState(false);
      
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', getAddrCoords);

  });

})();
