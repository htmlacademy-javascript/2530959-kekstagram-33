import { isEscapeKey } from './utils.js';

const formUploadDOMElement = document.querySelector('.img-upload__form');
const imgUploadInputDOMElement = formUploadDOMElement.querySelector('.img-upload__input');
const showFormDOMElement = formUploadDOMElement.querySelector('.img-upload__overlay');
const closeFormDOMElement = formUploadDOMElement.querySelector('.img-upload__cancel');

const uploudImageFormDOMElement = document.querySelector('#upload-select-image');

const hashtagsInputDOMElement = formUploadDOMElement.querySelector('.text__hashtags');
const commentFieldDOMElement = formUploadDOMElement.querySelector('.text__description');


const clickOpenFormModal = () => {
  imgUploadInputDOMElement.addEventListener('change', (evt) => {
    evt.preventDefault();
    showFormDOMElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onCloseEscKeydown);
    closeFormDOMElement.addEventListener('click', clickCloseFormModal);
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

export {openFormModal};
