'use strict';
(function () {
  /**
    * Модуль moving-pin
    *
    * Обеспечивает перемещения пина размещаемого объявления по карте
    * @param moving_pin.X_COORDS - границы перемещения пина по карте по горизонтале
    * @param moving_pin.Y_COORDS - границы перемещения пина по карте по вертикале
    * @param moving_pin.isOnMap - удерживает пин внутри карты
    * @param moving_pin.mouseMoveHandler - перемещает пин при перемещинии мыши
    * @param moving_pin.mouseUpHandler - останавливает перемещение пина, когда пользователь отпустит кнопку мыши
   */

  var MAIN_PIN = document.querySelector('.map__pin--main');
  var MAP_PIN_WEIGHT = 64;
  var MAP_PIN_HEIGHT = 84;

  // гриницы, в которых можно перемедать пин
  var X_COORDS = {
    min: -20,
    max: 1150
  };
  var Y_COORDS = {
    min: 46,
    max: 546
  };

  /**
     * функция для удержания пина внутри карты
     *
     * @param {Number} coordsNum - значение после смещения
     * @param {Number} coordsObj - гриницы в которых преремещается Pin
     * @return {Number} - значение после смещения с учётом границ карты
 */
  var isOnMap = function (coordsNum, coordsObj) {
    if (coordsNum < coordsObj.min) {
      return coordsObj.min;
    }
    if (coordsNum > coordsObj.max) {
      return coordsObj.max;
    }
    return coordsNum;
  };

  //  функция прермещения пина
  var mainPinMousedownHandler = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
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
      window.utilities.getAdress(MAP_PIN_WEIGHT, MAP_PIN_HEIGHT);
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  MAIN_PIN.addEventListener('mousedown', mainPinMousedownHandler);
})();
