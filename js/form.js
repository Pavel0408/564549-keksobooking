'use strict';
(function () {
  var housingType = document.querySelector('#type');
  var PRICE = document.querySelector('#price');
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

  setMinPrice();
  housingType.addEventListener('change', setMinPrice);

})();
