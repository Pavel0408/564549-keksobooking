'use strict';
(function () {
  var MAIN_PIN = document.querySelector('.map__pin--main');

  MAIN_PIN.addEventListener('musedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    console.log(startCoords);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDafault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y = moveEvt.clientY
      };
      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      MAIN_PIN.style.top = (MAIN_PIN.offsetTop - shift.y) + 'px';
      MAIN_PIN.style.left = (MAIN_PIN.offsetLeft - shift.x) + 'px';

    };
    document.addEventListener('mousemove', onMouseMove);

  });
})();
