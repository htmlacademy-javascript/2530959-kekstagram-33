const smallScaleImgDOMELEMENT = document.querySelector('.scale__control--smaller');
const bigScaleImgDOMElement = document.querySelector('.scale__control--bigger');
const defaultImgSizeDOMEElement = document.querySelector('.scale__control--value');
const imgUploadPreviewDOMElement = document.querySelector('.img-upload__preview img');
const MAX_VALUE = 100;
const STEP = 25;

let changeScaleValue = defaultImgSizeDOMEElement.value;

const changeScalePhoto = () => {
  smallScaleImgDOMELEMENT.addEventListener('click', () => {
    changeScaleValue = parseFloat(defaultImgSizeDOMEElement.value);
    if (changeScaleValue > STEP) {
      changeScaleValue -= STEP;
      defaultImgSizeDOMEElement.value = `${changeScaleValue}%`;
      imgUploadPreviewDOMElement.style.transform = `scale(${changeScaleValue / MAX_VALUE})`;
    }
  });

  bigScaleImgDOMElement.addEventListener('click', () => {
    changeScaleValue = parseFloat(defaultImgSizeDOMEElement.value);
    if (changeScaleValue < MAX_VALUE) {
      changeScaleValue += STEP;
      defaultImgSizeDOMEElement.value = `${changeScaleValue}%`;
      imgUploadPreviewDOMElement.style.transform = `scale(${changeScaleValue / MAX_VALUE})`;
    }
  });

};

const resetScaleValue = () => {
  changeScaleValue = MAX_VALUE;
  defaultImgSizeDOMEElement.setAttribute('value', `${MAX_VALUE}%`);
};

export { changeScalePhoto, resetScaleValue };
