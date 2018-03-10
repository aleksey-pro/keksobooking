'use strict';
/**
 * Модуль фильтрации меток исходя из данных фильтров
 */

(function () {
  /**
   * Число меток при загрузке
   * @type {number}
   */
  var SHOW_PIN = 5;
  /**
   * Рабочая копия массива полученных с сервера данных
   * @type {Array}
   */
  var dataCopy = [];
  /**
   * Объект c текущими значениями фильтров
   * @type {{type: string, price: string, rooms: string, guests: string}}
   */
  var filterValue = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any'
  };
  /**
   * Отмеченные пользователем удобства
   * @type {Array}
   */
  var checkedFeatures = [];
  /**
   * Фильтры
    */
  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');
  /**
   * Массив с функциями фильтров
   * @type {Array}
   */
  var filterFunctions = [
    /**
     * Фильтр по типу жилья
     * @param {Array.<Object>} arr
     * @returns {Array.<Object>} arr
     */
    function (arr) {
      if (filterValue.type !== 'any') {
        arr = arr.filter(function (element) {
          return element.offer.type === filterValue.type;
        });
      }
      return arr;
    },
    /**
     * Фильтр по стоимости
     * @param {Array.<Object>} arr
     * @returns {Array.<Object>} arr
     */
    function (arr) {
      switch (filterValue.price) {
        case 'any':
          break;
        case 'low':
          arr = arr.filter(function (element) {
            return element.offer.price <= 10000;
          });
          break;
        case 'high':
          arr = arr.filter(function (element) {
            return element.offer.price >= 50000;
          });
          break;
        case 'middle':
          arr = arr.filter(function (element) {
            return (element.offer.price > 10000) && (element.offer.price < 50000);
          });
      }
      return arr;
    },
    /**
     * Фильтр по количеству комнат
     * @param {Array.<Object>} arr
     * @returns {Array.<Object>} arr
     */
    function (arr) {
      if (filterValue.rooms !== 'any') {
        arr = arr.filter(function (element) {
          return element.offer.rooms === parseInt(filterValue.rooms, 10);
        });
      }
      return arr;
    },
    /**
     * Фильтр по количеству гостей
     * @param {Array.<Object>} arr
     * @returns {Array.<Object>} arr
     */
    function (arr) {
      if (filterValue.guests !== 'any') {
        arr = arr.filter(function (element) {
          return element.offer.guests === parseInt(filterValue.guests, 10);
        });
      }
      return arr;
    },
    /**
     * Фильтр по удобствам
     * @param {Array.<Object>} arr
     * @returns {Array.<Object>} arr
     */
    function (arr) {
      return arr.filter(function (element) {
        return checkedFeatures.every(function (currentFeature) {
          return element.offer.features.includes(currentFeature);
        });
      });
    }
  ];
  /**
   * Функция фильтрации
   * @param {MouseEvent} evt
   */
  var onFiltersChange = function (evt) {
  
    /**
     * Выставляем значение сработавшего фильтра в объекте текущих значений фильтров
     * @type {string}
     */
    var filterName = evt.target.name.substring(8);
    filterValue[filterName] = evt.target.value;
    /**
     * Копируем исходные данные для фильтрования
     * @type {Array.<*>}
     */
    window.mapFilters.filteredData = dataCopy.slice();
    /**
     * Получаем список отмеченных чекбоксов
     * @type {NodeList}
     */
    var checkedElements = filterFeatures.querySelectorAll('input[type="checkbox"]:checked');
    /**
     * Преобразуем список в массив строк
     */
    checkedFeatures = [].map.call(checkedElements, function (element) {
      return element.value;
    });
    /**
     * Получаем массив данных после обработки системой фильтров
     */
    filterFunctions.forEach(function (getFiltered) {
      window.mapFilters.filteredData = getFiltered(window.mapFilters.filteredData);
    });
    /**
     * Обрезаем полученный массив до необходимой длины
     */
    if (window.mapFilters.filteredData.length > SHOW_PIN) {
      window.mapFilters.filteredData = window.mapFilters.filteredData.slice(0, SHOW_PIN);
    }

    // Добавляем пины на страницу через установленный тайм-аут
    window.debounce(window.map.appendPins);
  };
  /**
   * Обработчики событий изменения фильтров
   */
  filterType.addEventListener('change', onFiltersChange);
  filterPrice.addEventListener('change', onFiltersChange);
  filterRooms.addEventListener('change', onFiltersChange);
  filterGuests.addEventListener('change', onFiltersChange);
  filterFeatures.addEventListener('change', onFiltersChange);
  /**
   * Экспортируем функцию, принимающую массив данных с сервера, и отфильтрованный массив данных
   * @type {{filteredData: Array, transferData: Window.mapFilters.transferData}}
   */
  
  window.mapFilters = {
    filteredData: [],
    transferData: function (data) {
      dataCopy = data.slice();
      this.filteredData = data.slice(0, SHOW_PIN);
    }
  };
})();
