import {dataCommentField, dataHashtagField, submitButtonText} from './data-validation-form.js';
import { messagesHandler } from './open-upload-photos-form-alert.js';
import { sendData } from './api.js';

const formUploadDOMElement = document.querySelector('.img-upload__form');
const hashtagsInputDOMElement = formUploadDOMElement.querySelector('.text__hashtags');
const commentFieldDOMElement = formUploadDOMElement.querySelector('.text__description');
const submitButtonDOMElement = formUploadDOMElement.querySelector('#upload-submit');

const pristine = new Pristine(formUploadDOMElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const isValidHashtag = (hashtag) => HASHTAG_REGEX.test(hashtag);
const uniqValueHashtag = (array) => array.length === new Set(array).size;


const checkOnValidHashtag = (hashtags) => {
  if (!hashtags.every(isValidHashtag)) {
    return dataHashtagField.HASHTAG_NOT_VALID;
  }
};

const checkOnNumbersHashtags = (hashtags) => {
  if (hashtags.length > dataHashtagField.MAX_HASHTAG_NUMBERS) {
    return dataHashtagField.MAX_HASHTAG_NUMBERS_EXCEEDED;
  }
};

const checkOnDuplicateHashtag = (hashtags) => {
  if (!uniqValueHashtag(hashtags)) {
    return dataHashtagField.DUPLICATE_HASHTAGS;
  }
};

const rulesValidationHashtags = [
  checkOnValidHashtag,
  checkOnNumbersHashtags,
  checkOnDuplicateHashtag
];

let hashtagErrorMessage = [];

const validateHashtagField = (value) => {
  const hashtags = value.split(/\s/).map((hashtag) => hashtag.toLowerCase()).filter(Boolean);
  hashtagErrorMessage = [];

  rulesValidationHashtags.reduce((errors, validator) => {
    const error = validator(hashtags);

    if(error) {
      errors.push(error);
    }

    return errors;
  }, hashtagErrorMessage);

  return !hashtagErrorMessage.length;
};

const validateCommentField = (value) => value.length <= dataCommentField.MAX_LENGTH;

const getHashtagErrorMessage = () => hashtagErrorMessage[0] ?? '';

const getCommentErrorMessage = () => dataCommentField.MESSAGE_ERROR;

pristine.addValidator(hashtagsInputDOMElement, validateHashtagField, getHashtagErrorMessage);
pristine.addValidator(commentFieldDOMElement, validateCommentField, getCommentErrorMessage);

const blockSubmitButton = () => {
  submitButtonDOMElement.disabled = true;
  submitButtonDOMElement.textContent = `${submitButtonText.SENDING}`;
};

const unBlockSubmitButton = () => {
  submitButtonDOMElement.disabled = false;
  submitButtonDOMElement.textContent = `${submitButtonText.IDLE}`;
};

const setUploadFormSubmit = (closeForm) => {
  formUploadDOMElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          messagesHandler('success');
          closeForm();
        },
        () => {
          messagesHandler('error');
        },
        () => {
          unBlockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};
export { setUploadFormSubmit, checkOnValidHashtag };
