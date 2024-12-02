import { isEscapeKey } from './utils.js';

const formUploadDOMElement = document.querySelector('.img-upload__form');
const imgUploadInputDOMElement = formUploadDOMElement.querySelector('.img-upload__input');
const showFormDOMElement = formUploadDOMElement.querySelector('.img-upload__overlay');
const closeFormDOMElement = formUploadDOMElement.querySelector('.img-upload__cancel');

const uploudImageFormDOMElement = document.querySelector('#upload-select-image');

const hashtagsInputDOMElement = formUploadDOMElement.querySelector('.text__hashtags');
const commentFieldDOMEElement = formUploadDOMElement.querySelector('.text__description');



const clickOpenFormModal = () => {
    imgUploadInputDOMElement .addEventListener('change', (evt) => {
        evt.preventDefault();
        showFormDOMElement.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', onCloseEscKeydown);
        closeFormDOMElement.addEventListener('click', clickCloseFormModal);
    });
  };
  

  const onAddEvent = () => {
    document.addEventListener('keydown', onCloseEscKeydown);
  };
  
  const onRemoveEnent = () => {
    document.removeEventListener('keydown', onCloseEscKeydown);
  };

  const clickCloseFormModal = () => {
    showFormDOMElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onCloseEscKeydown);
    closeFormDOMElement.removeEventListener('click', clickCloseFormModal);
    uploudImageFormDOMElement.reset();
    commentFieldDOMEElement.removeEventListener('focus', onRemoveEnent);
    commentFieldDOMEElement.removeEventListener('blur', onAddEvent);
  };
  
  function onCloseEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      clickCloseFormModal();
    };
  };

  const removeHashtagEscKeydown = () => {
    hashtagsInputDOMElement.addEventListener('focus', onRemoveEnent);
  };

  const removeCommentsEscKeydown = () => {
    commentFieldDOMEElement.addEventListener('focus', onRemoveEnent);
  };

  const addHandlerBlurHashtag = () => {
    hashtagsInputDOMElement.addEventListener('blur', onAddEvent);
  };

  const addHandlerCommentsInputs = () => {
    commentFieldDOMEElement.addEventListener('blur', onAddEvent);
  };

  const openFormModal = () => {
    clickOpenFormModal();
    removeHashtagEscKeydown(); 
    removeCommentsEscKeydown();
    addHandlerBlurHashtag();
    addHandlerCommentsInputs();
  };

export {openFormModal};