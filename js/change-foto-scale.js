const smallScaleImgElement = document.querySelector('.scale__control--smaller');
const bigScaleImgElement = document.querySelector('.scale__control--bigger');
const defaultImgSizeElement = document.querySelector('.scale__control--value');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
const MAX_VALUE = 100;
const STEP = 25;

let changeScaleValue = defaultImgSizeElement.value;

const changeScalePhoto = () => {
  smallScaleImgElement.addEventListener('click', () => {
    changeScaleValue = parseFloat(defaultImgSizeElement.value);
    if (changeScaleValue > STEP) {
      changeScaleValue -= STEP;
      defaultImgSizeElement.value = `${changeScaleValue}%`;
      imgUploadPreviewElement.style.transform = `scale(${changeScaleValue / MAX_VALUE})`;
    }
  });

  bigScaleImgElement.addEventListener('click', () => {
    changeScaleValue = parseFloat(defaultImgSizeElement.value);
    if (changeScaleValue < MAX_VALUE) {
      changeScaleValue += STEP;
      defaultImgSizeElement.value = `${changeScaleValue}%`;
      imgUploadPreviewElement.style.transform = `scale(${changeScaleValue / MAX_VALUE})`;
    }
  });

};

const resetScaleValue = () => {
  changeScaleValue = MAX_VALUE;
  defaultImgSizeElement.setAttribute('value', `${MAX_VALUE}%`);
};

export { changeScalePhoto, resetScaleValue };
