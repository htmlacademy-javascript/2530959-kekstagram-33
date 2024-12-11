import {DataCommentField, DataHashtagField, SubmitButtonText} from './validation-form-data.js';
import { showstatusNotice } from './open-upload-photos-form-alert.js';
import { sendData } from './api-modul.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const formUploadElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = formUploadElement.querySelector('.text__hashtags');
const commentFieldElement = formUploadElement.querySelector('.text__description');
const submitButtonElement = formUploadElement.querySelector('#upload-submit');
let hashtagsErrorMessage = [];

const pristine = new Pristine(formUploadElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const isValidHashtag = (hashtag) => HASHTAG_REGEX.test(hashtag);
const uniqValueHashtag = (array) => array.length === new Set(array).size;

const checkOnValidHashtag = (hashtags) => {
  if (!hashtags.every(isValidHashtag)) {
    return DataHashtagField.HASHTAG_NOT_VALID;
  }
};

const checkOnNumbersHashtags = (hashtags) => {
  if (hashtags.length > DataHashtagField.MAX_HASHTAG_NUMBERS) {
    return DataHashtagField.MAX_HASHTAG_NUMBERS_EXCEEDED;
  }
};

const checkOnDuplicateHashtag = (hashtags) => {
  if (!uniqValueHashtag(hashtags)) {
    return DataHashtagField.DUPLICATE_HASHTAGS;
  }
};

const validateRulesHashtags = [
  checkOnValidHashtag,
  checkOnNumbersHashtags,
  checkOnDuplicateHashtag
];

const validateHashtagField = (value) => {
  const hashtags = value.split(/\s/).map((hashtag) => hashtag.toLowerCase()).filter(Boolean);
  hashtagsErrorMessage = [];
  validateRulesHashtags.reduce((errors, validator) => {
    const error = validator(hashtags);
    if(error) {
      errors.push(error);
    }
    return errors;
  }, hashtagsErrorMessage);
  return !hashtagsErrorMessage.length;
};

const validateCommentField = (value) => value.length <= DataCommentField.MAX_LENGTH;

const gethashtagsErrorMessage = () => hashtagsErrorMessage[0] ?? '';

const getCommentErrorMessage = () => DataCommentField.MESSAGE_ERROR;

pristine.addValidator(hashtagsInputElement, validateHashtagField, gethashtagsErrorMessage);
pristine.addValidator(commentFieldElement, validateCommentField, getCommentErrorMessage);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = `${SubmitButtonText.SENDING}`;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = `${SubmitButtonText.IDLE}`;
};

const setUploadFormSubmit = (closeForm) => {
  formUploadElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          showstatusNotice('success');
          closeForm();
        },
        () => {
          showstatusNotice('error');
        },
        () => {
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { pristine, setUploadFormSubmit, checkOnValidHashtag };
