const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const getData = (onSuccess, onFail) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(document.querySelector('.pictures'), posts);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, onHandlerFinally, body) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: Method.POST,
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    })
    .finally(() => {
      onHandlerFinally();
    });
};

export { getData, sendData };
