'use strict';

/**
 * Модуль генерации объявления
 */

(function () {
  
  /**
   * Функция генерации объявления
   * @param {Object} obj
   * @returns {Node}
   */
  
  var renderArticle = function (obj) {
    var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var articleTemplate = document.querySelector('template').content.querySelector('.map__card');
    var article = articleTemplate.cloneNode(true);
    article.querySelector('h3').textContent = obj.offer.title;
    article.querySelector('small').textContent = obj.offer.address;
    article.querySelector('.popup__price').textContent = obj.offer.price + ' "\u20BD"/ночь';
    article.getElementsByTagName('p')[2].textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    article.getElementsByTagName('p')[3].textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  
    /**
     * Выбираем соответствующее название жилья
     */
    var homeType = obj.offer.type;
    if (homeType === 'flat') {
      homeType = 'Квартира';
    } else if (homeType === 'bungalo') {
      homeType = 'Бунгало';
    } else if (homeType === 'house') {
      homeType = 'Дом';
    }
    article.querySelector('h4').textContent = homeType;
  
    /**
     * Функцция создания случайного неповторяющегося списка удобств в объявлении
     * @param {Array} arr
     */
    
    var createRandFeature = function (arr) {
      var ul = article.querySelector('.popup__features');
      ul.innerHTML = '';
      for (var j = 0; j < arr.length; j++) {
        var li = document.createElement('li');
        li.classList.add('feature');
        li.classList.add('feature--' + arr[j]);
        ul.appendChild(li);
      }
    };
  
    var randOffers = window.randomFunctions.getRandomLengthArr(offerFeatures);
    createRandFeature(randOffers);
    article.getElementsByTagName('p')[4].textContent = obj.offer.description;
    article.querySelector('.popup__avatar').src = obj.author.avatar;

    return article;
  };
  
  /**
   * Функция вставки соотвтествующего сгенерированного объявления в шаблон
   * @param {*} parentElem
   * @param {Node} elem
   * @param {String} idx
   */

  window.fillArticle = function (parentElem, elem, idx) {
    var fragment = document.createDocumentFragment();
      fragment.appendChild(renderArticle(window.mapFilters.filteredData[idx]));
    parentElem.appendChild(fragment, elem);
  };

})();
