'use strict';
(function () {
/**
  * Модуль renderСard
  *
  * Модуль для создания карточки объявления
  * @param window.renderCard - экспортирует в глобальную область видимости функцию для создания карточки объявления
  * @param renderCard.renderType - определяет тип жилья
  * @param renderCard.featuresGenerate - отрисовывает приимущества в карточке объявления
  * @param renderCard.featuresGenerate - отрисовывает фотографии в карточке объявления
 */

  // функция для отрисовки карточки объявления
  var renderCard = function (announcement) {
    var card = document.querySelector('#card').content
      .querySelector('.map__card');
    var mapCard = card.cloneNode(true);

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
    var featuresGenerate = function (arr) {
      var featuresClasses = mapCard.querySelectorAll('.popup__feature');
      var ul = mapCard.querySelector('ul');

      for (var i = 0, featuresLength = window.constants.FEATURES.length; i < featuresLength; i++) {
        if (arr.offer.features.indexOf(window.constants.FEATURES[i]) === -1) {
          ul.removeChild(featuresClasses[i]);
        }
      }
    };

    //  фунция для отрисовки фотографий жилья в карточке объявления
    var renderPhoto = function (arr) {
      var photoBlock = mapCard.querySelector('.popup__photos');
      var photo = mapCard.querySelector('.popup__photo');
      photoBlock.removeChild(photo);
      for (var i = 0, arrLength = arr.offer.photos.length; i < arrLength; i++) {
        var tempPhoto = photo.cloneNode(true);
        tempPhoto.src = arr.offer.photos[i];
        photoBlock.appendChild(tempPhoto);
      }
    };

    // создаём карточку объявления
    mapCard.querySelector('.popup__title').textContent = announcement.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = announcement.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';
    mapCard.querySelector('.popup__type').textContent = renderType(announcement);
    mapCard.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
    featuresGenerate(announcement);
    mapCard.querySelector('.popup__description').textContent = announcement.offer.description;
    renderPhoto(announcement);
    mapCard.querySelector('.popup__avatar').src = announcement.autor.avatar;

    return mapCard;
  };
  window.renderCard = renderCard;
})();
