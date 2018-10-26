"use strict";

/**
 * Модуль работы с сервером
 * @type {{load, save}}
 */

window.backend = (function() {
  var URL = 'https://raw.githubusercontent.com/davegahn/keksobooking/master';

  var SUCCESS = 200;

  /**
   * Функция отправки запроса на сервер на получение/отправку данных
   * @param {Function} onLoad [коллбек успешной загрузки]
   * @param {Function} onError [коллбек неудaчной загрузки]
   * @returns {XMLHttpRequest}
   */

  var createRequest = function(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
      if (xhr.status === SUCCESS) {
        onLoad(xhr.response);
      }
    });
    xhr.addEventListener("error", function() {
      onError(xhr.status + " Произошла ошибка загрузки");
    });
    xhr.responseType = "json";
    return xhr;
  };

  return {
    /**
     * Функция load
     * @param {Function} onLoad [функция удачной загрузки данных с сервера]
     * @param {Function} onError [функция неудачной загрузки данных с сервера]
     */

    load: function(onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open("GET", URL + "/data.json");
      xhr.send();
    },

    /**
     * Функция save
     * @param { string } data [данные для отправки данных на сервер]
     * @param { Function } onLoad [функция удачной отправки данных на сервер]
     * @param { Function } onError [функция неудачной отправки данных на сервер]
     */

    save: function(data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open("POST", URL + "/get.php");
      xhr.send(data);
    },

    /**
     * Функция ошибки
     */
    error: function() {
      console.log("error");
    }
  };
})();
