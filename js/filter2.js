
var filtersContainer = document.querySelector('.map__filters-container');
var fForm = document.querySelector('.map__filters');

var typeSelect = fForm.querySelector('#housing-type');
var priceSelect = fForm.querySelector('#housing-price');
var roomsSelect = fForm.querySelector('#housing-rooms');
var guestsSelect = fForm.querySelector('#housing-guests');
var featuresSelect = fForm.querySelector('#housing-features');

var filtered = false;

var updateTypePoints = function (elem) {

  window.sameTypePoints = window.announces.filter(function (announce) {
    if(elem === 'any') {
      return announce.offer.type;
    } else {
      filtered = true;
      return announce.offer.type === elem;
    }
  });

  window.filterData = window.sameTypePoints;
  window.renderPoints(window.filterData);
};

var updatePricePoints = function (elem) {

  window.samePricePoints = window.filterData.filter(function (announce) {
      if(elem === 'middle') {
        return announce.offer.price >= 10000 && announce.offer.price <= 50000;
      } else if (elem === 'low') {
        return announce.offer.price < 10000;
      } else if (elem === 'high') {
        return announce.offer.price > 50000;
      } else if (elem === 'any') {
        return announce.offer.price;
      }
    });
  window.filterData = window.samePricePoints;
  window.renderPoints(window.samePricePoints);
  // if(filtered) {
    window.filterData = window.sameTypePoints;
  // }
};

// var updatePricePoints = function (elem) {

//   window.samePricePoints = window.filterData.filter(function (announce) {
//       if(elem === 'middle') {
//         return announce.offer.price >= 10000 && announce.offer.price <= 50000;
//       } else if (elem === 'low') {
//         return announce.offer.price < 10000;
//       } else if (elem === 'high') {
//         return announce.offer.price > 50000;
//       } else if (elem === 'any') {
//         return announce.offer.price;
//       }
//     });
//   window.filterData = window.samePricePoints;
//   window.renderPoints(window.samePricePoints);
//   window.filterData = window.sameTypePoints;
// };


var updateRoomPoints = function (elem) {
  window.sameRoomPoints = window.filterData.filter(function (announce) {
    if (elem === 'any') {
      return announce.offer.rooms
    } else {
      return announce.offer.rooms == elem;
    }
  });
  window.filterData = window.sameRoomPoints;
  window.renderPoints(window.sameRoomPoints);
  window.filterData = window.sameTypePoints;
};

var updateGuestPoints = function (elem) {
  window.sameGuestPoints = window.filterData.filter(function (announce) {
    if (elem === 'any') {
      return announce.offer.guests
    } else {
      return announce.offer.guests == elem;
    }
  });
  window.filterData = window.sameGuestPoints;
  window.renderPoints(window.filterData);
  window.filterData = window.sameTypePoints;
};

typeSelect.addEventListener('change', function (evt) {
  var selectedItem = window.getSelected(evt.target);
  updateTypePoints(selectedItem);
});

priceSelect.addEventListener('change', function (evt) {
  var selectedItem = window.getSelected(evt.target);
  updatePricePoints(selectedItem);
});


roomsSelect.addEventListener('change', function (evt) {
  var selectedItem = window.getSelected(evt.target);
  updateRoomPoints(selectedItem);
});

guestsSelect.addEventListener('change', function (evt) {
  var selectedItem = window.getSelected(evt.target);
  updateGuestPoints(selectedItem);
});



