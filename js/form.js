'use strict';
(function () {
  /**
    * Модуль form
    *
    * Обеспечевает взаимодейсвие пльзователя с формой отправки объевления
    * @param form.setMinPrice - уcтанавливает минимальную стоимость жилья
    * @param form.timeSynchro - синхронизирует время заезда и выезда
    * @param form.setMinGuests - установливает соответсвие гостей и комнат
   */

  var PRICE = document.querySelector('#price');
  var TIMEIN = document.querySelector('#timein');
  var TIMOUT = document.querySelector('#timeout');
  var ROOM_NUMBER = document.querySelector('#room_number');
  var CAPACITY = document.querySelector('#capacity');
  var CAPACITY_OPTIONS = CAPACITY.querySelectorAll('option');
  var HOUSING_TYPE = document.querySelector('#type');
  var IMAGES_INPUT = document.querySelector('#images');
  var AVATAR_INPUT = document.querySelector('#avatar');
  var NO_GUESTS = 0;
  var MAX_ROOMS = 100;

  // функция для установления минимальной стоимости жилья
  var setMinPrice = function () {
    var type = HOUSING_TYPE.value;
    PRICE.setAttribute('min', window.constants.MIN_PRICES[type]);
    PRICE.setAttribute('placeholder', window.constants.MIN_PRICES[type]);
  };

  // функции для синхронизации времени заезда и выезда
  var timeSynchro = function (evt) {
    TIMOUT.value = TIMEIN.value = evt.target.value;
  };

  // функция для установления соответсвия гостей и комнат
  var setMinGuests = function () {
    var isDisabledGuestsOption = function (num) {
      var rooms = +ROOM_NUMBER.value;
      var guests = +CAPACITY_OPTIONS[num].value;
      return (guests > rooms && guests !== NO_GUESTS) ||
        (guests !== NO_GUESTS && rooms === MAX_ROOMS) ||
        (guests === NO_GUESTS && rooms !== MAX_ROOMS);
    };

    CAPACITY_OPTIONS.forEach(function (option, index) {
      option.removeAttribute('disabled');
      if (isDisabledGuestsOption(index)) {
        option.setAttribute('disabled', 'disabled');
      } else {
        CAPACITY.value = CAPACITY_OPTIONS[index].value;
      }
    });
  };

  setMinPrice();
  setMinGuests();
  TIMEIN.addEventListener('change', timeSynchro);
  TIMOUT.addEventListener('change', timeSynchro);
  HOUSING_TYPE.addEventListener('change', setMinPrice);
  ROOM_NUMBER.addEventListener('change', setMinGuests);
  IMAGES_INPUT.addEventListener('change', function () {
    window.fotos.fotosInputHandler(IMAGES_INPUT);
  });
  AVATAR_INPUT.addEventListener('change', function () {
    window.fotos.avatarInputHandler(AVATAR_INPUT);
  });
  window.form = {
    setMinPrice: setMinPrice,
    setMinGuests: setMinGuests
  };
})();
