'use strict';

/**
 * Вспомогательный модуль получения случаных значений
 * @type {{getRandomNum, getRandom, getRandomLengthArr, getNorepeatArr}}
 */

window.randomFunctions = (function () {
  return {
  
    /**
     * Получение случайного целого числа
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    getRandomNum: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    /**
     * Получение случайного значения из массива
     * @param {Array} arr
     * @returns {*}
     */
    getRandom: function (arr) {
      var randNum = this.getRandomNum(0, arr.length - 1);
      return arr[randNum];
    },
    /**
     * Получение случайной длины массива
     * @param {Array} arr
     * @returns {Array}
     */
    getRandomLengthArr: function (arr) {
      var newArr = arr.slice();
      newArr.length = this.getRandomNum(1, arr.length);
      return newArr;
    },
    /**
     * Получение НЕПОВТОРЯЮЩЕЙСЯ случайной строки из массива
     * @param {Array} arr
     * @returns {string}
     */
    getNorepeatArr: function (arr) {
      var val = '';
      var currOfferIndx = Math.floor(Math.random() * arr.length);
      val = arr[currOfferIndx];
      arr.splice(currOfferIndx, 1);
      return val;
    }
  };

})();
