import { noUiSliderValue, renderEffect } from './data-foto-effect.js';

const imgUploadDomElement = document.querySelector('.img-upload__overlay');
const levelEffectDomElement = imgUploadDomElement.querySelector('.effect-level__value');
const sliderDomElement = imgUploadDomElement.querySelector('.effect-level__slider');
const imgUploadPreviewDOMElement = imgUploadDomElement.querySelector('.img-upload__preview img');
const sliderContainer = imgUploadDomElement.querySelector('.img-upload__effect-level');

const effectsDOMElement = imgUploadDomElement.querySelector('.effects');
const effectNoneId = effectsDOMElement.querySelector('#effect-none').id;
const effectChromeId = effectsDOMElement.querySelector('#effect-chrome').id;
const effectSepiaId = effectsDOMElement.querySelector('#effect-sepia').id;
const effectMarvinId = effectsDOMElement.querySelector('#effect-marvin').id;
const effectPhobosId = effectsDOMElement.querySelector('#effect-phobos').id;
const effectHeatId = effectsDOMElement.querySelector('#effect-heat').id;

noUiSlider.create(sliderDomElement, {
  range: {
    min: noUiSliderValue.MIN_VALUE,
    max: noUiSliderValue.MAX_VALUE,
  },
  start: noUiSliderValue.START_VALUE,
  step: noUiSliderValue.STEP_VALUE,
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
      start: noUiSliderValue.START_VALUE,
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
      changeEffectOnPhoto(renderEffect.MAX_ONE_VALUE_EFFECT, renderEffect.MAX_VALUE_EFFECT, renderEffect.MIN_STEP, (currentValue) => `brightness(${currentValue})`, false);
      break;
    }
    case effectPhobosId: {
      changeEffectOnPhoto(renderEffect.MIN_VALUE_EFFECT, renderEffect.MAX_VALUE_EFFECT, renderEffect.MIN_STEP, (currentValue) => `blur(${currentValue}px)`, false);
      break;
    }
    case effectMarvinId: {
      changeEffectOnPhoto(renderEffect.MIN_VALUE_EFFECT, renderEffect.MAX_HUNDRED_VALUE_EFFECT, renderEffect.MAX_STEP, (currentValue) => `invert(${currentValue}%)`, false);
      break;
    }
    case effectSepiaId: {
      changeEffectOnPhoto(renderEffect.MIN_VALUE_EFFECT, renderEffect.MAX_ONE_VALUE_EFFECT, renderEffect.MIN_STEP, (currentValue) => `sepia(${currentValue})`, false);
      break;
    }
    case effectChromeId: {
      changeEffectOnPhoto(renderEffect.MIN_VALUE_EFFECT, renderEffect.MAX_ONE_VALUE_EFFECT, renderEffect.MIN_STEP, (currentValue) => `grayscale(${currentValue})`, false);
      break;
    }
    case effectNoneId: {
      changeEffectOnPhoto(renderEffect.MIN_VALUE_EFFECT, renderEffect.ZERO_VALUE, renderEffect.ZERO_VALUE, '', true);
      break;
    }
    default: changeEffectOnPhoto(renderEffect.MIN_VALUE_EFFECT, renderEffect.ZERO_VALUE, renderEffect.ZERO_VALUE, '', true);
  }
};

export { selectionEffect };
