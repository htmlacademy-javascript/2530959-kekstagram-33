import { isEscapeKey } from './utils.js';
import { onEffectsListChange } from './foto-effect.js';
import { resetScaleValue } from './change-foto-scale.js';
import { pristine } from './validation-form.js';
import { ErrorsStatus, closeKeyDownErrorstatusNotice } from './open-upload-photos-form-alert.js';

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
let popUpsStack = [];

const removeAlertPrestine = () => {
  const pristineErrorElements = document.querySelectorAll('.pristine-error');
  pristineErrorElements.forEach((item) => {
    item.remove();
    pristine.reset();
  });
};

const resetErrorsConfig = () => {
  removeAlertPrestine();
  uploudImageFormElement.reset();
  imgUploadPreviewElement.removeAttribute('style');
  resetScaleValue();
  removeAlertPrestine();
};

const clickOpenFormModal = (element) => {
  imgUploadInputElement.addEventListener('change', (evt) => {
    evt.preventDefault();
    showFormElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeFormElement.addEventListener('click', onButtonFormCloseClick);
    sliderContainerElement.classList.add('hidden');
    effectsListElement.addEventListener('change', onEffectsListChange);
    document.addEventListener('keydown', onCloseEscKeydown);
    popUpsStack.push(element);
  });
};


const onEscEventListenerAdd = () => {
  document.addEventListener('keydown', onCloseEscKeydown);
};

const onEscEventListenerRemove = () => {
  document.removeEventListener('keydown', onCloseEscKeydown);
};

function onButtonFormCloseClick() {
  showFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeFormElement.removeEventListener('click', onButtonFormCloseClick);
  effectsListElement.removeEventListener('change', onEffectsListChange);
  document.removeEventListener('keydown', onCloseEscKeydown);
  resetErrorsConfig();
}

function onCloseEscKeydown (evt) {
  const errorStatusElement = document.querySelector(`.${ErrorsStatus.ERROR_STATUS}`);
  if (errorStatusElement) {
    popUpsStack.push(errorStatusElement);
  }
  if (isEscapeKey(evt)) {
    if (popUpsStack.length > 1) {
      popUpsStack.pop();
      return closeKeyDownErrorstatusNotice(errorStatusElement);
    } if (popUpsStack.length === 1) {
      evt.preventDefault();
      popUpsStack = [];
      return onButtonFormCloseClick();
    }
  }
}

const removeHashtagEscKeydown = () => {
  hashtagsInputElement.addEventListener('focus', onEscEventListenerRemove);
};

const removeCommentsEscKeydown = () => {
  commentFieldElement.addEventListener('focus', onEscEventListenerRemove);
};

const addHandlerBlurHashtag = () => {
  hashtagsInputElement.addEventListener('blur', onEscEventListenerAdd);
};

const addHandlerBlurComments = () => {
  commentFieldElement.addEventListener('blur', onEscEventListenerAdd);
};

const openFormModal = () => {
  clickOpenFormModal();
  removeHashtagEscKeydown();
  removeCommentsEscKeydown();
  addHandlerBlurHashtag();
  addHandlerBlurComments();
};

export { openFormModal, onButtonFormCloseClick };
