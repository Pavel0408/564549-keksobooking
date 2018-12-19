'use strict';
(function () {
  /**
    * Модуль avatar
    *
    * Показывает в форме загруженную аватарку пользователя
   */
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FOTO_FRAME = document.querySelector('.ad-form__photo').cloneNode(true);
  var fileChooser = document.querySelectorAll('input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var previewSrc = preview.src;
  var PHOTO_CONTAINER = document.querySelector('.ad-form__photo-container');

  var verefyFoto = function (filesArr) {
    var isFileType = function (fileName) {
      FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
    };
    var matches = true;
    filesArr.forEach(function (file) {
      var fileName = file.name.toLowerCase();
      if (isFileType(fileName)) {
        matches = false;
      }
    });
    return matches;
  };


  var renderOneFoto = function (file, img) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      img.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var renderOfferFoto = function (fotosArr) {
    var oldFrames = document.querySelectorAll('.ad-form__photo');
    oldFrames.forEach(function (frame) {
      if (frame.querySelector('img') === null) {
        console.log('Удаляем');
        frame.remove();
      }
      else {
        console.log(frame.querySelector('img'), 'результат');
      }
    });
    var fragment = document.createDocumentFragment();
    fotosArr.forEach(function () {
      var frame = FOTO_FRAME.cloneNode(true);
      var img = document.createElement('img');
      frame.appendChild(img);
      fragment.appendChild(frame);
    });
    var offerFtots = fragment.querySelectorAll('img');
    offerFtots.forEach(function (elemnt, index) {
      console.log(fotosArr[index], index, fotosArr);
      renderOneFoto(fotosArr[index], offerFtots[index]);
    });
    PHOTO_CONTAINER.appendChild(fragment);
  };


  fileChooser[0].addEventListener('change', function () {
    console.log(fileChooser[0]);
    var files = fileChooser[0].files;
    files = [].slice.apply(files);
    console.log(fileChooser.files);
    console.log(files);
    if (verefyFoto(files)) {
      console.log('Прошло');
      renderOneFoto(files[0], preview);
    };

  });

  fileChooser[1].addEventListener('change', function () {
    console.log(fileChooser[1]);

    var files = fileChooser[1].files;
    files = [].slice.apply(files);
    console.log(fileChooser.files);
    console.log(files);
    if (verefyFoto(files)) {
      console.log('Прошло');
      renderOfferFoto(files);
    };

  });

  var resetFotos = function () {
    var frames = document.querySelectorAll('.ad-form__photo');
    frames.forEach(function (frame) {
      frame.remove();
      PHOTO_CONTAINER.appendChild(FOTO_FRAME);
    });
    preview.src = previewSrc;
  };

  window.fotos = {
    resetFotos: resetFotos
  };


})();
