import { noUiSliderValue, renderEffect } from './data-foto-effect.js';

const imgUploadElement = document.querySelector('.img-upload__overlay');
const levelEffectElement = imgUploadElement.querySelector('.effect-level__value');
const sliderElement = imgUploadElement.querySelector('.effect-level__slider');
const imgUploadPreviewElement = imgUploadElement.querySelector('.img-upload__preview img');
const sliderContainerElement = imgUploadElement.querySelector('.img-upload__effect-level');

const effectsElement = imgUploadElement.querySelector('.effects');
const effectNoneId = effectsElement.querySelector('#effect-none').id;
const effectChromeId = effectsElement.querySelector('#effect-chrome').id;
const effectSepiaId = effectsElement.querySelector('#effect-sepia').id;
const effectMarvinId = effectsElement.querySelector('#effect-marvin').id;
const effectPhobosId = effectsElement.querySelector('#effect-phobos').id;
const effectHeatId = effectsElement.querySelector('#effect-heat').id;

noUiSlider.create(sliderElement, {
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
    sliderContainerElement.classList.add('hidden');
    imgUploadPreviewElement.style.filter = '';
    levelEffectElement.setAttribute('value', '');
  } else {
    sliderContainerElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      start: noUiSliderValue.START_VALUE,
      step: step,
    });
    sliderElement.noUiSlider.on('update', () => {
      const currentValue = sliderElement.noUiSlider.get();
      imgUploadPreviewElement.style.filter = filterStyle(currentValue);
      levelEffectElement.setAttribute('value', `${currentValue}`);
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
