'use strict';
(function () {
  /**
    * Модуль photos
    *
    * Показывает в форме загруженную аватарку пользователя и загруженные фотографии объявления
    * @param window.photos.avatarChange - добавляет в форму аватарку пользователя
    * @param window.photos.photosChange - добавляет в форму превью фотографий объявления
    * @param window.photos.resetFotos - возвращае форме src аватарки пользователя на исходную, удаляет загруженные фото объявления
   */

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FOTO_FRAME = document.querySelector('.ad-form__photo').cloneNode(true);
  var preview = document.querySelector('.ad-form-header__preview img');
  var previewSrc = preview.src;
  var PHOTO_CONTAINER = document.querySelector('.ad-form__photo-container');

  // функция проверяет, что загруженные файлы - изображения
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

  // функция отрисовывает преданный файл в указанном img
  var renderOneFoto = function (file, img) {
    var reader = new FileReader();

    var readerLoadHandler = function () {
      img.src = reader.result;
    };

    reader.addEventListener('load', readerLoadHandler);
    reader.readAsDataURL(file);
  };

  // функция отрисовывает изображения объявлений
  var renderOfferFoto = function (fotosArr) {
    var oldFrames = document.querySelectorAll('.ad-form__photo');
    oldFrames.forEach(function (frame) {
      if (frame.querySelector('img') === null) {
        frame.remove();
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
      renderOneFoto(fotosArr[index], offerFtots[index]);
    });
    PHOTO_CONTAINER.appendChild(fragment);
  };

  // добавляет в форму аватарку пользователя
  var avatarChange = function (input) {
    var files = input.files;
    files = [].slice.apply(files);
    if (verefyFoto(files)) {
      renderOneFoto(files[0], preview);
    }
  };

  // добавляет в форму превью фотографий объявления
  var photosChange = function (input) {
    var files = input.files;
    files = [].slice.apply(files);
    if (verefyFoto(files)) {
      renderOfferFoto(files);
    }
  };

  // возвращает начальное изображение аватарки, удаляет все загруженные фото объявления
  var resetFotos = function () {
    var frames = document.querySelectorAll('.ad-form__photo');
    frames.forEach(function (frame) {
      frame.remove();
      PHOTO_CONTAINER.appendChild(FOTO_FRAME);
    });
    preview.src = previewSrc;
  };

  window.fotos = {
    resetFotos: resetFotos,
    photosChange: photosChange,
    avatarChange: avatarChange
  };
})();
