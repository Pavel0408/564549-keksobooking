'use strict';
(function () {

  // функция для загрузки данных с сервера
  var load = function (onLoad, onError) {
    var URL = window.constants.urls.load;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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
    xhr.timeout = 10000;
    xhr.open('GET', URL);
    xhr.send();
  };

  // функция для отправки формы
  var URL = window.constants.urls.save;
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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
    xhr.timeout = 10000;
    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    save: save
  };
})();
