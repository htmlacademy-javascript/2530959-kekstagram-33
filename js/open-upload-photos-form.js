import { isEscapeKey } from './utils.js';

const formUploadDOMElement = document.querySelector('.img-upload__form');
const imgUploadInputDOMElement = formUploadDOMElement.querySelector('.img-upload__input');
const showFormDOMElement = formUploadDOMElement.querySelector('.img-upload__overlay');
const closeFormDOMElement = formUploadDOMElement.querySelector('.img-upload__cancel');

const uploudImageFormDOMElement = document.querySelector('#upload-select-image');


const clickOpenFormModal = () => {
    imgUploadInputDOMElement .addEventListener('change', (evt) => {
        evt.preventDefault();
        showFormDOMElement.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', onCloseEscKeydown);
    });
  };
  
  const clickCloseFormModal = () => {
    showFormDOMElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onCloseEscKeydown);
    closeFormDOMElement.removeEventListener('click', clickCloseFormModal);
    uploudImageFormDOMElement.reset();
  };
  
  function onCloseEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      clickCloseFormModal();
    };
  };

  const openFormModal = () => {
    clickOpenFormModal();
    closeFormDOMElement.addEventListener('click', clickCloseFormModal);
    document.addEventListener('keydown', onCloseEscKeydown);
  };

export {openFormModal};