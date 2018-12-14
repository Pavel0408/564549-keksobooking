'use strict';
(function () {
  /**
    * Модуль utilities
    *
    * Модуль экспортирует различные утилилты
    * @param window.utilities.getRandomNumber - генерация случайного числа из даипазона
    * @param window.utilities.getRandomIndex - случайный индекс массива
    * @param window.utilities.getRandomValue - уникальное значение из массива
    * @param window.utilities.getAdress - определение адреса на карте с учётом размера метки
   */

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

  //  Определение адреса на карте с учётом размера метки
  var getAdress = function (weight, heigth) {
    var MAIN_PIN = document.querySelector('.map__pin--main');
    var ADRESS_INPUT = document.querySelector('#address');
    var left = +MAIN_PIN.offsetLeft + Math.round(weight / 2);
    var top = +MAIN_PIN.offsetTop + Math.round(heigth);
    ADRESS_INPUT.value = '' + left + ', ' + top;
  };

  window.utilities = {
    getRandomNumber: getRandomNumber,
    getRandomIndex: getRandomIndex,
    getRandomValue: getRandomValue,
    getAdress: getAdress
  };
})();
