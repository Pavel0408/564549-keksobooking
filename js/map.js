'use strict';
(function () {
  /**
    * Модуль map
    *
    * Переводит карту и форму в активное состояние отрисовывает пины похожих объявлений на карте
    * @param map.- утанавливает минимальную стоимость жилья
    * @param form.placingOnMap - содержит функции для взамиодействия с картой
    * @param map.placingOnMap.drawPinsOnMap - отрисовывает пины объявлений на карте
    * @param map.placingOnMap.makeMapActive -  переводит карту в активное состояние
    * @param map.placingOnMap.cardDraw - добавляет карточку объявления на страницу
    * @param map.placingOnMap.makeFormActive - переводит форму в активное стостояние
    * @param map.placingOnMap.closeCard  - закрывает карточку объявления
    * @param map.placingOnMap.newCardDraw - создаёт карточку при клике по пину
    * @param map.placingOnMap.pinsListeners -  добавляет обработчик клика на все пины
    *  @param map.makeFormDasabled - блокирует поля формы до перетаскивания пина
   */

  var MAP_PINS = document.querySelector('.map__pins');
  var MAP = document.querySelector('.map');
  var MAP_PIN_MAIN = document.querySelector('.map__pin--main');
  var MAIN_PIN_WEIGHT = MAP_PIN_MAIN.offsetWidth;
  var MAIN_PIN_HEIGHT = MAP_PIN_MAIN.offsetHeight;
  var MAIN_PIN_TOP = MAP_PIN_MAIN.offsetTop;
  var MAIN_PIN_LEFT = MAP_PIN_MAIN.offsetLeft;
  var FIELDSETS = document.querySelectorAll('fieldset');
  var AD_FORM = document.querySelector('.ad-form');
  var SUCCESS = document.querySelector('#success').content.querySelector('.success');
  var ERROR = document.querySelector('#error').content.querySelector('.error');
  var MAIN = document.querySelector('main');
  var RESTE_FORM_BUTTON = document.querySelector('.ad-form__reset');

  var placingOnMap = function () {

    var sucsessHandler = function (offers) {
      var allOffers = offers.slice();
      allOffers.forEach(function (offer, index) {
        offer.id = index;
      });
      window.allOffers = allOffers;
      drawPinsOnMap();
    };

    var errorHandler = function () {
      var errorMessage = ERROR.cloneNode(true);
      MAIN.appendChild(errorMessage);
      var closeErrorMessage = function () {
        errorMessage.remove();
      };
      document.addEventListener('click', closeErrorMessage);
    };

    var formSucsessHandler = function () {
      var successMessage = SUCCESS.cloneNode(true);
      MAIN.appendChild(successMessage);
      makeMapNotActive();
      var closeSuccessMessage = function () {
        successMessage.remove();
      };
      document.addEventListener('click', closeSuccessMessage);
    };


    // функция для отрисовки всех пинов
    var drawPinsOnMap = function () {
      var fragment = document.createDocumentFragment();
      for (var j = 0, allOffersLength = window.allOffers.length; j < allOffersLength; j++) {
        if (!window.allOffers[j].offer) {
          continue;
        }
        fragment.appendChild(window.renderPin(window.allOffers[j]));
        if (fragment.querySelectorAll('.map__pin').length >= window.constants.ADS_NUMBERS) {
          break;
        }
      }

      MAP_PINS.appendChild(fragment);
    };

    // функция для перевода карты в активное состояние
    var makeMapActive = function () {
      MAP.classList.remove('map--faded');
      AD_FORM.classList.remove('ad-form--disabled');
    };

    // функция для перевода карты и формы в нективное состояние
    var makeMapNotActive = function () {
      var allOffersPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      allOffersPins.forEach(function (pin) {
        pin.remove();
      });
      MAP.classList.add('map--faded');
      AD_FORM.reset();
      AD_FORM.classList.add('ad-form--disabled');
      closeCard();
      window.utilities.getAdress(MAIN_PIN_WEIGHT, MAIN_PIN_HEIGHT / 2);
      makeFormDasabled();
      MAP_PIN_MAIN.addEventListener('mouseup', placingOnMap);
      MAP_PIN_MAIN.style.top = MAIN_PIN_TOP + 'px';
      MAP_PIN_MAIN.style.left = MAIN_PIN_LEFT + 'px';
    };

    // фунция для добавления карточки объявления на страницу
    var cardDraw = function (num) {
      var fragment = document.createDocumentFragment();
      var map = document.querySelector('.map');
      var closeCardButton;

      fragment.appendChild(window.renderCard(window.allOffers[num]));
      map.insertBefore(fragment, map.querySelector('.map__filters-container'));
      closeCardButton = document.querySelector('.popup__close');
      closeCardButton.addEventListener('click', closeCard);
    };

    // функция для перевода формы в активное стостояние
    var makeFormActive = function () {
      for (var i = 0, fieldsetLength = FIELDSETS.length; i < fieldsetLength; i++) {
        FIELDSETS[i].removeAttribute('disabled');
      }
    };

    // функция для закрытия карточки объявления
    var closeCard = function () {
      if (MAP.querySelector('.map__card') !== null) {
        MAP.removeChild(MAP.querySelector('.map__card'));
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
    };

    // функция для отрисовки карточки при клике по пину
    var newCardDraw = function (num) {
      closeCard();
      cardDraw(num);
    };

    // функция добавляющая обработчик клика на все пины
    var pinsListeners = function (evt) {
      var target = evt.target.closest('.map__pin');
      if (target) {
        var num = target.dataset.id;
      }

      if (num) {
        target.classList.add('map__pin--active');
        newCardDraw(num);
      }
    };

    window.backend.load(sucsessHandler, errorHandler);
    makeMapActive();
    makeFormActive();
    AD_FORM.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(AD_FORM), formSucsessHandler, errorHandler);
      evt.preventDefault();
    });

    MAP_PIN_MAIN.removeEventListener('mouseup', placingOnMap);

    // добавляем обработчик клика на все пины
    MAP.addEventListener('click', pinsListeners);

    RESTE_FORM_BUTTON.addEventListener('click', makeMapNotActive);
  };

  // функция для перевода формы в неактивное состояние
  var makeFormDasabled = function () {
    for (var i = 0, fieldsetLength = FIELDSETS.length; i < fieldsetLength; i++) {
      FIELDSETS[i].setAttribute('disabled', 'disabled');
    }
  };

  window.utilities.getAdress(MAIN_PIN_WEIGHT, MAIN_PIN_HEIGHT / 2);

  makeFormDasabled();
  MAP_PIN_MAIN.addEventListener('mouseup', placingOnMap);
})();
