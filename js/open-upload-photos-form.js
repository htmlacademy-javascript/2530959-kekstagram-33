import { isEscapeKey } from './utils.js';
import { selectionEffect } from './foto-effect.js';
import { resetScaleValue } from './change-foto-scale.js';

const formUploadDOMElement = document.querySelector('.img-upload__form');
const imgUploadInputDOMElement = formUploadDOMElement.querySelector('.img-upload__input');
const showFormDOMElement = formUploadDOMElement.querySelector('.img-upload__overlay');
const closeFormDOMElement = formUploadDOMElement.querySelector('.img-upload__cancel');
const sliderContainerDOMElement = formUploadDOMElement.querySelector('.img-upload__effect-level');
const effectsListDOMElement = formUploadDOMElement.querySelector('.effects__list');

const uploudImageFormDOMElement = document.querySelector('#upload-select-image');
const imgUploadPreviewDOMElement = formUploadDOMElement.querySelector('.img-upload__preview img');

const hashtagsInputDOMElement = formUploadDOMElement.querySelector('.text__hashtags');
const commentFieldDOMElement = formUploadDOMElement.querySelector('.text__description');


const clickOpenFormModal = () => {
  imgUploadInputDOMElement.addEventListener('change', (evt) => {
    evt.preventDefault();
    showFormDOMElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onCloseEscKeydown);
    closeFormDOMElement.addEventListener('click', clickCloseFormModal);
    sliderContainerDOMElement.classList.add('hidden');
    effectsListDOMElement.addEventListener('change', selectionEffect);
  });
};


const onAddEventEscClose = () => {
  document.addEventListener('keydown', onCloseEscKeydown);
};

const onRemoveEnentEscClose = () => {
  document.removeEventListener('keydown', onCloseEscKeydown);
};

function clickCloseFormModal() {
  showFormDOMElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseEscKeydown);
  closeFormDOMElement.removeEventListener('click', clickCloseFormModal);
  uploudImageFormDOMElement.reset();
  effectsListDOMElement.removeEventListener('change', selectionEffect);
  imgUploadPreviewDOMElement.removeAttribute('style');
  resetScaleValue();
}

function onCloseEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    clickCloseFormModal();
  }
}

const removeHashtagEscKeydown = () => {
  hashtagsInputDOMElement.addEventListener('focus', onRemoveEnentEscClose);
};

const removeCommentsEscKeydown = () => {
  commentFieldDOMElement.addEventListener('focus', onRemoveEnentEscClose);
};

const addHandlerBlurHashtag = () => {
  hashtagsInputDOMElement.addEventListener('blur', onAddEventEscClose);
};

const addHandlerBlurComments = () => {
  commentFieldDOMElement.addEventListener('blur', onAddEventEscClose);
};

const openFormModal = () => {
  clickOpenFormModal();
  removeHashtagEscKeydown();
  removeCommentsEscKeydown();
  addHandlerBlurHashtag();
  addHandlerBlurComments();
};

export { openFormModal, clickCloseFormModal };
