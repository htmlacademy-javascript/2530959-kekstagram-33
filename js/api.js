const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(`${BASE_URL}${Route.GET_DATA}`);
    if (!response.ok) {
      onFail();
      return;
    }
    if (response.ok) {
      const posts = await response.json();
      onSuccess(posts);
    }
  } catch (error) {
    onFail();
  }
};

const sendData = async (onSuccess, onFail, onHandlerFinally, body) => {
  try {
    const response = await fetch(`${BASE_URL}${Route.SEND_DATA}`, {
      method: Method.POST,
      body,
    });
    if (!response.ok) {
      onFail();
      return;
    }
    if (response.ok) {
      onSuccess();
    }
  } catch (error) {
    onFail();
  } finally {
    onHandlerFinally();
  }
};

export { getData, sendData };
