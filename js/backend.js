'use strict';
(function () {
  /**
    * Модуль backend
    *
    * Обеспечивает взаимодействие с сервером
    * @param window.backend.load  - загружает массив с похожими объявлениями с сервера
    * @param window.backend.save - отправляет данные из формы создания объявления на сервер
   */

  // функция для загрузки данных с сервера
  var load = function (successLoadHandler, errorLoadHandler) {
    var URL = window.constants.urls.load;
    var xhr = new XMLHttpRequest();

    // обработчики состояний запроса
    var xhrLoadHandler = function () {
      if (xhr.status === window.constants.SUCCESS_SERVER_CODE) {
        successLoadHandler(xhr.response);
      } else {
        errorLoadHandler('Информация не загружена. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var xhrErrorHandler = function () {
      errorLoadHandler('Произошла ошибка соединения');
    };

    var xhrTimeoutHandler = function () {
      errorLoadHandler('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    };

    xhr.responseType = 'json';

    xhr.addEventListener('load', xhrLoadHandler);
    xhr.addEventListener('error', xhrErrorHandler);
    xhr.addEventListener('timeout', xhrTimeoutHandler);
    xhr.timeout = window.constants.MAX_TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };

  // функция для отправки формы
  var URL = window.constants.urls.save;
  var save = function (data, successSaveHandler, errorSaveHandler) {
    var xhr = new XMLHttpRequest();

    // обработчики состояний запроса
    var xhrSuccessLoadHandler = function () {
      if (xhr.status === window.constants.SUCCESS_SERVER_CODE) {
        successSaveHandler();
      } else {
        errorSaveHandler('Информация не отправлена. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var xhrErrorLoadHandler = function () {
      errorSaveHandler('Произошла ошибка соединения');
    };

    var xhrTimeoutHandler = function () {
      errorSaveHandler('Данные не отправились за ' + xhr.timeout + 'мс');
    };

    xhr.responseType = 'json';

    xhr.addEventListener('load', xhrSuccessLoadHandler);
    xhr.addEventListener('error', xhrErrorLoadHandler);
    xhr.addEventListener('timeout', xhrTimeoutHandler);
    xhr.timeout = window.constants.MAX_TIMEOUT;
    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    save: save
  };
})();
