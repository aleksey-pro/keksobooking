'use strict';

window.backend = (function () {

  return {
    load: function (onLoad, onError) {

      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        }
      });
      xhr.addEventListener('error', function () {
        onError(xhr.status + ' Произошла ошибка загрузки');
      });

      xhr.responseType = 'json';
      xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {

      var xhr = new XMLHttpRequest();

      xhr.addEventListener('loadend', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError(xhr.status);
        }
      });

      xhr.open('POST', 'https://1510.dump.academy/keksobooking');
      xhr.send(data);
    }
  };

})();
