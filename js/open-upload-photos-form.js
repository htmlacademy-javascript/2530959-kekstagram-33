import { isEscapeKey } from './utils.js';
import { selectionEffect } from './foto-effect.js';
import { resetScaleValue } from './change-foto-scale.js';

const formUploadElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = formUploadElement.querySelector('.img-upload__input');
const showFormElement = formUploadElement.querySelector('.img-upload__overlay');
const closeFormElement = formUploadElement.querySelector('.img-upload__cancel');
const sliderContainerElement = formUploadElement.querySelector('.img-upload__effect-level');
const effectsListElement = formUploadElement.querySelector('.effects__list');

const uploudImageFormElement = document.querySelector('#upload-select-image');
const imgUploadPreviewElement = formUploadElement.querySelector('.img-upload__preview img');

const hashtagsInputElement = formUploadElement.querySelector('.text__hashtags');
const commentFieldElement = formUploadElement.querySelector('.text__description');

const onDeleteNotification = () => {
  const pristineErrorElement = document.querySelectorAll('.pristine-error');
  pristineErrorElement.forEach((item) => {
    item.remove();
  });
};

// const onShow = () => {
//   const newDiv = document.createElement('div');
//   newDiv.classList.add('pristine-error', 'img-upload__field-wrapper--error');
//   newDiv.textContent = 'Хэштег доолжен начинаться с #';
//   document.getElementsByClassName('img-upload__field-wrapper')[0].append(newDiv);
// };

const clickOpenFormModal = () => {
  imgUploadInputElement.addEventListener('change', (evt) => {
    evt.preventDefault();
    showFormElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onCloseEscKeydown);
    closeFormElement.addEventListener('click', clickCloseFormModal);
    sliderContainerElement.classList.add('hidden');
    effectsListElement.addEventListener('change', selectionEffect);
  });
};


const onAddEventEscClose = () => {
  document.addEventListener('keydown', onCloseEscKeydown);
};

const onRemoveEnentEscClose = () => {
  document.removeEventListener('keydown', onCloseEscKeydown);
};

function clickCloseFormModal() {
  showFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseEscKeydown);
  closeFormElement.removeEventListener('click', clickCloseFormModal);
  uploudImageFormElement.reset();
  effectsListElement.removeEventListener('change', selectionEffect);
  imgUploadPreviewElement.removeAttribute('style');
  resetScaleValue();
  onDeleteNotification();
}

function onCloseEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    clickCloseFormModal();
  }
}

const removeHashtagEscKeydown = () => {
  hashtagsInputElement.addEventListener('focus', onRemoveEnentEscClose);
};

const removeCommentsEscKeydown = () => {
  commentFieldElement.addEventListener('focus', onRemoveEnentEscClose);
};

const addHandlerBlurHashtag = () => {
  hashtagsInputElement.addEventListener('blur', onAddEventEscClose);
};

const addHandlerBlurComments = () => {
  commentFieldElement.addEventListener('blur', onAddEventEscClose);
};

const openFormModal = () => {
  clickOpenFormModal();
  removeHashtagEscKeydown();
  removeCommentsEscKeydown();
  addHandlerBlurHashtag();
  addHandlerBlurComments();
};

export { openFormModal, clickCloseFormModal };
