'use strict';

window.backend = (function () {

  var URL = '';
  var SUCCESS = 200;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onLoad(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError(xhr.status + ' Произошла ошибка загрузки');
    });
    xhr.responseType = 'json';
    return xhr;
  }

  return {
    load: function (onLoad, onError) {
      var xhr = createRequest (onLoad, onError);
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr =createRequest (onLoad, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

})();
