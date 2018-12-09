'use strict';
(function () {
  var PRICE = document.querySelector('#price');
  var TIMEIN = document.querySelector('#timein');
  var TIMOUT = document.querySelector('#timeout');
  var ROOM_NUMBER = document.querySelector('#room_number');
  var CAPACITY = document.querySelector('#capacity');
  var CAPACITY_OPTIONS = CAPACITY.querySelectorAll('option');
  var HOUSING_TYPE = document.querySelector('#type');

  // минимальная стоимость
  var MIN_PRICES = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  // функция для установления минимальной стоимости жилья
  var setMinPrice = function () {
    var type = HOUSING_TYPE.value;
    PRICE.setAttribute('min', MIN_PRICES[type]);
    PRICE.setAttribute('placeholder', MIN_PRICES[type]);
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
    for (var n = 0, capacityOptionsLength = CAPACITY_OPTIONS.length; n < capacityOptionsLength; n++) {
      CAPACITY_OPTIONS[n].removeAttribute('disabled');
    }

    var isDisabledGuestsOption = function (num) {
      var rooms = +ROOM_NUMBER.value;
      var guests = +CAPACITY_OPTIONS[num].value;
      return (guests > rooms && guests !== 0) ||
        (guests !== 0 && rooms === 100) ||
        (guests === 0 && rooms !== 100);
    };

    for (var i = capacityOptionsLength - 1; i >= 0; i--) {
      if (isDisabledGuestsOption(i)) {
        CAPACITY_OPTIONS[i].setAttribute('disabled', 'disabled');
      } else {
        CAPACITY.value = CAPACITY_OPTIONS[i].value;
      }
    }
  };


  setMinPrice();
  setMinGuests();
  TIMEIN.addEventListener('change', timeSynchro);
  TIMOUT.addEventListener('change', timeSynchro);
  HOUSING_TYPE.addEventListener('change', setMinPrice);
  ROOM_NUMBER.addEventListener('change', setMinGuests);
})();
