'use strict';
(function () {
  var housingType = document.querySelector('#type');
  var PRICE = document.querySelector('#price');
  var TIMEIN = document.querySelector('#timein');
  var TIMOUT = document.querySelector('#timeout');
  // тип жилья
  var types = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  // минимальная стоимость
  var MIN_PRICES = [
    10000,
    1000,
    5000,
    0
  ];

  var setMinPrice = function () {
    var type = housingType.value;
    PRICE.setAttribute('min', MIN_PRICES[types.indexOf(type)]);
  };

  var timeinSynchro = function () {

    TIMOUT.value = TIMEIN.value;
  };

  var timeoutSinchro = function () {
    TIMEIN.value = TIMOUT.value;
  };


  setMinPrice();
  TIMEIN.addEventListener('change',timeinSynchro);
  TIMOUT.addEventListener('change', timeoutSinchro);
  housingType.addEventListener('change', setMinPrice);

})();
