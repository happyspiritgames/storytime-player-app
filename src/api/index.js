import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://178t795984.execute-api.us-west-2.amazonaws.com/latest';

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    // authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  // if (commonStore.token) {
  //   req.set('authorization', `Token ${commonStore.token}`);
  // }
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
};

const Stories = {
  all: () =>
    requests.get(`/stories`),
  recommendations: () =>
    requests.get(`/recommendations`),
  byKey: editionKey =>
    requests.get(`/stories/${editionKey}`),
  scene: (editionKey, sceneId) =>
    requests.get(`/stories/${editionKey}/scenes/${sceneId}`)
};

export default {
  Stories
};
