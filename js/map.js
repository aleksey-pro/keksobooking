'use strict';

// Varaiables

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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


// Helper functions

var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandom = function (arr) {
  var randNum = getRandomNum(0, arr.length - 1);
  return arr[randNum];
};

var getRandomLengthArr = function (arr) {
  var newArr = arr.slice();
  newArr.length = getRandomNum(1, arr.length);
  return newArr;
};

var randOffers = getRandomLengthArr(offerFeatures);

var getNorepeatArr = function (arr) {
  var val = '';
  var currOfferIndx = Math.floor(Math.random() * arr.length);
  val = arr[currOfferIndx];
  arr.splice(currOfferIndx, 1);
  return val;
};


// Initial state

var form = document.querySelector('.notice__form');

var formFields = form.querySelectorAll('fieldset');
for (var l = 0; l < formFields.length; l++) {
  formFields[l].disabled = true;
}

var map = document.querySelector('.map');
map.classList.add('map--faded');

// Rendering

var pointsTemplate = document.querySelector('template').content.querySelector('.map__pin');
var articleTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderPoints = function (obj, idx) {
  var mapPoint = pointsTemplate.cloneNode(true);
  mapPoint.classList.add('map__pin');
  mapPoint.setAttribute('data-pin', idx);
  mapPoint.style.left = obj.location.x + 'px';
  mapPoint.style.top = obj.location.y + 'px';
  mapPoint.style.transform = 'translate(-50%, -100%)';
  mapPoint.querySelector('img').src = obj.author.avatar;

  return mapPoint;
};

var announces = [];

var createArr = function () {

  var locationX = getRandomNum(300, 900);
  var locationY = getRandomNum(100, 500);

  var announce = {
    author: {
      avatar: 'img/avatars/user0' + getNorepeatArr(imageNums) + '.png'
    },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: getNorepeatArr(offerTitles),
      address: locationX + ', ' + locationY,
      price: getRandomNum(1000, 1000000),
      type: getRandom(offerTypes),
      rooms: getRandomNum(1, 5),
      guests: (Math.random() * 20).toFixed(0),
      checkin: getRandom(checkinTimes),
      checkout: getRandom(checkoutTimes),
      features: randOffers,
      description: '',
      photos: []
    }
  };
  announces.push(announce);

  return announces;
};

// console.dir(announces);

var fillPoints = function (elem) {

  for (var k = 0; k < 8; k++) {
    createArr();
  }

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < announces.length; i++) {
    fragment.appendChild(renderPoints(announces[i], i));
  }
  elem.appendChild(fragment);
};

var renderArticle = function (obj) {

  var article = articleTemplate.cloneNode(true);

  article.querySelector('h3').textContent = obj.offer.title;
  article.querySelector('small').textContent = obj.offer.address;
  article.querySelector('.popup__price').textContent = obj.offer.price + ' "\u20BD"/ночь';
  article.getElementsByTagName('p')[2].textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  article.getElementsByTagName('p')[3].textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;

  var homeType = obj.offer.type;
  if (homeType === 'flat') {
    homeType = 'Квартира';
  } else if (homeType === 'bungalo') {
    homeType = 'Бунгало';
  } else if (homeType === 'house') {
    homeType = 'Дом';
  }
  article.querySelector('h4').textContent = homeType;

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

  createRandFeature(randOffers);

  article.getElementsByTagName('p')[4].textContent = obj.offer.description;
  article.querySelector('.popup__avatar').src = obj.author.avatar;

  return article;
};


var articleBlock = map.querySelector('.map__filters-container');
var parentToArticle = articleBlock.parentNode;

var fillArticle = function (parentelem, elem, idx) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderArticle(announces[idx]));
  parentelem.insertBefore(fragment, elem);
};

// Mouse events

var mainButton = document.querySelector('.map__pin--main');
var mapPins = map.querySelector('.map__pins');
var activeElement;
var activeImg;
var offsetX = 0;
var offsetY = 0;

mainButton.addEventListener('mousedown', function (evt) {
  activeImg = evt.target;
  activeElement = activeImg.parentNode;
  // activeImg.draggable = true;
  offsetX = evt.offsetX;
  offsetY = evt.offsetY;
});

mainButton.addEventListener('mousemove', function (evt) {
  if (activeElement) {
    activeElement.style.top = (evt.clientY - offsetY) + 'px';
    activeElement.style.left = (evt.clientX - offsetX) + 'px';
  }
});

var filled = false; // Предотвратить повторное появление пустых пинов

mainButton.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  if (!filled) {
    fillPoints(mapPins);
  }
  filled = true;
  form.classList.remove('notice__form--disabled');
  activeElement = null;
  // activeImg.draggable = false;
});

var removeArticle = function () {
  var article = map.querySelector('article');
  if (article) {
    map.removeChild(article);
  }
};

var deactivatePins = function (elems) {
  for (var m = 0; m < elems.length; m++) {
    if (elems[m].classList.contains('map__pin--active')) {
      elems[m].classList.remove('map__pin--active');
    }
  }
};

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

var activatePin = function (evt, activePin) {
  if (activePin.classList.contains('map__pin') && !activePin.classList.contains('map__pin--main')) {
    removeArticle();
    var dataIndex = activePin.getAttribute('data-pin');
    fillArticle(parentToArticle, articleBlock, dataIndex);
    var pins = mapPins.querySelectorAll('.map__pin');
    deactivatePins(pins);
    activePin.classList.add('map__pin--active');
    enableCloseArticle();
  }
};

mapPins.addEventListener('click', function (evt) {
  var activePin = evt.target.parentNode; // при клике реагируем на нажатие на картинку
  activatePin(evt, activePin);
});

mapPins.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    var activePin = evt.target; // при табе реагируем на нажатие на кнопку
    activatePin(evt, activePin);
  }
});
