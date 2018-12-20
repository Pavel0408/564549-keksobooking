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
      window.constants.FEATURES.forEach(function (feature, index) {
        if (arr.offer.features.indexOf(feature) === -1) {
          ul.removeChild(featuresClasses[index]);
        }
      });
      featuresClasses = mapCard.querySelectorAll('.popup__feature');
      if (featuresClasses.length === 0) {
        ul.remove();
      }
    };

    //  фунция для отрисовки фотографий жилья в карточке объявления
    var renderPhoto = function (arr) {
      var photoBlock = mapCard.querySelector('.popup__photos');
      var photo = mapCard.querySelector('.popup__photo');
      photoBlock.removeChild(photo);
      arr.offer.photos.forEach(function (onePhoto) {
        var tempPhoto = photo.cloneNode(true);
        tempPhoto.src = onePhoto;
        photoBlock.appendChild(tempPhoto);
      });
      if (photoBlock.querySelectorAll('img').length === 0) {
        photoBlock.remove();
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
    mapCard.querySelector('.popup__avatar').src = announcement.author.avatar;

    return mapCard;
  };
  window.renderCard = renderCard;
})();
