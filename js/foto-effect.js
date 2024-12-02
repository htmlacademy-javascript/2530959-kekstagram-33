const imgUploadDomElement = document.querySelector('.img-upload__overlay');
const levelEffectDomElement = imgUploadDomElement('.effect-level__value');
const sliderDomElement = imgUploadDomElement('.effect-level__slider');
const imgUploadPreviewDOMElement = document.querySelector('.img-upload__preview img');
const sliderContainer = imgUploadDomElement.querySelector('.img-upload__effect-level');

const MIN_VALUE_EFFECT = 0;
const MAX_VALUE_EFFECT = 3;
const MAX_ONE_VALUE_EFFECT = 1;
const MAX_HUNDRED_VALUE_EFFECT = 100;
const MIN_STEP = 0.1;
const MAX_STEP = 1;

noUiSlider.create(sliderDomElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const changeEffectOnPhoto = (isDefault) => {
  if (isDefault) {
    sliderContainer.classList.add('hidden');
    imgUploadPreviewDOMElement.style.filter = '';
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

sliderDomElement.noUiSlider.on('update', () => {
  const f = sliderDomElement.noUiSlider.get();
});
