const DataCommentField = Object.freeze({
  MAX_LENGTH: 140,
  MESSAGE_ERROR: 'Длина комментария не должна превышать 140 символов',
});

const DataHashtagField = Object.freeze({
  MAX_HASHTAG_NUMBERS: 5,
  HASHTAG_NOT_VALID: 'Хэштег должен начинаться с #',
  MAX_HASHTAG_NUMBERS_EXCEEDED: 'Количество хэштегов должно быть не больше MAX_HASHTAG_NUMBERS',
  DUPLICATE_HASHTAGS: 'Хэштеги не должны повторяться',
});

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

export { DataCommentField, DataHashtagField, SubmitButtonText };
