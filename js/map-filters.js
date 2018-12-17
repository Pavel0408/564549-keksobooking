'use strict';
(function () {
  var HOUSING_TYPE = document.querySelector('#housing-type');
  var HOUSING_PRICE = document.querySelector('#housing-price');
  var HOUSING_ROOMS = document.querySelector('#housing-rooms');
  var HOUSING_GUESTS = document.querySelector('#housing-guests');
  var WIFI = document.querySelector('#filter-wifi');
  var DISHWASHER = document.querySelector('#filter-dishwasher');
  var PARKING = document.querySelector('#filter-parking');
  var WASHER = document.querySelector('#filter-washer');
  var ELEVATOR = document.querySelector('#filter-elevator');
  var CONDITIONER = document.querySelector('#filter-conditioner');

  var coatColor;
  var eyesColor;
  var wizards = [];

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
  var getRank = function (announcement) {
    var rank = 0;

    if ((HOUSING_TYPE.value !== 'any') && (announcement.offer.type === HOUSING_TYPE.value)) {
      rank += 3;
    }
    if ((HOUSING_PRICE.value !== 'any') && (announcement.offer.price >= prices[HOUSING_PRICE.value].min) && (announcement.offer.price <= prices[HOUSING_PRICE.value].max)) {
      rank += 3;
    }
    if (announcement.offer.rooms === HOUSING_ROOMS.value) {
      rank += 3;
    }
    if (announcement.offer.rooms === HOUSING_ROOMS.value) {
      rank += 3;
    }
    if (announcement.offer.guests === HOUSING_GUESTS.value) {
      rank += 3;
    }

    return rank;
  };

  // функция для обновления списка похожих волшебников
  var updatePins = function () {
    window.map.delAllPins();

    window.map.drawPinsOnMap(window.allOffers.slice().
      sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = window.allOffers.indexOf(left) - window.allOffers.indexOf(right);
        }
        console.log(right);
        console.log(rankDiff);
        return rankDiff;
      }));
  };
  HOUSING_TYPE.addEventListener('change', updatePins);
})();
