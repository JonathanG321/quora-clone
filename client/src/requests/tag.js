import { API_URL, jsonHeaders } from './base';

export const Tag = {
  all() {
    return fetch(`${API_URL}/tags`, {
      credentials: 'include',
    }).then((res) => res.json());
  },
  create(newTag) {
    return fetch(`${API_URL}/tags`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(newTag),
    }).then((res) => res.json());
  },
  one(id) {
    return fetch(`${API_URL}/tags/${id}`, {
      credentials: 'include',
    }).then((res) => res.json());
  },
};
