import { API_URL, jsonHeaders } from './base';

export const User = {
  getCurrentUser() {
    return fetch(`${API_URL}/users/current`, {
      credentials: 'include',
    }).then((res) => res.json());
  },
  create(newUser) {
    return fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(newUser),
    }).then((res) => res.json());
  },
};
