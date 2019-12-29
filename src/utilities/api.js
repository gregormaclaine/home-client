function api(endpoint, password) {
  const url = window.location.href.match(/(https?:\/\/\d+\.\d+\.\d+\.\d+):8080\//)[1] + `:8081` + endpoint;
  return fetch(url, {
    headers: { password }
  });
}

export default api;