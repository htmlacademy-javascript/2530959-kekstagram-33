const errorsStatus = {
  DATA_ERROR_STATUS: 'data-error',
  SUCCESS_STATUS: 'success',
  ERROR_STATUS: 'error'
};
const ALERT_SHOW_TIME = 5000;

const notificationModalHandler = (status) => {
  const statusMessage = document.querySelector(`.${status}`);
  const statusButtonDOMElement = statusMessage.querySelector(`.${status}__button`);
  statusButtonDOMElement.addEventListener('click', () => {
    statusMessage.remove();
  });
  document.body.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
    statusMessage.remove();
  });
  document.body.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${status}__inner`)) {
      statusMessage.remove();
    }
  });
};

const messagesHandler = (status) => {
  const messageUploadTemplate = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const textMessage = messageUploadTemplate.cloneNode(true);
  const container = document.body;
  container.append(textMessage);
  if (status === errorsStatus.DATA_ERROR_STATUS) {
    setTimeout(() => {
      textMessage.remove();
    }, ALERT_SHOW_TIME);
  }
  if (status === errorsStatus.SUCCESS_STATUS || status === errorsStatus.ERROR_STATUS) {
    notificationModalHandler(status);
  }
};

export { messagesHandler };
