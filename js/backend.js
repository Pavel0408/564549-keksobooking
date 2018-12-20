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
  var load = function (onLoad, onError) {
    var URL = window.constants.urls.load;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.SUCCESS_SERVER_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Похожие волшебники не загружены. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = window.constants.MAX_TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };

  // функция для отправки формы
  var URL = window.constants.urls.save;
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.SUCCESS_SERVER_CODE) {
        onLoad();
      } else {
        onError('Информация не отправлена. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Данные не отправились за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = window.constants.MAX_TIMEOUT;
    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    save: save
  };
})();
