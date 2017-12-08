'use strict';

window.randomFunctions = (function () {
  return {
    getRandomNum: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getRandom: function (arr) {
      var randNum = this.getRandomNum(0, arr.length - 1);
      return arr[randNum];
    },
    getRandomLengthArr: function (arr) {
      var newArr = arr.slice();
      newArr.length = this.getRandomNum(1, arr.length);
      return newArr;
    },
    getNorepeatArr: function (arr) {
      var val = '';
      var currOfferIndx = Math.floor(Math.random() * arr.length);
      val = arr[currOfferIndx];
      arr.splice(currOfferIndx, 1);
      return val;
    }
  };

})();
