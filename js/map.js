'use strict';
var placingOnMap = function () {
  var mapPin = document.querySelector('.map__pin');
  var card = document.querySelector('#card').content
    .querySelector('.map__card');
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
      announcement.location = {};
      announcement.autor.avatar = getRandomValue(avatars);
      announcement.offer.title = getRandomValue(offersTitels);
      announcement.offer.address = getRandomNumber(5, 150) + ', ' + getRandomNumber(130, 630);
      announcement.offer.price = getRandomNumber(1000, 1000000);
      announcement.offer.type = getTypeOffer(announcement.offer.title);
      announcement.offer.rooms = getRandomNumber(1, 5);
      announcement.offer.guests = getRandomNumber(1, 100);
      announcement.offer.checkin = offersCheckins[getRandomIndex(offersCheckins)];
      announcement.offer.checkout = offersCheckouts[getRandomIndex(offersCheckouts)];
      announcement.offer.features = offersFeatures.slice(0, getRandomNumber(1, offersFeatures.length));
      announcement.offer.description = '';
      announcement.offer.photos = addPhotos(offersPhotos);
      announcement.location.x = getRandomNumber(250, 850);
      announcement.location.y = getRandomNumber(130, 630);
      return announcement;
    };
    for (var k = 0; k < offersNumber; k++) {
      var announcement = generateAnnouncement();
      allOffers.push(announcement);
    }
    console.log(allOffers);
    return allOffers;
  };

  var allOffers = generateAllOffers();

  var renderPin = function (announcement) {
    var onePin = mapPin.cloneNode(true);
    onePin.style = 'left: ' + announcement.location.x + 'px; top: ' + announcement.location.y + 'px;';
    onePin.querySelector('img').src = announcement.autor.avatar;
    onePin.querySelector('img').alt = announcement.offer.title;
    return (onePin);
  };

  var drawPinsOnMap = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < ADS_NUMBERS; j++) {
      fragment.appendChild(renderPin(allOffers[j]));
    }

    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(fragment);
  };

  var makeMapActive = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  var renderCard = function (announcement) {
    var renderType = function (obj) {
      if (obj.offer.type === 'palace') {
        return 'Дворец';
      }
      if (obj.offer.type === 'flat') {
        return 'Квартира';
      }
      if (obj.offer.type === 'house') {
        return 'Дом';
      }
      return 'Бунгало';
    };

    var featuresGenerate = function (arr, mapCard) {
      var ul = mapCard.querySelector('ul');
      if (arr.offer.features.indexOf('wifi') === -1) {
        ul.removeChild(ul.querySelector('.popup__feature--wifi'));
      }
      if (arr.offer.features.indexOf('dishwasher') === -1) {
        ul.removeChild(ul.querySelector('.popup__feature--dishwasher'));
      }
      if (arr.offer.features.indexOf('parking') === -1) {
        ul.removeChild(ul.querySelector('.popup__feature--parking'));
      }
      if (arr.offer.features.indexOf('washer') === -1) {
        ul.removeChild(ul.querySelector('.popup__feature--washer'));
      }
      if (arr.offer.features.indexOf('elevato') === -1) {
        ul.removeChild(ul.querySelector('.popup__feature--elevator'));
      }
      if (arr.offer.features.indexOf('conditioner') === -1) {
        ul.removeChild(ul.querySelector('.popup__feature--conditioner'));
      }
    };

    var renderPhoto = function (arr) {
      var photoBlock = mapCard.querySelector('.popup__photos');
      var photo = mapCard.querySelector('.popup__photo');
      photoBlock.removeChild(photo);
      var arrLength = arr.offer.photos.length;
      console.log(arrLength);
      for (var i = 0; i < arrLength; i++) {
        var tempPhoto = photo.cloneNode(true);
        tempPhoto.src = arr.offer.photos[i];
        photoBlock.appendChild(tempPhoto);
      }
    };

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

    console.log(mapCard);
    return mapCard;
  };

  var cardDraw = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(allOffers[3]));
    var map = document.querySelector('.map');
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));
  };

  drawPinsOnMap();
  cardDraw(allOffers[0]);
  makeMapActive();
  renderPin(allOffers[3]);
};
placingOnMap();

