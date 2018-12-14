'use strict';
(function () {
  /**
 * Модуль all-offers
 *
 * Генерирует массив похожих объявлений
 * @param window.allOffers - экспортирует массив с похожмими объявлениями в глобальную область видимости
 *
 */

  // функция для создания массива объявлений
  var generateAllOffers = function () {
    var offersTitels = window.constants.TITLES.slice();
    var offersTypes = window.constants.TYPES.slice();
    var offersCheckins = window.constants.CHECKINS.slice();
    var offersCheckouts = window.constants.CHECKOUTS.slice();
    var offersFeatures = window.constants.FEATURES.slice();
    var offersPhotos = window.constants.PHOTOS.slice();
    var offers = [];
    var maxPrice = 1000000;
    var minPrice = 1000;
    var minGuests = 1;
    var maxGuests = 50;
    var minRooms = 1;
    var maxRooms = 5;
    var locationXmin = 250;
    var locationXmax = 850;
    var locationYmin = 130;
    var locationYmax = 630;

    //  создаём массив адресов аватарок
    var avatarsGenerate = function (numberAds) {
      var avatars = [];
      for (var i = 1; i <= numberAds; i++) {
        var newAvatar = 'img/avatars/user' + '0' + i + '.png';
        avatars.push(newAvatar);
      }
      return avatars;
    };
    var avatars = avatarsGenerate(window.constants.ADS_NUMBERS);

    // определяем тип сдаваемого жилья
    var getTypeOffer = function (str) {
      if (str.indexOf('дворец') !== -1) {
        return offersTypes[0];
      }
      if (str.indexOf('квартира') !== -1) {
        return offersTypes[1];
      }
      if (str.indexOf('дом') !== -1) {
        return offersTypes[2];
      }
      return offersTypes[3];
    };

    //  добавляет фотографии в произвольном проядке
    var addPhotos = function (arr) {
      var photosAll = arr.slice();
      var photosInOffer = [];
      while (photosAll.length) {
        var photo = window.utilities.getRandomValue(photosAll);
        photosInOffer.push(photo);
      }

      return (photosInOffer);
    };

    //  создаём один объект с объявлением
    var generateAnnouncement = function () {
      var title = window.utilities.getRandomValue(offersTitels);
      var announcement = {};

      announcement.autor = {
        avatar: window.utilities.getRandomValue(avatars)
      };

      announcement.location = {
        x: window.utilities.getRandomNumber(locationXmin, locationXmax),
        y: window.utilities.getRandomNumber(locationYmin, locationYmax)
      };

      announcement.offer = {
        title: title,
        address: announcement.location.x + ', ' + announcement.location.y,
        price: window.utilities.getRandomNumber(minPrice, maxPrice),
        type: getTypeOffer(title),
        rooms: window.utilities.getRandomNumber(minRooms, maxRooms),
        guests: window.utilities.getRandomNumber(minGuests, maxGuests),
        checkin: offersCheckins[window.utilities.getRandomIndex(offersCheckins)],
        checkout: offersCheckouts[window.utilities.getRandomIndex(offersCheckouts)],
        features: offersFeatures.slice(0, window.utilities.getRandomNumber(1, offersFeatures.length)),
        description: '',
        photos: addPhotos(offersPhotos),
      };

      return announcement;
    };

    // создаём нужное колличество объявлений
    for (var k = 0; k < window.constants.ADS_NUMBERS; k++) {
      var announcement = generateAnnouncement();
      announcement.id = k;
      offers.push(announcement);
    }
    return offers;
  };

  // запускаем функцию создающую массив объявлений
  window.allOffers = generateAllOffers();
})();
