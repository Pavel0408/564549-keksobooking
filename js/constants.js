'use strict';
(function () {
  //  заголовки объявлений
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  // тип жилья
  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  // заезды
  var CHECKINS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  // выезды
  var CHECKOUTS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  //  преимущества
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevato',
    'conditioner'
  ];

  //  фотографии
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  // минимальная стоимость
  var MIN_PRICES = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  window.constants = {
    TITLES: TITLES,
    TYPES: TYPES,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    MIN_PRICES: MIN_PRICES,
    ADS_NUMBERS: 8
  };
})();
