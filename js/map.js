'use strict';
(function () {
  /**
    * Модуль map содержит функции для взамиодействия с картой
    * @param window.map.drawPinsOnMap - отрисовывает пины объявлений на карте
    * @param window.map.delAllPins - удаляет все пины с карты
    * @param window.map.closeCardClickHandler - удаляет карточку объявления
    * @param map.placingOnMap.makeMapActive -  переводит карту в активное состояние
    * @param map.placingOnMap.sucsessHandler - обработчик успешной загрузки объявлений
    * @param map.placingOnMap.cardDraw - добавляет карточку объявления на страницу
    * @param map.placingOnMap.makeFormActive - переводит форму в активное стостояние
    * @param map.placingOnMap.newCardDraw - создаёт карточку при клике по пину
    * @param map.placingOnMap.pinClickHandler -  добавляет обработчик клика на все пины
    * @param map.makeFormDisabled - блокирует поля формы до перетаскивания пина
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
  var MAP_FORM = document.querySelector('.map__filters');
  var SUCCESS = document.querySelector('#success').content.querySelector('.success');
  var ERROR = document.querySelector('#error').content.querySelector('.error');
  var MAIN = document.querySelector('main');
  var RESTE_FORM_BUTTON = document.querySelector('.ad-form__reset');
  var ESC_KEYCODE = 27;


  var placingOnMap = function () {

    // обработчик успешной загркзки похожих объявлений
    var sucsessHandler = function (offers) {
      var allOffers = offers.slice();
      allOffers.forEach(function (offer, index) {
        offer.id = index;
      });
      window.allOffers = allOffers;
      drawPinsOnMap(window.allOffers);
    };

    // обработчик ошибки закгрузки
    var errorHandler = function () {
      var errorMessage = ERROR.cloneNode(true);
      MAIN.appendChild(errorMessage);
      var errorMessageClickHandler = function () {
        errorMessage.remove();
      };
      var escPressErrHandler = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          evt.preventDefault();
          errorMessageClickHandler();
          document.removeEventListener('click', errorMessageClickHandler);
          document.removeEventListener('keydown', escPressErrHandler);
        }
      };

      document.addEventListener('click', errorMessageClickHandler);
      document.addEventListener('keydown', escPressErrHandler);
    };

    // обработчик успешной загрузки формы
    var formSucsessHandler = function () {
      var successMessage = SUCCESS.cloneNode(true);
      MAIN.appendChild(successMessage);
      resetClickHandler();
      var successMessageClickHandler = function () {
        successMessage.remove();
        document.removeEventListener('click', successMessageClickHandler);
        document.removeEventListener('keydown', escPressHandler);
      };

      var escPressHandler = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          evt.preventDefault();
          successMessageClickHandler();
        }
      };

      document.addEventListener('click', successMessageClickHandler);
      document.addEventListener('keydown', escPressHandler);
    };

    // функция для перевода карты в активное состояние
    var makeMapActive = function () {
      MAP.classList.remove('map--faded');
      AD_FORM.classList.remove('ad-form--disabled');
    };

    // функция для перевода карты и формы в нективное состояние
    var resetClickHandler = function () {
      delAllPins();
      window.fotos.resetFotos();
      MAP.classList.add('map--faded');
      AD_FORM.classList.add('ad-form--disabled');
      AD_FORM.reset();
      MAP_FORM.reset();
      closeCardClickHandler();
      makeFormDisabled();
      MAP_PIN_MAIN.style.top = MAIN_PIN_TOP + 'px';
      MAP_PIN_MAIN.style.left = MAIN_PIN_LEFT + 'px';
      MAP_PIN_MAIN.addEventListener('mouseup', mainPinMousupHandler);
      window.form.priceChangeHandler();
      window.form.guestsChangeHandler();
      window.utilities.getAdress(MAIN_PIN_WEIGHT, MAIN_PIN_HEIGHT / 2);
    };

    // фунция для добавления карточки объявления на страницу
    var cardDraw = function (num) {
      var fragment = document.createDocumentFragment();
      var map = document.querySelector('.map');
      var closeCardButton;

      fragment.appendChild(window.renderCard(window.allOffers[num]));
      map.insertBefore(fragment, map.querySelector('.map__filters-container'));
      closeCardButton = document.querySelector('.popup__close');
      closeCardButton.addEventListener('click', closeCardClickHandler);
    };

    // функция для перевода формы в активное стостояние
    var makeFormActive = function () {
      FIELDSETS.forEach(function (fieldset) {
        fieldset.removeAttribute('disabled');
      });
    };

    // функция для отрисовки карточки при клике по пину
    var newCardDraw = function (num) {
      closeCardClickHandler();
      cardDraw(num);
    };

    // функция добавляющая обработчик клика на все пины
    var pinClickHandler = function (evt) {
      var target = evt.target.closest('.map__pin');
      if (target) {
        var num = target.dataset.id;
      }

      if (num) {
        newCardDraw(num);
        target.classList.add('map__pin--active');
      }
    };

    // Обработчик загрузки формы
    var formSubmitHandler = function (evt) {
      window.backend.save(new FormData(AD_FORM), formSucsessHandler, errorHandler);
      evt.preventDefault();
    };

    // Загружаем похожие оъявления с сервера
    window.backend.load(sucsessHandler, errorHandler);
    makeMapActive();
    makeFormActive();
    AD_FORM.addEventListener('submit', formSubmitHandler);

    MAP_PIN_MAIN.removeEventListener('mouseup', mainPinMousupHandler);

    // добавляем обработчик клика на все пины
    MAP.addEventListener('click', pinClickHandler);

    RESTE_FORM_BUTTON.addEventListener('click', resetClickHandler);
    window.utilities.getAdress(MAIN_PIN_WEIGHT, MAIN_PIN_HEIGHT / 2);
  };

  // функция для отрисовки всех пинов
  var drawPinsOnMap = function (offerArr) {
    var fragment = document.createDocumentFragment();
    for (var j = 0, allOffersLength = offerArr.length; j < allOffersLength; j++) {
      if (!window.allOffers[j].offer) {
        continue;
      }
      fragment.appendChild(window.renderPin(offerArr[j]));
      if (fragment.querySelectorAll('.map__pin').length >= window.constants.ADS_NUMBERS) {
        break;
      }
    }

    MAP_PINS.appendChild(fragment);
  };

  // функция для закрытия карточки объявления
  var closeCardClickHandler = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (MAP.querySelector('.map__card') !== null) {
      MAP.removeChild(MAP.querySelector('.map__card'));
      if (activePin !== null) {
        activePin.classList.remove('map__pin--active');
      }
    }
  };

  // функция удаляющая все пины со страницы
  var delAllPins = function () {
    var allOffersPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allOffersPins.forEach(function (pin) {
      pin.remove();
    });
  };

  // функция для перевода формы в неактивное состояние
  var makeFormDisabled = function () {
    FIELDSETS.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'disabled');
    });
  };

  window.utilities.getAdress(MAIN_PIN_WEIGHT, MAIN_PIN_HEIGHT / 2);

  var mainPinMousupHandler = function () {
    placingOnMap();
  };

  makeFormDisabled();
  MAP_PIN_MAIN.addEventListener('mouseup', mainPinMousupHandler);

  window.map = {
    drawPinsOnMap: drawPinsOnMap,
    delAllPins: delAllPins,
    closeCardClickHandler: closeCardClickHandler
  };
})();
