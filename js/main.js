import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import { openFormModal, clickCloseFormModal } from './open-upload-photos-form.js';
import { setUploadFormSubmit } from './validation-form.js';
import { changeScalePhoto } from './change-foto-scale.js';
import { messagesHandler } from './open-upload-photos-form-alert.js';
import { getData } from './api.js';
import { renderPhotoList } from './rendering-miniatures.js';

openFormModal(document.querySelector('.img-upload__input'));
changeScalePhoto();

getData(
  (picturesContainer, posts) => renderPhotoList(picturesContainer, posts),
  () => messagesHandler('data-error'),
);

setUploadFormSubmit(clickCloseFormModal);
