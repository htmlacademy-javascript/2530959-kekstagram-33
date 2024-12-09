import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;
const TAG_BUTTON = 'button';
const CLASSNAME_INNER = 'inner';

const ErrorsStatus = {
  DATA_ERROR_STATUS: 'data-error',
  SUCCESS_STATUS: 'success',
  ERROR_STATUS: 'error'
};

const closeErrorStatusNotice = (status) => {
  const statusNotice = document.querySelector(`.${status}`);
  const statusButtonElement = statusNotice.querySelector(`.${status}__${TAG_BUTTON}`);
  const onStatusButtonClick = () => {
    statusNotice.remove();
    document.removeEventListener('click', onDocumentClick);
  };
  function onDocumentClick (evt) {
    if (!evt.target.closest(`.${status}__${CLASSNAME_INNER}`)) {
      onStatusButtonClick();
    }
  }
  statusButtonElement.addEventListener('click', onStatusButtonClick);
  document.addEventListener('click', onDocumentClick);
};

const closeSuccessStatusNotice = (status) => {
  const statusNotice = document.querySelector(`.${status}`);
  const statusButtonElement = statusNotice.querySelector(`.${status}__${TAG_BUTTON}`);
  const onStatusButtonClick = () => {
    statusNotice.remove();
    document.removeEventListener('keydown', onEscKeydownDocument);
    document.removeEventListener('click', onDocumentClick);
  };
  function onEscKeydownDocument (evt){
    if (isEscapeKey(evt)) {
      onStatusButtonClick();
    }
  }
  function onDocumentClick (evt) {
    if (!evt.target.closest(`.${status}__${CLASSNAME_INNER}`)) {
      onStatusButtonClick();
    }
  }
  statusButtonElement.addEventListener('click', onStatusButtonClick);
  document.addEventListener('keydown', onEscKeydownDocument);
  document.addEventListener('click', onDocumentClick);
};

const showstatusNotice = (status) => {
  const messageUploadTemplate = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const textNotice = messageUploadTemplate.cloneNode(true);
  const container = document.body;
  container.append(textNotice);
  if (status === ErrorsStatus.DATA_ERROR_STATUS) {
    setTimeout(() => {
      textNotice.remove();
    }, ALERT_SHOW_TIME);
    return;
  }
  if (status === ErrorsStatus.SUCCESS_STATUS) {
    closeSuccessStatusNotice(status);
    return;
  }
  if (status === ErrorsStatus.ERROR_STATUS) {
    closeErrorStatusNotice(status);
  }
};

function closeKeyDownErrorstatusNotice (status) {
  status.remove();
}

export { showstatusNotice, ErrorsStatus, closeKeyDownErrorstatusNotice };
