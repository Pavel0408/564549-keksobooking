'use strict';
var placingOnMap = function () {

  // колличество объявлений
  var ADS_NUMBERS = 8;

  //  заголовки объявлений
  var titles = ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];

  // тип жилья
  var types = ['palace',
    'flat',
    'house',
    'bungalo'];

  // заезды
  var checkins = ['12:00', '13:00', '14:00'];

  // выезды
  var checkouts = ['12:00', '13:00', '14:00'];

  //  преимущества
  var features = ['wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevato',
    'conditioner'];

  //  фотографии
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // генерация случайного числа из даипазона
  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  // случайный индекс массива
  var getRandomIndex = function (arr) {
    return getRandomNumber(0, arr.length - 1);
  };

  //  уникальное значение из массива
  var getRandomValue = function (arr) {
    var randInd = getRandomIndex(arr);
    var val = arr[randInd];
    arr.splice(randInd, 1);
    return val;
  };

  var generateAllOffers = function () {
    var offersNumber = ADS_NUMBERS;
    var offersTitels = titles.slice();
    var offersTypes = types.slice();
    var offersCheckins = checkins.slice();
    var offersCheckouts = checkouts.slice();
    var offersFeatures = features.slice();
    var offersPhotos = photos.slice();
    var allOffers = [];

    //  создание массива адресов аватарок
    var avatarsGenerate = function (numberAds) {
      var avatars = [];
      for (var i = 1; i <= numberAds; i++) {
        var newAvatar = 'img/avatars/user' + '0' + i + '.png';
        avatars.push(newAvatar);
      }
      return avatars;
    };
    var avatars = avatarsGenerate(ADS_NUMBERS);

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
        var photo = getRandomValue(photosAll);
        photosInOffer.push(photo);
      }
      return (photosInOffer);
    };

    var generateAnnouncement = function () {
      var announcement = {};
      announcement.autor = {};
      announcement.offer = {};
      announcement.autor.avatar = getRandomValue(avatars);
      announcement.offer.title = getRandomValue(offersTitels);
      announcement.offer.address = getRandomNumber(5, 150) + ', ' + getRandomNumber(130, 630);
      announcement.offer.price = getRandomNumber(1000, 1000000);
      announcement.offer.type = getTypeOffer(announcement.offer.title);
      announcement.offer.rooms = getRandomNumber(1, 5);
      announcement.offer.guests = getRandomNumber(1, 100);
      announcement.offer.checkin = offersCheckins[getRandomIndex(offersCheckins)];
      announcement.offer.checkout = offersCheckouts[getRandomIndex(offersCheckouts)];
      announcement.offer.features = offersFeatures.slice(0, getRandomIndex(offersFeatures));
      announcement.offer.photos = addPhotos(offersPhotos);
      announcement.location = getRandomNumber(5, 150) + ', ' + getRandomNumber(130, 630);
      return announcement;
    };
    for (var k = 0; k < offersNumber; k++) {
      var announcement = generateAnnouncement();
      allOffers.push(announcement);
    }
    console.log(allOffers);
    return allOffers;

  };

  var makeMapActive = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };
  makeMapActive();
  generateAllOffers();
};
placingOnMap();

