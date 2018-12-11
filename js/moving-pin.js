'use strict';
(function () {
  var MAIN_PIN = document.querySelector('.map__pin--main');
  var ADRESS_INPUT = document.querySelector('#address');
  var MAP_PIN_WEIGHT = 14;
  var MAP_PIN_HEIGHT = 14;

  // гриницы, в которых можно перемедать пин
  var X_COORDS = {
    min: 250,
    max: 1150
  };
  var Y_COORDS = {
    min: 130,
    max: 630
  };

  // функция для удержания пина внутри карты
  var isOnMap = function (num, obj) {
    if (num < obj.min) {
      return obj.min;
    }
    if (num > obj.max) {
      return obj.max;
    }
    return num;
  };

  // фкнкция для определения адреса объявления
  var getAdress = function () {
    var left = +MAIN_PIN.offsetLeft + MAP_PIN_WEIGHT / 2;
    var top = +MAIN_PIN.offsetTop + MAP_PIN_HEIGHT;
    ADRESS_INPUT.value = '' + left + ', ' + top;
  };

  //  перемещаем пин
  MAIN_PIN.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      MAIN_PIN.style.top = isOnMap(MAIN_PIN.offsetTop - shift.y, Y_COORDS) + 'px';
      MAIN_PIN.style.left = isOnMap(MAIN_PIN.offsetLeft - shift.x, X_COORDS) + 'px';
      getAdress();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
