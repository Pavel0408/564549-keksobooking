'use strict';
(function () {
  var MAIN_PIN = document.querySelector('.map__pin--main');

  MAIN_PIN.addEventListener('mousedown', function (evt) {
    console.log(evt);
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    console.log(startCoords);

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

      MAIN_PIN.style.top = (MAIN_PIN.offsetTop - shift.y) + 'px';
      MAIN_PIN.style.left = (MAIN_PIN.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
