'use strict';

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

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var getRandom = function (arr) {
  var randNum = getRandomNum(0, arr.length - 1);
  return arr[randNum];
};

var getRandomArr = function (arr) {
  arr.length = getRandomNum(1, arr.length);
  return arr;
};


function setRandomArr(min, max) {
    var m = [];
    for (var i = min; i < max + 1; i++) {
        m.push(i);
    }
    var res = [];
    var len = m.length;
    while (len) {
        var idx = Math.floor(Math.random() * len);
        res.push(m.splice(idx, 1)[0]);
        len--;
    }
    return res;
}

var randNums = setRandomArr(1, 8);

function getRandImage() {
  for(var j=0; j < randNums.length; j++){
    return randNums[j];
  }
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pointsTemplate = document.querySelector('#points-template').content.querySelector('.map__pin');
var articleTemplate = document.querySelector('#points-template').content.querySelector('.map__card');

var renderPoints = function (obj) {
  var mapPoint = pointsTemplate.cloneNode(true);
  mapPoint.classList.add('map__pin');
  mapPoint.style.left = `${obj.location.x}px`;
  mapPoint.style.top = `${obj.location.y}px`;
  mapPoint.style.transform = 'translate(-50%, -100%)';
  mapPoint.querySelector('img').src = `${obj.author.avatar}`;

  return mapPoint;
};

var announces = [];

function createArr() {

  var locationX = getRandomNum(300, 900);
  var locationY = getRandomNum(100, 500);

  var announce = {
    author: {
      avatar: 'img/avatars/user0' + getRandomNum(1, 8) + '.png'
    },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: getRandom(offerTitles),
      address: locationX + ', ' + locationY,
      price: getRandomNum(1000, 1000000),
      type: getRandom(offerTypes),
      rooms: getRandomNum(1, 5),
      guests: (Math.random() * 20).toFixed(0),
      checkin: getRandom(checkinTimes),
      checkout: getRandom(checkoutTimes),
      features: getRandomArr(offerFeatures),
      description: '',
      photos: []
    }
  };
  announces.push(announce);

  return announces;
}

console.dir(announces);


var fillPoints = function (elem) {

  for (var k = 0; k < 8; k++) {
    createArr();
  }

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < announces.length; i++) {
    fragment.appendChild(renderPoints(announces[i]));
  }
  elem.appendChild(fragment);
};

var mapPins = map.querySelector('.map__pins');
fillPoints(mapPins);


var renderArticle = function (obj) {

  var article = articleTemplate.cloneNode(true);

  article.querySelector('h3').textContent = `${obj.offer.title}`; // Значения не должны повторяться
  article.querySelector('small').textContent =  `${obj.offer.address}`;
  article.querySelector('.popup__price').textContent = `${obj.offer.price} "\u20BD"/ночь`;
  article.getElementsByTagName('p')[2].textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
  article.getElementsByTagName('p')[3].textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;

  var homeType = `${obj.offer.type}`;
  if(homeType === 'flat') {
    homeType = 'Квартира';
  } else if(homeType === 'bungalo') {
    homeType = 'Бунгало';
  } else if(homeType === 'house') {
    homeType = 'Дом';
  }
  article.querySelector('h4').textContent = homeType;

  // function createFeature (arr) {
  // var ul = mapPoint.querySelector('.popup__features');
  // for (var j = 0; j < arr.length; j++) {
  // var li = document.createElement('li');
  // li.classList.add('feature');
  // li.classList.add(`feature--${arr[j]}`);
  // ul.appendChild(li);
  // }
  // };

  // createFeature (offerFeatures);

  article.getElementsByTagName('p')[4].textContent = `${obj.offer.description}`; //Значения не должны повторяться
  article.querySelector('.popup__avatar').src = `${obj.author.avatar}`;


  return article;
}


var articleBlock = map.querySelector('.map__filters-container');
var parentToArticle = articleBlock.parentNode;

var fillArticle = function (parentelem, elem) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderArticle(announces[0]));
  parentelem.insertBefore(fragment, elem);
}

fillArticle(parentToArticle, articleBlock);







