'use strict';
(function () {
  /**
    * Модуль map-filters
    *
    * сортирует объявления в соответсвии с применёнными фильтрами и перерисовывает пины
    * @param mapFilters.updatePins - перерисовывает пины в соответсвии с применёнными фильтрами
   */
  var HOUSING_TYPE = document.querySelector('#housing-type');
  var HOUSING_PRICE = document.querySelector('#housing-price');
  var HOUSING_ROOMS = document.querySelector('#housing-rooms');
  var HOUSING_GUESTS = document.querySelector('#housing-guests');

  //  Диапазоны ценв в селекте ктрты
  var prices = {
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      min: 0,
      max: 10000
    },
    high: {
      min: 50000,
      max: 10000000
    }
  };

  // функция ранжирования объявлений в соответствии с фильтрами
  var getRank = function (announcement) {
    var checkboxChecked = document.querySelectorAll('.map__checkbox:checked');

    // функция для проверки чекбоксов
    var checkboxCheck = function () {
      var rank = false;
      checkboxChecked.forEach(function (checkbox) {
        if (announcement.offer.features.indexOf(checkbox.value) === -1) {
          rank = true;
        }
      });
      return rank;
    };
    if (checkboxCheck()) {
      return false;
    }

    if ((HOUSING_TYPE.value !== 'any') && (announcement.offer.type !== HOUSING_TYPE.value)) {
      return false;
    }
    if ((HOUSING_PRICE.value !== 'any') &&
      !(
        (announcement.offer.price >= prices[HOUSING_PRICE.value].min) && (announcement.offer.price <= prices[HOUSING_PRICE.value].max))) {
      return false;
    }
    if ((HOUSING_ROOMS.value !== 'any') &&
      (+announcement.offer.rooms !== +HOUSING_ROOMS.value)) {
      return false;
    }
    if ((HOUSING_GUESTS.value !== 'any') &&
      (+announcement.offer.guests !== +HOUSING_GUESTS.value)) {
      return false;
    }

    return true;
  };

  // функция объновления пинов после применения фильтров
  var updatePins = function () {
    window.map.delAllPins();
    window.map.closeCard();
    window.map.drawPinsOnMap(window.allOffers.slice().filter(getRank));
  };

  // устанавливаем слушатели на все элементы формы фильтрации объявлений
  document.querySelectorAll('.map__filter, .map__checkbox').forEach(function (filter) {
    filter.addEventListener('change', function () {
      window.debounce(updatePins);
    });
  });
})();
