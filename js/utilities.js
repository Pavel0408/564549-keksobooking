'use strict';
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

window.utilities = {
  getRandomNumber: getRandomNumber,
  getRandomIndex: getRandomIndex,
  getRandomValue: getRandomValue
};
