'use strict';

window.backend = (function () {

  return {
    load: function (url, onLoad , onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        }
      });

      xhr.addEventListener('error', function () {
        onError(xhr.status + ' Произошла ощибка загрузки');
      });

      xhr.open('GET', url);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var form = document.querySelector('.notice__form');
      data = new FormData(form);
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        }
      });

      xhr.addEventListener('error', function () {
        onError(xhr.status + 'Произошла ощибка загрузки');
      });

      xhr.open('GET', url);
      xhr.send();
    }
  };

})();
