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
  var FORM = document.querySelector('.ad-form');
  var MAP_PIN_MAIN = document.querySelector('.map__pin--main');
  var MAIN_PIN_WEIGHT = MAP_PIN_MAIN.offsetWidth;
  var MAIN_PIN_HEIGHT = MAP_PIN_MAIN.offsetHeight;
  var FIELDSETS = document.querySelectorAll('fieldset');

  var placingOnMap = function () {

    // функция для отрисовки всех пинов
    var drawPinsOnMap = function () {
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < window.constants.ADS_NUMBERS; j++) {
        fragment.appendChild(window.renderPin(window.allOffers[j]));
      }

      MAP_PINS.appendChild(fragment);
    };

    // функция для перевода карты в активное состояние
    var makeMapActive = function () {
      MAP.classList.remove('map--faded');
      FORM.classList.remove('ad-form--disabled');
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
        newCardDraw(num);
      }
    };

    drawPinsOnMap();
    makeMapActive();
    makeFormActive();

    MAP_PIN_MAIN.removeEventListener('mouseup', placingOnMap);

    // добавляем обработчик клика на все пины
    MAP.addEventListener('click', pinsListeners);
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
