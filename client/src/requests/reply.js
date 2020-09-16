import { API_URL, jsonHeaders } from './base';

export const Reply = {
  create(newReply, answerId) {
    return fetch(`${API_URL}/answers/${answerId}/replies`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(newReply),
    }).then((res) => res.json());
  },
  get(answerId, limit, offset) {
    return fetch(`${API_URL}/answers/${answerId}/replies?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
};
