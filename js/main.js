import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import { openFormModal, clickCloseFormModal } from './open-upload-photos-form.js';
import { setUploadFormSubmit } from './validation-form.js';
import { changeScalePhoto } from './change-foto-scale.js';
import { messagesHandler, ErrorsStatus } from './open-upload-photos-form-alert.js';
import { getData } from './api.js';
import { renderPhotoList, eventOnFilterElement } from './rendering-miniatures.js';
import { fileUploadingForm } from './upload-personal-photo.js';

openFormModal(document.querySelector('.img-upload__input'));
changeScalePhoto();

await getData(
  (posts) => {
    renderPhotoList(posts);
    eventOnFilterElement(posts);
  },
  () => messagesHandler(`${ErrorsStatus.DATA_ERROR_STATUS}`),
);
fileUploadingForm();
setUploadFormSubmit(clickCloseFormModal);
