const dataCommentField = Object.freeze({
  MAX_LENGTH: 140,
  MESSAGE_ERROR: 'Длина комментария не должна превышать 140 символов'
});

const dataHashtagField = Object.freeze({
  MAX_HASHTAG_NUMBERS: 5,
  HASHTAG_NOT_VALID: 'Хэштег доолжен начинаться с #',
  MAX_HASHTAG_NUMBERS_EXCEEDED: 'Количество хэштегов должно быть не больше 5',
  DUPLICATE_HASHTAGS: 'Хэштеги не должны повторяться'
});

export {dataCommentField, dataHashtagField};
