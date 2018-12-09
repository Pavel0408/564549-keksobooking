'use strict';
(function () {
  var PRICE = document.querySelector('#price');
  var TIMEIN = document.querySelector('#timein');
  var TIMOUT = document.querySelector('#timeout');
  var ROOM_NUMBER = document.querySelector('#room_number');
  var CAPACITY = document.querySelector('#capacity');
  var ROOM_NUMBER_OPTIONS = ROOM_NUMBER.querySelectorAll('option');
  var CAPACITY_OPTIONS = CAPACITY.querySelectorAll('option');
  var HOUSING_TYPE = document.querySelector('#type');
  var roomNumberValues = [];

  // типы жилья
  var TYPES = [
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

  // функция для установления минимальной стоимости жилья
  var setMinPrice = function () {
    var type = HOUSING_TYPE.value;
    PRICE.setAttribute('min', MIN_PRICES[TYPES.indexOf(type)]);
    PRICE.setAttribute('placeholder', MIN_PRICES[TYPES.indexOf(type)]);
  };


  // функции для синхронизации времени заезда и выезда
  var timeSynchro = function (evt) {
    if (evt) {
      if (evt.target.closest('#timein')) {
        TIMOUT.value = TIMEIN.value;
        return;
      }
    }
    TIMEIN.value = TIMOUT.value;
  };


  // функция для установления соответсвия гостей и комнат
  var setMinGuests = function () {
    for (var i = 0, capacityOptionsLength = CAPACITY_OPTIONS.length; i < capacityOptionsLength; i++) {
      CAPACITY_OPTIONS[i].setAttribute('disabled', 'disabled');
    }

    for (var j = 0, roomNumberOptionsLength = ROOM_NUMBER_OPTIONS.length; j < roomNumberOptionsLength; j++) {
      var optionValue = ROOM_NUMBER_OPTIONS[j].value;
      roomNumberValues.push(optionValue);
    }

    if (ROOM_NUMBER.value === roomNumberValues[0]) {
      CAPACITY_OPTIONS[2].removeAttribute('disabled');
      CAPACITY.value = CAPACITY_OPTIONS[2].value;
    }
    if (ROOM_NUMBER.value === roomNumberValues[1]) {
      CAPACITY_OPTIONS[2].removeAttribute('disabled');
      CAPACITY_OPTIONS[1].removeAttribute('disabled');
      CAPACITY.value = CAPACITY_OPTIONS[1].value;
    }
    if (ROOM_NUMBER.value === roomNumberValues[2]) {
      CAPACITY_OPTIONS[2].removeAttribute('disabled');
      CAPACITY_OPTIONS[1].removeAttribute('disabled');
      CAPACITY_OPTIONS[0].removeAttribute('disabled');
      CAPACITY.value = CAPACITY_OPTIONS[0].value;
    }
    if (ROOM_NUMBER.value === roomNumberValues[3]) {
      CAPACITY_OPTIONS[3].removeAttribute('disabled');
      CAPACITY.value = CAPACITY_OPTIONS[3].value;
    }
  };


  setMinPrice();
  setMinGuests();
  TIMEIN.addEventListener('change', timeSynchro);
  TIMOUT.addEventListener('change', timeSynchro);
  HOUSING_TYPE.addEventListener('change', setMinPrice);
  ROOM_NUMBER.addEventListener('change', setMinGuests);
})();
