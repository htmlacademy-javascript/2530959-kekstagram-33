const imgUploadDomElement = document.querySelector('.img-upload__overlay');
const levelEffectDomElement = imgUploadDomElement.querySelector('.effect-level__value');
const sliderDomElement = imgUploadDomElement.querySelector('.effect-level__slider');
const imgUploadPreviewDOMElement = document.querySelector('.img-upload__preview img');
const sliderContainer = imgUploadDomElement.querySelector('.img-upload__effect-level');

const listEffects = document.querySelector('.img-upload__effects');
const effectNoneId = listEffects .querySelector('#effect-none').id;
const effectChromeId = listEffects.querySelector('#effect-chrome').id;
const effectSepiaId = listEffects.querySelector('#effect-sepia').id;
const effectMarvinId = listEffects.querySelector('#effect-marvin').id;
const effectPhobosId = listEffects.querySelector('#effect-phobos').id;
const effectHeatId = listEffects.querySelector('#effect-heat').id;


const MIN_VALUE_EFFECT = 0;
const MAX_VALUE_EFFECT = 3;
const MAX_ONE_VALUE_EFFECT = 1;
const MAX_HUNDRED_VALUE_EFFECT = 100;
const MIN_STEP = 0.1;
const MAX_STEP = 1;
const ZERO_VALUE = 0;

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

const changeEffectOnPhoto = (min, max, step, filterStyle, isDefault) => {
  if (isDefault) {
    sliderContainer.classList.add('hidden');
    imgUploadPreviewDOMElement.style.filter = '';
    levelEffectDomElement.setAttribute('value', '');
  } else {
    sliderContainer.classList.remove('hidden');
    sliderDomElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      start: 100,
      step: step,
    });
    sliderDomElement.noUiSlider.on('update', () => {
      const currentValue = sliderDomElement.noUiSlider.get();
      imgUploadPreviewDOMElement.style.filter = filterStyle(currentValue);
      levelEffectDomElement.setAttribute('value', `${currentValue}`);
    });
  }
};

const selectionEffect = (evt) => {
  switch (evt.target.id) {
    case effectHeatId: {
      changeEffectOnPhoto(MAX_ONE_VALUE_EFFECT, MAX_VALUE_EFFECT, MIN_STEP, (currentValue) => `brightness(${currentValue})`, false);
      break;
    }
    case effectPhobosId: {
      changeEffectOnPhoto(MIN_VALUE_EFFECT, MAX_VALUE_EFFECT, MIN_STEP, (currentValue) => `blur(${currentValue}px)`, false);
      break;
    }
    case effectMarvinId: {
      changeEffectOnPhoto(MIN_VALUE_EFFECT, MAX_HUNDRED_VALUE_EFFECT, MAX_STEP, (currentValue) => `invert(${currentValue}%)`, false);
      break;
    }
    case effectSepiaId: {
      changeEffectOnPhoto(MIN_VALUE_EFFECT, MAX_ONE_VALUE_EFFECT, MIN_STEP, (currentValue) => `sepia(${currentValue})`, false);
      break;
    }
    case effectChromeId: {
      changeEffectOnPhoto(MIN_VALUE_EFFECT, MAX_ONE_VALUE_EFFECT, MIN_STEP, (currentValue) => `grayscale(${currentValue})`, false);
      break;
    }
    case effectNoneId: {
      changeEffectOnPhoto(MIN_VALUE_EFFECT, ZERO_VALUE, ZERO_VALUE, '', true);
      break;
    }
    default: changeEffectOnPhoto(MIN_VALUE_EFFECT, ZERO_VALUE, ZERO_VALUE, '', true);
  }
};

export { selectionEffect };
