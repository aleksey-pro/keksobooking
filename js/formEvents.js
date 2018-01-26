'use strict';

(function () {

  // Констаеты и переменные

  var MAX_TITLE_LENGTH = 100;
  var MIN_TITLE_LENGTH = 30;
  var PRICE_VALUE = 1000;
  var PRICE_MAX = 1000000;
  var PRICE_MIN = 1000;
  var ENTER_KEYCODE = 13;

  var form = document.querySelector('.notice__form');

  // Начальное состояние полей формы

  var setFormState = function (state) {
    var formFields = form.querySelectorAll('fieldset');
    [].forEach.call(formFields, function (elem) {
      elem.disabled = state;
    });
  };

  setFormState(true);

  // Установка требуемых значений полей формы

  var adrField = form.elements.address;
  adrField.setAttribute('required', 'required');

  var titleField = form.elements.title;
  titleField.setAttribute('required', 'required');
  titleField.setAttribute('maxlength', MAX_TITLE_LENGTH);
  titleField.setAttribute('minlength', MIN_TITLE_LENGTH);

  var priceField = form.elements.price;
  priceField.setAttribute('required', 'required');
  priceField.setAttribute('max', PRICE_MAX);
  priceField.setAttribute('value', PRICE_VALUE);
  priceField.setAttribute('min', PRICE_MIN);


  // Функции обратного вызова для синхронизации

  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  // Установка минимальных значений поля типа жилья через универсальную функцию

  var typeSelect = form.elements.type;

  var onTypeSelect = function () {
    window.synchronizeFields(typeSelect, priceField, ['flat', 'house', 'bungalo', 'palace'], ['1000', '5000', '0', '10000'], syncValueWithMin);
  };

  typeSelect.addEventListener('change', onTypeSelect);

  // Синхронизация полей въезда-выезда через универсальную функцию

  var timeInSelect = form.elements.timein;
  var timeOutSelect = form.elements.timeout;

  var onTimeInSelect = function () {
    window.synchronizeFields(timeInSelect, timeOutSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  };

  var onTimeOutSelect = function () {
    window.synchronizeFields(timeOutSelect, timeInSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  };

  timeInSelect.addEventListener('change', onTimeInSelect);
  timeOutSelect.addEventListener('change', onTimeOutSelect);


  // Установка значений для полей количества комнат и вместимости

  var roomsSelect = form.elements.rooms;
  var capacitySelect = form.elements.capacity;

  // Функция получения значения выбранного поля

  window.getSelected = function (slectElem) {
    for (var s = 0; s < slectElem.options.length; s++) {
      var option = slectElem.options[s];
      if (option.selected) {
        return option.value;
      }
    }
    return null;
  };

  // Функция установки значения вместимости помещения

  var changeCapacity = function (targetEl, value) {
    for (var c = 0; c < targetEl.options.length; c++) {
      if (value === '1') {
        targetEl.options[c].disabled = true;
        targetEl.options[2].selected = true;
        targetEl.options[2].disabled = false;
      } else if (value === '2') {
        targetEl.options[c].disabled = true;
        targetEl.options[1].selected = true;
        targetEl.options[1].disabled = false;
        targetEl.options[2].disabled = false;
      } else if (value === '3') {
        targetEl.options[c].disabled = true;
        targetEl.options[0].selected = true;
        targetEl.options[0].disabled = false;
        targetEl.options[1].disabled = false;
        targetEl.options[2].disabled = false;
      } else if (value === '100') {
        targetEl.options[c].disabled = true;
        targetEl.options[3].disabled = false;
        targetEl.options[3].selected = true;
      }
    }
  };

  // Устанавливаем начальное состояние для capacity

  for (var s = 0; s < capacitySelect.options.length; s++) {
    capacitySelect.options[s].disabled = true;
    capacitySelect.options[s].selected = false;
    capacitySelect.options[2].disabled = false;
    capacitySelect.options[2].selected = true;
  }

  // Обратываем сценарий выбора количества

  roomsSelect.addEventListener('change', function (evt) {
    var selectedRoom = window.getSelected(evt.target);
    changeCapacity(capacitySelect, selectedRoom);
  });


  // Проверка на правильность введенных данных


  // Функции установки цвета полей

  var setBgColor = function (elem) {
    elem.style.boxShadow = 'none';
    elem.style.borderWidth = '1px';
    elem.style.borderColor = 'red';
  };

  var resetBgColor = function (elem) {
    elem.style.boxShadow = 'none';
    elem.style.borderWidth = '';
    elem.style.borderColor = '';
  };

  var onFocus = function (evt) {
    resetBgColor(evt.target);
  };

  // Установка кастомных предупреждений

  var onInvalidInput = function (evt) {
    setInvalidTitles(evt.target);
  };

  var setInvalidTitles = function (field) {
    setBgColor(field);
    if (field.validity.valueMissing) {
      field.setCustomValidity('Обязательно заполни!..');
    } else if (field.validity.tooLong) {
      field.setCustomValidity('Ну очень длинный, 100 сиволов будет хватать...');
    } else if (field.validity.tooShort) {
      field.setCustomValidity('Напиши уж подлинее, хотя бы 30 сиволов...');
    } else if (field.validity.rangeOverflow) {
      field.setCustomValidity('Дороговато для такого жилья');
    } else if (field.validity.rangeUnderflow) {
      field.setCustomValidity('Дешево даешь...');
    } else {
      field.setCustomValidity('');
      resetBgColor(field);
    }
  };

  titleField.addEventListener('invalid', onInvalidInput);
  titleField.addEventListener('focus', onFocus);
  priceField.addEventListener('invalid', onInvalidInput);
  priceField.addEventListener('focus', onFocus);

  // Создание вспомогательного элемента для ошибок

  var createErrorElem = function () {
    var errEl = document.createElement('p');
    errEl.classList.add('err-message');
    errEl.style.color = 'red';
    form.appendChild(errEl);
  };

  // Активация формы после переткивания указателя

  window.activateForm = function () {
    form.classList.remove('notice__form--disabled');
    setFormState(false);
    createErrorElem();
  };

  // Отправка данных формы на сервер

  var onLoad = function () {
    form.reset();
  };
  var onError = function (err) {
    var errMes = form.querySelector('.err-message');
    errMes.textContent = err + ' Данные не высланы';
  };

  form.addEventListener('submit', function (evt) {
    var formData = new FormData(form);
    window.backend.save(formData, onLoad, onError);
    evt.preventDefault();
    if (evt.which === ENTER_KEYCODE) {
      evt.preventDefault();
    }
  }, false);


  // Добавление фотографий на форму

  var formNotice = document.querySelector('.notice__form');
  var dropZoneImages = formNotice.querySelectorAll('.drop-zone');
  var avatarZone = dropZoneImages[0];
  var avatarUser = formNotice.querySelector('.notice__preview img');
  var photoZone = dropZoneImages[1];
  var uploadPhoto = formNotice.querySelector('.form__photo-container');
   var fileChoosers = document.querySelectorAll('.upload input[type=file]');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var upLoadImage = function (evt, getFile, showMiniFile) {
    var files = getFile(evt);
    [].forEach.call(files, function (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (element) {
        return fileName.endsWith(element);
      });
      if (matches) {
        var imageLoader = new FileReader();
        imageLoader.addEventListener('load', function (e) {
          showMiniFile(e.target.result);
        });
        imageLoader.readAsDataURL(file);
      }
    });
  };
  // Получаем файл фото при перетаскивании
  var getDraggedFile = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    evt.dataTransfer.dropEffect = 'copy';
    return files;
  };
  // Получаем файл фото через диалог
  var getDialogFile = function (evt) {
    return evt.target.files;
  };
  // Показываем миниатюры на форме
  var showMiniAvatar = function (content) {
    avatarUser.src = content;
  };
  var showMiniPhoto = function (content) {
    var img = document.createElement('IMG');
    img.classList.add('mini-photo');
    img.width = '50';
    img.height = '50';
    uploadPhoto.appendChild(img);
    img.src = content;
  };
  // Добавляем файлы через окно выбора файлов
  var onChooserAvatarChange = function (evt) {
    upLoadImage(evt, getDialogFile, showMiniAvatar);
  };
  var onChooserPhotoChange = function (evt) {
    upLoadImage(evt, getDialogFile, showMiniPhoto);
  };
  // Добавляем перетаскиваемые файлы
  var onAvatarZoneDrop = function (evt) {
    upLoadImage(evt, getDraggedFile, showMiniAvatar);
  };
  var onPhotoZoneDrop = function (evt) {
    upLoadImage(evt, getDraggedFile, showMiniPhoto);
  };
  // Разрешаем процесс перетаскивания фотографий в дроп-зону
  var onDropZoneDragenter = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };
  var onDropZoneDragover = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };

  // Отправка формы на сервер
  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(formNotice), resetForm, window.backend.onErrorSave);
    evt.preventDefault();
  };

  // Функция сброса  формы в начальное состояние
  var resetbutton = document.querySelector('.form__reset');
  var miniPhoto = document.querySelector('.mini-photo');
  var resetForm = function () {
    form.reset();
    avatarUser.src = 'img/muffin.png';
    var photoToDelete = uploadPhoto.getElementsByTagName('img')[0];
    if(photoToDelete){
      photoToDelete.remove();
    };

    // window.backend.removeError();
  };
  resetbutton.addEventListener('click', function (evt) {
      resetForm();
      evt.preventDefault();
  });

  // События сброса фото-файлов в drop-зоне
  avatarZone.addEventListener('drop', onAvatarZoneDrop);
  photoZone.addEventListener('drop', onPhotoZoneDrop);
  [].forEach.call(dropZoneImages, function (element) {
    element.addEventListener('dragenter', onDropZoneDragenter);
  });
  [].forEach.call(dropZoneImages, function (element) {
    element.addEventListener('dragover', onDropZoneDragover);
  });
  // Событие изменения выборщиков файлов для загрузки
  fileChoosers[0].addEventListener('change', onChooserAvatarChange);
  fileChoosers[1].addEventListener('change', onChooserPhotoChange);
  // Событие отправки формы на сервер
  // formNotice.addEventListener('submit', onFormSubmit);



})();
