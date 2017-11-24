'use strict';

function getRandomNum(min, max) {
  return (Math.random() * (max - min) + min).toFixed(0);
}

var getRandom = function (arr) {
  var randNum = getRandomNum(0, arr.length - 1);
  return arr[randNum];
};

var getRandomArr = function (arr) {
  arr.length = getRandomNum(1, arr.length);
  return arr;
};

// var getRandomImage = function () {
//   var myArr = [];
//   var randImg = '0' + getRandomNum(1, 8);
//   myArr.push(randImg);
//   for (var i = 0; i < myArr.length; i++){
//     var NEWrandImg = '0' + getRandomNum(1, 8);
//     if(NEWrandImg != myArr[i]){
//       return NEWrandImg;
//     }
//   }
// }

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
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var offerTypes = ['flat', 'house', 'bungalo'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var announces = [
  {
    author: {
      avatar: 'img/avatars/user' + getRandomNum(1, 8) + '.png' // Адреса изображений не повторяются
    },
    location: {
      x: getRandomNum(300, 900),
      y: getRandomNum(100, 500)
    },
    offer: {
      title: getRandom(offerTitles),
      address:   console.log(window.announces.location),
      price: getRandomNum(1000, 1000000),
      type: getRandom(offerTypes),
      rooms: getRandomNum(1, 5),
      guests: (Math.random() * 100),
      checkin: getRandom(checkinTimes),
      checkout: getRandom(checkoutTimes),
      features: getRandomArr(offerFeatures),
      description: '',
      photos: []
    }
  }
]
console.dir(announces);


var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pointsTemplate = document.querySelector('#points-template').content.querySelector('.map__pin');

var renderPoints = function (obj) {
  var mapPoint = pointsTemplate.cloneNode(true);

  mapPoint.classList.add('map__pin');
  mapPoint.style.left = `${announces.location.x}`;
  mapPoint.style.left = `${announces.location.y}`;
  mapPoint.style.transform = 'translate(-50%, -100%)';
  mapPoint.querySelector('img').src = `${announces.author.avatar}`;

//   mapPoint.querySelector('.popup__price').textContent = `${announces.offer.price}&#x20bd;/ночь`;
//   mapPoint.querySelector('.h4').textContent = `${announces.offer.type}`;
//   mapPoint.querySelector('p[0]').textContent = `${announces.offer.rooms} комнаты для ${announces.offer.guests} гостей`;
//   mapPoint.querySelector('p[1]').textContent = 'Заезд после ${announces.offer.checkin}, выезд до ${announces.offer.checkout}`;

//   function createFeature (arr) {
//     var ul = mapPoint.querySelector('.popup__features');
//     for (var j = 0; j < arr.length; j++) {
//       var li = document.createElement('li');
//       li.classList.add('feature');
//       li.classList.add(`feature--${arr[j]}`);
//       ul.appendChild(li);
//     }
  // };

//   createFeature (offerFeatures);

//   mapPoint.querySelector('p[2]').textContent = `${announces.offer.description}`;
//   mapPoint.querySelector('.popup__avatar').src = `${announces.offer.avatar}`;

  return mapPoint;
};

var fillElements = function (elem) {
  var fragment = document.createDocumentFragment();
  for (var key in announces) {
    fragment.appendChild(renderPoints(announces[key]));
  }
  elem.appendChild(fragment);
};

var mapPins = map.querySelector('.map__pins');
fillElements(mapPins);
