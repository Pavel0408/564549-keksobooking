'use strict';
(function () {
/**
  * Модуль renderPin
  *
  * Модуль для создания пина объявления
  * @param window.renderPin - экспортирует в глобальную область видимости функцию для создания метки объявления
 */
  // функция для создания одного пина
  var renderPin = function (announcement) {
    var MAP_PIN_WEIGHT = 50;
    var MAP_PIN_HEIGHT = 70;
    var MAP_PIN = document.querySelector('#pin').content.querySelector('.map__pin');
    var onePin = MAP_PIN.cloneNode(true);
    var pinTop = +(announcement.location.y) - MAP_PIN_HEIGHT;
    var pinLeft = +(announcement.location.x) - MAP_PIN_WEIGHT / 2;
    onePin.style = 'left: ' + pinLeft + 'px; top: ' + pinTop + 'px;';

    onePin.querySelector('img').src = announcement.author.avatar;
    onePin.querySelector('img').alt = announcement.offer.title;
    onePin.dataset.id = announcement.id;
    return (onePin);
  };

  window.renderPin = renderPin;
})();
