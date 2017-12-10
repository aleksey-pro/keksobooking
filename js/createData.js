'use strict';

window.createData = (function () {

  var offerTitles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var imageNums = [1, 2, 3, 4, 5, 6, 7, 8];
  var checkinTimes = ['12:00', '13:00', '14:00'];
  var checkoutTimes = ['12:00', '13:00', '14:00'];
  var offerTypes = ['flat', 'house', 'bungalo'];
  var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var randOffers = window.randomFunctions.getRandomLengthArr(offerFeatures);

  var announces = [];

  window.createArr = function () {
    var locationX = window.randomFunctions.getRandomNum(300, 900);
    var locationY = window.randomFunctions.getRandomNum(100, 500);

    var announce = {
      author: {
        avatar: 'img/avatars/user0' + window.randomFunctions.getNorepeatArr(imageNums) + '.png'
      },
      location: {
        x: locationX,
        y: locationY
      },
      offer: {
        title: window.randomFunctions.getNorepeatArr(offerTitles),
        address: locationX + ', ' + locationY,
        price: window.randomFunctions.getRandomNum(1000, 1000000),
        type: window.randomFunctions.getRandom(offerTypes),
        rooms: window.randomFunctions.getRandomNum(1, 5),
        guests: (Math.random() * 20).toFixed(0),
        checkin: window.randomFunctions.getRandom(checkinTimes),
        checkout: window.randomFunctions.getRandom(checkoutTimes),
        features: randOffers,
        description: '',
        photos: []
      }
    };
    announces.push(announce);

    window.announces = announces;

    return window.announces;
  };

})();
