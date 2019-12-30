import store from '../store';

function api(mode, endpoint) {
  const url = window.location.href.match(/(https?:\/\/.+):8080\//)[1] + `:8081` + endpoint;
  const { password } = store.getState();
  return fetch(url, {
    method: mode,
    headers: { password }
  }).then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  }).then(async data => {
    if (data.authenticated === false) throw new Error('Incorrect Password');
    return data;
  });
}

api.get = endpoint => api('GET', endpoint);
api.post = endpoint => api('POST', endpoint);

export default api;