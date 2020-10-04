const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
const API_PATH = '/api/v1';

export const API_URL = `${BASE_URL}${API_PATH}`;

export const jsonHeaders = new Headers({
  Accept: 'application/json, text/plain, */*',
  'Content-type': 'application/json',
});
