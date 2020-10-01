import { API_URL, jsonHeaders } from './base';

export const Answer = {
  one(id) {
    return fetch(`${API_URL}/answers/${id}`, {
      credentials: 'include',
    }).then((res) => res.json());
  },
  create(newAnswer, questionId) {
    return fetch(`${API_URL}/questions/${questionId}/answers`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(newAnswer),
    }).then((res) => res.json());
  },
};
