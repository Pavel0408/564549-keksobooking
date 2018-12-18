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
      min: -Infinity,
      max: 10000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  // функция ранжирования объявлений в соответствии с фильтрами
  var getRank = function (announcement) {
    var rank = true;
    var checkboxChecked = document.querySelectorAll('.map__checkbox:checked');
    checkboxChecked.forEach(function (checkbox) {
      if (announcement.offer.features.indexOf(checkbox.value) === -1) {
        rank = false;
      }
    });

    if ((HOUSING_TYPE.value !== 'any') && (announcement.offer.type !== HOUSING_TYPE.value)) {
      rank = false;
      console.log('Не прошло');
      return rank;
    }
    if ((HOUSING_PRICE.value !== 'any') &&
      !(
        (announcement.offer.price >= prices[HOUSING_PRICE.value].min) && (announcement.offer.price <= prices[HOUSING_PRICE.value].max))) {
      rank = false;
      return rank;
    }
    if ((HOUSING_ROOMS.value !== 'any') &&
      (+announcement.offer.rooms !== +HOUSING_ROOMS.value)) {
      rank = false;
      return rank;
    }
    if ((HOUSING_GUESTS.value !== 'any') &&
      (+announcement.offer.guests !== +HOUSING_GUESTS.value)) {
      rank = false;
      return rank;
    }

    return rank;
  };

  // функция объновления пинов после применения фильтров
  var updatePins = function () {
    window.map.delAllPins();
    window.map.closeCard();
    window.map.drawPinsOnMap(window.allOffers.slice().filter(getRank));
  };
  document.querySelectorAll('.map__filter').forEach(function (select) {
    select.addEventListener('change', function () {
      window.debounce(updatePins);
    });
  });


  // устанавливаем слушатели на все элементы формы фильтрации объявлений
  document.querySelectorAll('.map__checkbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      window.debounce(updatePins);
    });
  });
})();
