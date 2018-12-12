'use strict';
(function () {
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
