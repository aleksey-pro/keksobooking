'use strict';

(function () {
  var form = document.querySelector('.notice__form');

  // Начальное состояние полей формы

  var formFields = form.querySelectorAll('fieldset');
  for (var l = 0; l < formFields.length; l++) {
    formFields[l].disabled = true;
  }

  // Установка полей формы

  var adrField = form.elements.address;
  adrField.setAttribute('required', 'required');

  var titleField = form.elements.title;
  titleField.setAttribute('required', 'required');
  titleField.setAttribute('maxlength', 100);
  titleField.setAttribute('minlength', 30);

  var priceField = form.elements.price;
  priceField.setAttribute('required', 'required');
  priceField.setAttribute('max', 1000000);
  priceField.setAttribute('value', 1000);
  priceField.setAttribute('min', priceField.value);


  // Установка минимальных значений поля типа жилья

  var typeSelect = form.elements.type;

  typeSelect.addEventListener('change', function (evt) {
    var selectedType = window.formFunctions.getSelected(evt.target);
    window.formFunctions.setMinValue(priceField, selectedType);
  });

  // Синхронизация полей въезда-выезда

  var timInSelect = form.elements.timein;
  var timeOutSelect = form.elements.timeout;

  timInSelect.addEventListener('change', function (evt) {
    var selectedTime = window.formFunctions.getSelected(evt.target);
    window.formFunctions.setSelected(timeOutSelect, selectedTime);
  });

  timeOutSelect.addEventListener('change', function (evt) {
    var selectedTime = window.formFunctions.getSelected(evt.target);
    window.formFunctions.setSelected(timInSelect, selectedTime);
  });

  // Установка значений для полей количества комнат и вместимости

  var roomsSelect = form.elements.rooms;
  var capacitySelect = form.elements.capacity;

  for (var s = 0; s < capacitySelect.options.length; s++) {
    capacitySelect.options[s].disabled = true;
    capacitySelect.options[s].selected = false;
    capacitySelect.options[2].disabled = false;
    capacitySelect.options[2].selected = true;
  }

  roomsSelect.addEventListener('change', function (evt) {
    var selectedRoom = window.formFunctions.getSelected(evt.target);
    window.formFunctions.changeCapacity(capacitySelect, selectedRoom);
  });

})();
