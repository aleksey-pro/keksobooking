'use strict';

window.backend = (function () {

  var xhr = new XMLHttpRequest();

  return {
    load: function (url, onLoad , onError) {

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        }
      });
      xhr.addEventListener('error', function () {
        onError(xhr.status + ' Произошла ошибка загрузки');
      });

      xhr.responseType = 'json';
      xhr.open('GET', url, true);
      xhr.send();
    },
    save: function (data, onLoad, onError) {

      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == 200) {
          onLoad(this.status);
        } else {
          onError(xhr.status + ' Произошла ошибка загрузки');
        }
      };
      xhr.open('POST', 'https://1510.dump.academy/keksobooking');
      xhr.send(data);
    }
  };

})();
