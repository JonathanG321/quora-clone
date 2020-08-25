import { API_URL, jsonHeaders } from './base';

export const Session = {
  create(userCredentials) {
    return fetch(`${API_URL}/session`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(userCredentials),
    }).then((res) => res.json());
  },
  destroy() {
    return fetch(`${API_URL}/session`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => res.json());
  },
};
