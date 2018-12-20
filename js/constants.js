'use strict';
(function () {
  /**
   * Модуль constants
   *
   * Экспортирует в глобальную область видимость константы
   * @param constants.TYPES  - типы жилья
   * @param constants.MIN_PRICES - минимальная стоимость здачи жиллья
   * @param constants.ADS_NUMBERS - количество меток похожих объявлений на карте
   * @param constants.SUCCESS_SERVER_CODE - код успешного ответа сервера
   * @param constants.MAX_TIMEOUT - максимальное время ожидания ответа сервера
   * @param constants.urls.load - адрес скоторого загружатся похожие объявления
   * @param constants.urls.save - адрес на который отрпраляются данные формы
   */

  //  преимущества
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  // минимальная стоимость
  var MIN_PRICES = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  window.constants = {
    FEATURES: FEATURES,
    MIN_PRICES: MIN_PRICES,
    ADS_NUMBERS: 5,
    SUCCESS_SERVER_CODE: 200,
    MAX_TIMEOUT: 10000,
    urls: {
      load: 'https://js.dump.academy/keksobooking/data',
      save: 'https://js.dump.academy/keksobooking'
    }
  };
})();
