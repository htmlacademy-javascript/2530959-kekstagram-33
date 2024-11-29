const smallScaleImgDOMELEMENT = document.querySelector('.scale__control--smaller');
const bigScaleImgDOMElement = document.querySelector('.scale__control--bigger');
const defaultImgSizeDOMEElement = document.querySelector('.scale__control--value');
const imgUploadPreviewDOMElement = document.querySelector('.img-upload__preview');
const MAX_VALUE = 100;
const STEP = 25;

const changeScalePhoto = () => {
    smallScaleImgDOMELEMENT.addEventListener('click', () => {
        let numberValueSmallImg = parseFloat(defaultImgSizeDOMEElement.value)
        if (numberValueSmallImg > STEP) {
            numberValueSmallImg -= STEP;
            defaultImgSizeDOMEElement.value = `${numberValueSmallImg}%`;
            imgUploadPreviewDOMElement.style.transform = `scale(${numberValueSmallImg / MAX_VALUE})`
        }
    });

    bigScaleImgDOMElement.addEventListener('click', () => {
        let numberValueBigImg = parseFloat(defaultImgSizeDOMEElement.value)
        if (numberValueBigImg < MAX_VALUE) {
            numberValueBigImg += STEP;
            defaultImgSizeDOMEElement.value = `${numberValueBigImg}%`;
            imgUploadPreviewDOMElement.style.transform = `scale(${numberValueBigImg / MAX_VALUE})`
        }
    });

}

export {changeScalePhoto};