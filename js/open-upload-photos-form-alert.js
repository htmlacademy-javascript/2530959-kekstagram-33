const ALERT_SHOW_TIME = 5000;
const TAG_BUTTON = 'button';
const CLASSNAME_INNER = 'inner';

const ErrorsStatus = {
  DATA_ERROR_STATUS: 'data-error',
  SUCCESS_STATUS: 'success',
  ERROR_STATUS: 'error'
};

const notificationModalHandler = (status) => {
  const statusMessage = document.querySelector(`.${status}`);
  const statusButtonDOMElement = statusMessage.querySelector(`.${status}__${TAG_BUTTON}`);
  const removeMessage = () => {
    statusMessage.remove();
    document.removeEventListener('click', onClickHundler);
  };
  function onClickHundler (evt) {
    if (!evt.target.closest(`.${status}__${CLASSNAME_INNER}`)) {
      removeMessage();
    }
  }
  statusButtonDOMElement.addEventListener('click', removeMessage);
  document.addEventListener('click', onClickHundler);
};

const messagesHandler = (status) => {
  const messageUploadTemplate = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const textMessage = messageUploadTemplate.cloneNode(true);
  const container = document.body;
  container.append(textMessage);
  if (status === ErrorsStatus.DATA_ERROR_STATUS) {
    setTimeout(() => {
      textMessage.remove();
    }, ALERT_SHOW_TIME);
  }
  if (status === ErrorsStatus.SUCCESS_STATUS || status === ErrorsStatus.ERROR_STATUS) {
    notificationModalHandler(status);
  }
};

export { messagesHandler, ErrorsStatus };
