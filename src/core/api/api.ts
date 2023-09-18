const SERVER = 'http://localhost:3000';

export const fetchWrapper = {
  get,
  post,
};

function get(url: string) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(SERVER + url, requestOptions);
}

function post(url: string, body: object) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(SERVER + url, requestOptions);
}
