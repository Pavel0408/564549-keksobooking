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
      max: Infinity
    }
  };

  // функция ранжирования объявлений в соответствии с фильтрами
  var pinsFilter = function (announcement) {
    var checkboxChecked = document.querySelectorAll('.map__checkbox:checked');

    // функция для проверки чекбоксов
    var checkboxFilter = function () {
      var rank = false;
      checkboxChecked.forEach(function (checkbox) {
        if (announcement.offer.features.indexOf(checkbox.value) === -1) {
          rank = true;
        }
      });
      return rank;
    };

    // функция для проверки селектов
    var selectFilter = function (filterValue, offerValue) {
      if (filterValue === 'any') {
        return false;
      }

      if (typeof (offerValue) === 'number') {
        filterValue = +filterValue;
      }

      if (offerValue !== filterValue) {
        return true;
      }

      return false;
    };

    // Проверяем тип жилья
    if (selectFilter(HOUSING_TYPE.value, announcement.offer.type)) {
      return false;
    }

    // Проверяем колличество комнат
    if (selectFilter(HOUSING_ROOMS.value, announcement.offer.rooms)) {
      return false;
    }

    //  Проверяем колличесво гостей
    if (selectFilter(HOUSING_GUESTS.value, announcement.offer.guests)) {
      return false;
    }

    // проверяем чекбоксы
    if (checkboxFilter()) {
      return false;
    }

    // проверяем дипазон цен
    if ((HOUSING_PRICE.value !== 'any') &&
      !(
        (announcement.offer.price >= prices[HOUSING_PRICE.value].min) && (announcement.offer.price <= prices[HOUSING_PRICE.value].max))) {
      return false;
    }

    return true;
  };

  // функция объновления пинов после применения фильтров
  var updatePins = function () {
    window.map.delAllPins();
    window.map.closeCard();
    window.map.drawPinsOnMap(window.allOffers.slice().filter(pinsFilter));
  };

  var filterChangeHandler = function () {
    window.debounce(updatePins);
  };

  // устанавливаем слушатели на все элементы формы фильтрации объявлений
  document.querySelectorAll('.map__filter, .map__checkbox').forEach(function (filter) {
    filter.addEventListener('change', filterChangeHandler);
  });
})();
