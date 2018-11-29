'use strict';
// колличество объявлений
var ADS_NUMBERS = 8;

//  заголовки объявлений
var titles = [
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
var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

// заезды
var checkins = [
  '12:00',
  '13:00',
  '14:00'
];

// выезды
var checkouts = [
  '12:00',
  '13:00',
  '14:00'
];

//  преимущества
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevato',
  'conditioner'
];

//  фотографии
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var placingOnMap = function () {
  var allOffers;

  //  образец метки на карте
  var mapPin = document.querySelector('.map__pin');

  // образец карточки объявления
  var card = document.querySelector('#card').content
    .querySelector('.map__card');

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

  // функция для создания массива объявлений
  var generateAllOffers = function () {
    var offersTitels = titles.slice();
    var offersTypes = types.slice();
    var offersCheckins = checkins.slice();
    var offersCheckouts = checkouts.slice();
    var offersFeatures = features.slice();
    var offersPhotos = photos.slice();
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

    //  создаём один объект с объявлением
    var generateAnnouncement = function () {
      var title = getRandomValue(offersTitels);
      var announcement = {};

      announcement.autor = {
        avatar: getRandomValue(avatars)
      };

      announcement.location = {
        x: getRandomNumber(locationXmin, locationXmax),
        y: getRandomNumber(locationYmin, locationYmax)
      };

      announcement.offer = {
        title: title,
        address: announcement.location.x + ', ' + announcement.location.y,
        price: getRandomNumber(minPrice, maxPrice),
        type: getTypeOffer(title),
        rooms: getRandomNumber(minRooms, maxRooms),
        guests: getRandomNumber(minGuests, maxGuests),
        checkin: offersCheckins[getRandomIndex(offersCheckins)],
        checkout: offersCheckouts[getRandomIndex(offersCheckouts)],
        features: offersFeatures.slice(0, getRandomNumber(1, offersFeatures.length)),
        description: '',
        photos: addPhotos(offersPhotos),
      };

      return announcement;
    };

    // создаём нужное колличество объявлений
    for (var k = 0; k < ADS_NUMBERS; k++) {
      var announcement = generateAnnouncement();
      offers.push(announcement);
    }
    return offers;
  };

  // запускаем функцию создающую массив объявлений
  allOffers = generateAllOffers();

  // функция для создания одного пина
  var renderPin = function (announcement) {
    var onePin = mapPin.cloneNode(true);
    onePin.style = 'left: ' + announcement.location.x + 'px; top: ' + announcement.location.y + 'px;';
    onePin.querySelector('img').src = announcement.autor.avatar;
    onePin.querySelector('img').alt = announcement.offer.title;
    return (onePin);
  };

  // функция для отрисовки всех пинов
  var drawPinsOnMap = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < ADS_NUMBERS; j++) {
      fragment.appendChild(renderPin(allOffers[j]));
    }

    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(fragment);
  };

  // функция для перевода карты в активное состояние
  var makeMapActive = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  // функция для отрисовки карточки объявления
  var renderCard = function (announcement) {

    //  функция для определения типа жилья
    var renderType = function (obj) {
      var allTypes = {
        palace: 'Дворец',
        flat: 'Квартира',
        house: 'Дом',
        bungalo: 'Бунгало'
      };
      return allTypes[obj.offer.type];
    };

    // функция для отрисовки преимуществ в карточке объявления
    var featuresGenerate = function (arr, mapCard) {
      var featuresClasses = mapCard.querySelectorAll('.popup__feature');
      var ul = mapCard.querySelector('ul');
      var featuresLength = features.length;
      for (var i = 0; i < featuresLength; i++) {
        if (arr.offer.features.indexOf(features[i]) === -1) {
          ul.removeChild(featuresClasses[i]);
        }
      }
    };

    //  фунция для отрисовки фотографий жилья в карточке объявления
    var renderPhoto = function (arr) {
      var arrLength;
      var photoBlock = mapCard.querySelector('.popup__photos');
      var photo = mapCard.querySelector('.popup__photo');
      photoBlock.removeChild(photo);
      arrLength = arr.offer.photos.length;
      for (var i = 0; i < arrLength; i++) {
        var tempPhoto = photo.cloneNode(true);
        tempPhoto.src = arr.offer.photos[i];
        photoBlock.appendChild(tempPhoto);
      }
    };

    // создаём карточку объявления
    var mapCard = card.cloneNode(true);
    mapCard.querySelector('.popup__title').textContent = announcement.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = announcement.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';
    mapCard.querySelector('.popup__type').textContent = renderType(announcement);
    mapCard.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
    featuresGenerate(announcement, mapCard);
    mapCard.querySelector('.popup__description').textContent = announcement.offer.description;
    renderPhoto(announcement);
    mapCard.querySelector('.popup__avatar').src = announcement.autor.avatar;

    return mapCard;
  };

  // фунция для добавления карточки объявления на страницу
  var cardDraw = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(allOffers[3]));
    var map = document.querySelector('.map');
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));
  };

  drawPinsOnMap();
  cardDraw();
  makeMapActive();
};
placingOnMap();

